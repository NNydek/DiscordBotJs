const eventModel = require("../models/eventSchema")

module.exports = {
  name: 'create',
  aliases: ['c'],
  description: "Create new event",
  async execute(client, message, args, Discord){
    let correctMessage = "\`\`\`$create date: DD/MM/YYYY course: Analiza Matematyczna group: XD-01 hour: 10:15 inf: Trzeba wejsc na zooma\`\`\`";
    if(!args[0]) return message.reply("No parameters given");
    if(args.length < 9) return message.reply(
      `Not enough parameters! Try: ${correctMessage}`);
    let contents = message.content.split(" ");
    if(check_message(contents) === false) return message.reply(
      `Looks like you've misspelled or missed some of the information. Check again or try: ${correctMessage}`);
    try{
      var eventLink = create_event(contents);
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
      return err;
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

function create_event(contents){
  var dateBool, courseBool, groupBool, hourBool = true;
  contents.forEach(string => {
    if(string.startsWith("date:")) {
      eventObject.date = string.substring(5);
    } else if (!string.startsWith("course:") && dateBool != false) {
        eventObject.date += string;

    } else if(string.startsWith("course:")) {
      dateBool = false;
      eventObject.course = string.substring(7);
    } else if (!string.startsWith("group:") && courseBool != false) {
      eventObject.course += string + " ";

    } else if(string.startsWith("group:")) {
      courseBool = false;
      eventObject.group = string.substring(6);
    } else if (!string.startsWith("hour:") && groupBool != false) {
      eventObject.group += string;

    } else if(string.startsWith("hour:")) {
      groupBool = false;
      eventObject.hour = string.substring(5);
    } else if (!string.startsWith("inf:") && hourBool != false) {
        eventObject.hour += string;

    } else if(string.startsWith("inf:")) {
      hourBool = false;
      eventObject.inf = string.substring(4);
    } else {
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

function check_message(contents){
  var dateBool, courseBool, groupBool, hourBool, infBool = false;
  contents.forEach(string => {
    switch(string){
      case "date:": dateBool = true;
        break;
      case "course:": courseBool = true;
        break;
      case "group:": groupBool = true;
        break;
      case "hour:": hourBool = true;
        break;
      case "inf:": infBool = true;
        break;
      default:
          break;
    }
  })
  if(dateBool && courseBool && groupBool && hourBool && infBool){
    return true;
  } else {
    return false;
  }
}