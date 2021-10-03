# EKA Bot
A node based discord bot made to facilitate college life. Works like a calendar (using MongoDB database) with an ability to play music.

### Usage
| Command | Description |
| --- | --- |
| $c, $create \<PARAMETERS\> | Creates new event |
* Parameters: `date`,`course`,`group`,`hour`,`inf`.
  * `date`: takes date in DD/MM/YYYY format.
  * `hour`: takes time in 24h format.
  * Example: `$c date: 01/02/2022 course: Applied Mathematics group: YB-01 hour: 10:15 inf: Bring your own calculator`
  
### Prerequisites
* Node.js, NPM

### Install
* [Create a discord bot and generate a Token](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token "Creating a discord bot & getting a token")
* [Setup a MongoDB cluster](https://www.mongodb.com/)
* Create a new file inside a main directory `.env`
* Replace `yourToken` with a generated bot Token, `yourMongodb` with a MongoDB driver link
``` 
TOKEN=yourToken
MONGODB_SRV=mongodb+srv://<username>:<password>@discordbot.uts0r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority 
```
### #TODO
###### Music
```
$p, $play     Plays desired song
$skip         Skips currently playing song
$search       Prints list of the most relevant songs
```
###### Calendar
```
$del, $delete, $remove <EVENTID>     Deletes an event matching ID
$l, $list                            Prints list of all events
```

###### Other
```
$h, $help               Prints help information
$disconnect, $leave     Disconnects bot from a voice channel
```
