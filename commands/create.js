const eventModel = require("../models/eventSchema")

module.exports = {
  name: 'create',
  aliases: ['c'],
  description: "Create new event",
  async execute(client, message, args, Discord){
    let correctMessage = "\`\`\`$c date: 2022/02/01 course: Applied Mathematics group: YB-01 hour: 10:15 inf: Bring your own calculator\`\`\`";
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
    await message.channel.send("Event created!");
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
  eventObject.course = eventObject.course.trim();
  eventObject.inf = eventObject.inf.trim();
  var eventContents = `${eventObject.date} ${eventObject.course} ${eventObject.group} ${eventObject.hour} ${eventObject.inf}`;
  
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