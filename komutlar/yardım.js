const Discord = require('discord.js');
const db = require('quick.db');
const DBL = require("dblapi.js");
const ayarlar = require('../ayarlar.json');

exports.run = async(client, message, args) => {
    const embed = new Discord.MessageEmbed()
        .setAuthor(`${client.user.username} `, client.user.displayAvatarURL({dynamic: true}))
        .setColor('#d02090')
        .setTitle(` **Codebase Bot Yardım Menüsüne Hoşgeldiniz** `)
        .setDescription(`
        !!avatar 
        !!ban @kişi 
        !!botbilgi
        !!davet
        !!kick
        !!küfür-engel (aç kapat)
        !!nuke
        !!ping
        !!reklam-engel(aç-kapat)
        !!sil`)
        .setFooter(`CodeBase`)
    return  message.channel.send(embed);
  
        };




exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yardım'],
  permLevel: 0,
};

exports.help = {
  name: 'yardım',
  description: 'a!davet-sistemi Menüsü',
  usage: 'yardım'
};