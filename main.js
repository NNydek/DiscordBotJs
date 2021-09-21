const Discord = require('discord.js');
require('dotenv').config();
const mongoose = require('mongoose')

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
})

// client.on("message", message => {
//   if (message.content.startsWith === "$e"){
//     message.channel.send("asdf");
//     let contents = message.content.split(" ");
//     try {
//       var eventLink = await handleCreateEvent(contents, message);
//     } catch(error){
//       var eventLink = error;
//     }
//   }
// })

// async function handleCreateEvent(contents, messageObj) {
//   eventObject = {
//       date: "",
//       time: "",
//       endtime: "",
//       name: ""
//   }

//   contents.forEach(string => {      
//       if(string.startsWith("name:")) {
//           eventObject.name = string.substring(5);
//       }

//       if(string.startsWith("date:")) {
//           eventObject.date = string.substring(5);
//       }

//       if(string.startsWith("time:")) {
//           let timePM = string.substring(5);
//           let timeConverted = convertTime(timePM)

//           eventObject.time = timeConverted
//       }

//       if(string.startsWith("endtime:")) {
//           let timePM = string.substring(8);
//           let timeConverted = convertTime(timePM)
          
//           eventObject.endtime = timeConverted
//       }
//   });
// }

client.on("message", msg => {
  if (msg.content === "$Hello"){
    msg.channel.send("```Date\t\tCourse\t\tGroup\t\tHour\t\tAdditional Information```");
  }
})

const fs = require('fs');
const prefix = "$";
var eventPath = 'D:/VSCodeProjects/DiscordBotJs/events.json';
var eventRead = fs.readFileSync(eventPath);
var eventFile = JSON.parse(eventRead);

function CreateEvent(contents, messageObj){
  eventObject = {
    date: "",
    course: "",
    group: "",
    hour: "",
    inf: ""
  }
  var dateBool, courseBool, groupBool, hourBool = true;
  contents.forEach(string => {      
    if(string.startsWith("date:")) {
      eventObject.date = string.substring(5);
    } else if (!string.startsWith("course:") && !string.startsWith("group:") && !string.startsWith("hour:") && !string.startsWith("inf:") && dateBool != false) {
        eventObject.date += " " + string;
    }
    
    if(string.startsWith("course:")) {
      dateBool = false;
      eventObject.course = string.substring(7);
    } else if (!string.startsWith("date:") && !string.startsWith("group:") && !string.startsWith("hour:") && !string.startsWith("inf:") && courseBool != false) {
        eventObject.course += " " + string;
      }
    
    if(string.startsWith("group:")) {
      courseBool = false;
      eventObject.group = string.substring(6);
    } else if (!string.startsWith("date:") && !string.startsWith("course:") && !string.startsWith("hour:") && !string.startsWith("inf:") && groupBool != false) {
        eventObject.group += " " + string;
      }
    
    if(string.startsWith("hour:")) {
      groupBool = false;
      eventObject.hour = string.substring(5);
    } else if (!string.startsWith("date:") && !string.startsWith("course:") && !string.startsWith("group:") && !string.startsWith("inf:") && hourBool != false) {
        eventObject.hour += " " + string;
      }
    
    if(string.startsWith("inf:")) {
      hourBool = false;
      eventObject.inf = string.substring(4);
    } else if (!string.startsWith("date:") && !string.startsWith("course:") && !string.startsWith("group:") && !string.startsWith("hour:")) {
        eventObject.inf += " " + string;
      }
    
      else{
      eventObject.inf += " " + string;
      }

  });

  var eventContents = eventObject.date + "\t " + eventObject.course + "\t " + eventObject.group + "\t " + eventObject.hour + "\t " + eventObject.inf;

  try {
    return eventContents;
  } catch(error){
    return error;
  }
}

client.on("message", msg => {
  if (msg.author.bot) return;
  
  if (msg.content.indexOf(prefix) !== 0) return;

  let contents = msg.content.split(" ");

  const args = msg.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  
  if (command === "e"){
    try{
      var eventLink = CreateEvent(contents, msg);
    } catch(error){
      var eventLink = error;
    }

    msg.channel.send("```\tDate\t\t\tCourse\t\t\tGroup\t\t\tHour\t\t\tAdditional Information```");
    msg.channel.send(`\`\`\`${eventLink}\`\`\``);
      
    // let data = "";
    // for (let index = 0; index < args.length; index++) {
    //   data += args[index] + " ";
    // }
    // let dataArray = [4];
    // let char = "";
    // for (let index = 0; index < data.length; index++) {
    //   char = data.charAt(index);
    //   if (char === '"'){
        
    //   }
    // }
    // msg.channel.send(data);
    // let date = args[0];
    // let course = args[1];
    // let group = args[2];
    // let hour = args[3];
    // let inf = args[4];
    //msg.channel.send(`\`\`\`${date} ${course} ${group} ${hour} ${inf}\`\`\``);
  }
  // var userId = msg.author.id;
  // eventFile[userId] = {date: 0, course: "", group: "", hour: 0, inf: ""};
  // fs.writeFileSync(eventPath, JSON.stringify(eventFile, null, 2));
})

mongoose
  .connect(process.env.MONGODB_SRV, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  })
  .then(() => {
  console.log('Connected to the database!');
  })
  .catch((err) => {
  console.log(err);
})

client.login(process.env.TOKEN);



