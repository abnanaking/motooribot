const Discord = require('discord.js');
const fs = require('fs');
const bot = new Discord.Client();
const footer = "Motooriツ Bot | by kawaiiツ";
const prefix = "!"
const Token = "NTQwMjc1MzIzODM3NzQzMTA0.DzTwNw.tTggkaztzyLVRTPImCsHbagcxMQ"
bot.commands = new Discord.Collection();

//reads all the files in the commands folder and prints("file.js loaded!")

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("You messed up, Couldn't find any commands.");
        return;
    }

    jsfile.forEach((f, i) =>{
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);

    });
});


//prints(".. is online on .. servers")

bot.on("ready", () => {
    console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);

    bot.user.setActivity('Motooriツ Bot | by kawaiiツ');
});


//checks if a js file from the commands folder should be activated

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args);
});


//adds the NV role to new members

bot.on("guildMemberAdd", member => {
    var nonverified = member.guild.roles.find('name','NV');
    member.addRole(nonverified);
});


//activates and runs the !verify command

bot.on('message', function(message) {
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
    }   else message.delete()
});





//activates the bot

bot.login(Token);