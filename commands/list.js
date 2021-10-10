const { MessageEmbed } = require(`discord.js`);
const eventModel = require("../models/eventSchema");

module.exports = {
    name: 'list',
    aliases: ['l', 'ls'],
    description: "Prints list of all events",
    async execute(client, message, args, Discord){
        let eventData = await eventModel.find({ serverID: message.guild.id }).sort({date: -1, hour: -1});
        try{
            let event;
            let eventDatesHours = "", eventCoursesGroups = "", eventInformations = "";
            for (let i = 0; i < eventData.length; i++){
                event = eventData[i];
                eventDatesHours += `\`\`\`${event.date}\n${event.hour}\`\`\``;
                if(event.course.length < 22){
                    eventCoursesGroups += `\`\`\`${event.course} \n${event.group}\`\`\``;
                } else{
                    eventCoursesGroups += `\`\`\`${event.course} ${event.group}\`\`\``;
                }
                if(event.information.length <= 25){
                    eventInformations += `\`\`\`${event.information}\n \`\`\``;
                } else{
                    eventInformations += `\`\`\`${event.information}\`\`\``;
                }
            }
            const listData = new MessageEmbed()
                .setColor('#0099ff')
                .addFields(
                    { name: 'DATE & HOUR', value: `${eventDatesHours}`, inline: true },
                    { name: 'COURSE & GROUP', value: `${eventCoursesGroups}`, inline: true },
                    { name: 'INFORMATION', value: `${eventInformations}`, inline: true },
                );
            await message.channel.send({ embeds: [listData] });
        } catch(err){
            return err;
        }
    }
}