const Discord = require('discord.js');
require('dotenv').config();
const mongoose = require('mongoose')
const eventModel = require("../DiscordBotJs/models/eventSchema")

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
})

client.on("message", msg => {
  if (msg.content === "$Hello"){
    msg.channel.send("```Date\t\tCourse\t\tGroup\t\tHour\t\tAdditional Information```");
  }
})

const fs = require('fs');
const { profile } = require('console');
const prefix = "$";
var eventPath = 'D:/VSCodeProjects/DiscordBotJs/events.json';
var eventRead = fs.readFileSync(eventPath);
var eventFile = JSON.parse(eventRead);

function CreateEvent(contents, _msg){
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
    module.exports = async (_Discord, _client, msg) =>{
      let event = await new eventModel.create({
        serverID: msg.guild.id,
        date: eventObject.date,
        course: eventObject.course,
        group: eventObject.group,
        hour: eventObject.hour,
        information: eventObject.inf
      });
      event.save();
      console.log("test");
    }
    
    return eventContents;
  } catch(err){
    return err;
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
      module.exports = async (Discord, client, msg) =>{
        let event = await new eventModel.insertOne({
          date: "01.02.2021",
          course: "Analiza Matematyczna",
          group: "XD-01",
          hour: "11:15",
          information: "trzeba wejsc na zooma"
        });
        event.save();
        console.log("tak");
      }
      var eventLink = CreateEvent(contents, msg);
    } catch(err){
      var eventLink = err;
    }

    msg.channel.send("```\tDate\t\t\tCourse\t\t\tGroup\t\t\tHour\t\t\tAdditional Information```");
    msg.channel.send(`\`\`\`${eventLink}\`\`\``);
      
  }
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



