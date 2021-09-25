const eventModel = require("../models/eventSchema")

module.exports = {
    name: 'create',
    aliases: ['c'],
    description: "Create new event",
    async execute(client, message, args, Discord){
        if(!args[0]) return message.reply("No parameters given");
        if(args.length < 9) return message.reply(
          "Wrong parameters! Try: \`\`\`$create date: DD/MM/YYYY course: Analiza Matematyczna group: XD-01 hour: 10:15 inf: Trzeba wejsc na zooma\`\`\`");
        try{
          let contents = message.content.split(" ");
          var eventLink = CreateEvent(contents, message);

          let event = await eventModel.create({
            serverID: message.guild.id,
            date: eventObject.date,
            course: eventObject.course,
            group: eventObject.group,
            hour: eventObject.hour,
            information: eventObject.inf
        });
        event.save();

        } catch(err){
          var eventLink = err;
        }
    
        await message.channel.send("```\tDate\t\t\tCourse\t\t\tGroup\t\t\tHour\t\t\tAdditional Information```");
        await message.channel.send(`\`\`\`${eventLink}\`\`\``);
    }
     
}

const eventObject = {
  date: "",
  course: "",
  group: "",
  hour: "",
  inf: ""
}

function CreateEvent(contents, _message){
  var dateBool, courseBool, groupBool, hourBool = true;
  contents.forEach(string => {
    if(string.startsWith("date:")) {
      eventObject.date = string.substring(5);
    } else if (!string.startsWith("course:") && dateBool != false) {
        eventObject.date += string;
    }
    
    if(string.startsWith("course:")) {
      dateBool = false;
      eventObject.course = string.substring(7);
    } else if (!string.startsWith("group:") && courseBool != false) {
        eventObject.course += string + " ";
    }
    
    if(string.startsWith("group:")) {
      courseBool = false;
      eventObject.group = string.substring(6);
    } else if (!string.startsWith("hour:") && groupBool != false) {
        eventObject.group += string;
    }
    
    if(string.startsWith("hour:")) {
      groupBool = false;
      eventObject.hour = string.substring(5);
    } else if (!string.startsWith("inf:") && hourBool != false) {
        eventObject.hour += string;
    }
    
    if(string.startsWith("inf:")) {
      hourBool = false;
      eventObject.inf = string.substring(4);
    } else{
        eventObject.inf += string + " ";
    }

  });

  var eventContents = eventObject.date + "\t " + eventObject.course + "\t " + eventObject.group + "\t " + eventObject.hour + "\t " + eventObject.inf;
  
  try {
    return eventContents;
  } catch(err){
    return err;
  }
}