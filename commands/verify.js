const Discord = require("Discord.js");

module.exports.run = async (bot, message, args) => {
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
        }
    }
};

module.exports.help = {
    name: "verify"
}