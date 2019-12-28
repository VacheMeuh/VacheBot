const Discord = require('discord.js');
const ms = require("ms");
const client = new Discord.Client();
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setPresence({
        status: 'online',
        game: {
            name: `vache bot very epic`,
            type: "WATCHING"
        }
    })
});
client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('Pong!');
    }
    if (msg.content === 'cat') {
        msg.reply('look a this omg', { files: ['https://media.discordapp.net/attachments/644626283707498499/659824656441802795/ezgif.com-optimize.gif'] });
    }
});
client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find(ch => ch.name === 'join-log');
    if (!channel) return;
    const welcomeEmbed = new Discord.RichEmbed()
        .setColor('#00ff00')
        .setTitle('Someone just joined!')
        .setDescription('Welcome to the server, ' + member + '\nEnjoy your stay on this epical place !')
        .setTimestamp()
        .setFooter('Vache bot by 32Vache#6233')
    channel.send(welcomeEmbed);
    let role = message.guild.roles.find(r => r.name === "Foreigner");
    member.addRole(role).catch(console.error);
});
client.on('guildMemberRemove', member => {
    const channel = member.guild.channels.find(ch => ch.name === 'join-log');
    if (!channel) return;
    const welcomeEmbed = new Discord.RichEmbed()
        .setColor('#ff0000')
        .setTitle('Someone just quitted!')
        .setDescription('Goodbye ' + member + '...')
        .setTimestamp()
        .setFooter('Vache bot by 32Vache#6233')
    channel.send(welcomeEmbed);
});
client.on('message', message => {
    if (!message.guild) return;
    if (message.content.startsWith('/kick')) {
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send('You do not have permissions!');
        const user = message.mentions.users.first();
        if (user) {
            const member = message.guild.member(user);
            if (member) {
                member.kick('Kicked using Vache bot').then(() => {
                    message.reply(`Successfully kicked ${user.tag}`);
                }).catch(err => {
                    message.reply('Couldn\'t kick user!');
                    console.error(err);
                });
            } else {
                message.reply('That user isn\'t in this server!');
            }
        } else {
            message.reply('You didn\'t mention the user to kick!');
        }
    }
});
client.on('message', message => {
    if (!message.guild) return;
    if (message.content.startsWith('/ban')) {
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('You do not have permissions!');
        const user = message.mentions.users.first();
        if (user) {
            const member = message.guild.member(user);
            if (member) {
                member.ban({
                    reason: 'Banned using Vache bot',
                }).then(() => {
                    message.reply(`Successfully banned ${user.tag}`);
                }).catch(err => {
                    message.reply('Couldn\'t ban user!');
                    console.error(err);
                });
            } else {
                message.reply('That user isn\'t in this guild!');
            }
        } else {
            message.reply('You didn\'t mention the user to ban!');
        }
    }
});
client.on('message', message => {
    if (!message.guild) return;
    if (message.content.startsWith('/mute')) {
        if (!message.member.hasPermission("MANANGE_MESSAGES")) return message.channel.send('You do not have permissions!');
        const user = message.mentions.users.first();
        if (user) {
            const member = message.guild.member(user);
            if (member) {
                let role = message.guild.roles.find(r => r.name === "Muted");
                member.addRole(role).then(() => {
                    message.reply(`Successfully muted ${user.tag}`);
                }).catch(err => {
                    message.reply('Couldn\'t mute user!');
                    console.error(err);
                });
            } else {
                message.reply('That user isn\'t in this server!');
            }
        } else {
            message.reply('You didn\'t mention the user to mute!');
        }
    }
});
client.on('message', message => {
    if (message.content === "/rolemute") {
        message.guild.channels.forEach(async (channel, id) => {
            let role = message.guild.roles.find(r => r.name === "Muted");
            await channel.overwritePermissions(role, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
            });
        });
    }
});
