const Client = require('discord.js');
const fs = require('fs');
const client = new Client.Client();
const footer = "Motooriツ Bot | by kawaiiツ";
const PREFIX = "!"
const Token = "NTQwMjc1MzIzODM3NzQzMTA0.DzTwNw.tTggkaztzyLVRTPImCsHbagcxMQ"
const ytdl = require('ytdl-core');
const ffmpeg = require('ffmpeg');
client.commands = new Client.Collection();

//reads all the files in the commands folder and prints("file.js loaded!")
//
//fs.readdir("./commands/", (err, files) => {
//
//    if(err) console.log(err);
//
//    let jsfile = files.filter(f => f.split(".").pop() === "js")
//    if(jsfile.length <= 0){
//        console.log("You messed up, Couldn't find any commands.");
//        return;
//   }
//
//    jsfile.forEach((f, i) =>{
//       let props = require(`./commands/${f}`);
//        console.log(`${f} loaded!`);
//        bot.commands.set(props.help.name, props);
//
//    });
//});


//prints(".. is online on .. servers")

client.on("ready", () => {
    console.log(`${client.user.username} is online on ${client.guilds.size} servers!`);

    client.user.setActivity('Motooriツ Bot | by kawaiiツ');
});


//checks if a js file from the commands folder should be activated
//
//bot.on("message", async message => {
//   if(message.author.bot) return;
//   if(message.channel.type === "dm") return;
//
//    let messageArray = message.content.split(" ");
//   let cmd = messageArray[0];
//   let args = messageArray.slice(1);
//
//   let commandfile = bot.commands.get(cmd.slice(prefix.length));
//  if(commandfile) commandfile.run(bot,message,args);
//});


//adds the NV role to new members

client.on("guildMemberAdd", member => {
    var nonverified = member.guild.roles.find('name','NV');
    member.addRole(nonverified);
});


//activates and runs the !verify command

client.on('message', function(message) {
    if (message.channel.name === "verify") {
        if (message.content.toLowerCase() === "!verify") {
            const verifyRole = message.guild.roles.find('name','V');
            var role = message.guild.roles.find('name','NV');
            const memberrole = message.guild.roles.find('name','Member');
            if (message.member.roles.has(verifyRole.id)) {
                message.delete()
                message.author.send({ embed: {
                    color: 0xffffff,
                    title: 'Verification',
                    description: ':x: You cannot be verified again.',
                    footer: {
                            text: 'Motooriツ Bot | by kawaiiツ'
                    },
                    timestamp: new Date()
                }})
                return;
            }
            if (message.member.roles.has(role.id)) {                   
                message.member.addRole(verifyRole);
                message.member.removeRole(role);
                message.member.addRole(memberrole)
                message.author.send({ embed: {
                    color: 0xffffff,
                    title: 'Verification',
                    description: ':white_check_mark: You have been verified.',
                    footer: {
                            text: 'Motooriツ Bot | by kawaiiツ'
                    },
                    timestamp: new Date()
                }})
                message.delete()
            }
        }   else message.delete()
    }
});

client.on('message', async msg => {
    if(msg.author.bot) return undefined;
    if(!msg.content.startsWith(PREFIX)) return undefined;
    const args = msg.content.split(" ");

    if(msg.content.startsWith(`${PREFIX}play`)) {
        const voiceChannel = msg.member.voiceChannel;
        if (!voiceChannel) return msg.channel.send('You need to be in a voice channel to play music!');
        const permissions = voiceChannel.permissionsFor(msg.client.user);
        if(!permissions.has('CONNECT')) {
            return msg.channel.send('I cannot connect to your voice channel, make sure you have the proper permissions!');
        }
        if (!permissions.has('SPEAK')) {
            return msg.channel.send('I cannot connect to your voice channel, make sure you have the proper permissions!');
        }

        try {
            var connection = await voiceChannel.join();
        }   catch (error) {
            console.error(`I could not join the voice channel: ${error}`);
            return; msg.channel.send(`I could not join the voice channel: ${error}`);
        }
        
        const dispatcher = connection.playStream(ytdl(args[1]))
        .on('end', () => {
            console.log('Song ended!');
            voiceChannel.leave();
        })
        .on('error', error => {
            console.error(error);
        });
        dispatcher.setVolumeLogarithmic(5 / 5);
    }
})


//activates the bot

client.login(Token);