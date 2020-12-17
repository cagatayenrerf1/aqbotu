const Discord = require('discord.js');
const db = require('quick.db');
const DBL = require("dblapi.js");
const ayarlar = require('../ayarlar.json');

exports.run = async(client, message, args) => {
    const embed = new Discord.MessageEmbed()
        .setAuthor(`${client.user.username} `, client.user.displayAvatarURL({dynamic: true}))
        .setColor('#d02090')
        .setTitle(` Botumuzu Ekleyceğiniz İçin Teşekkürler! `)
        .addField('Teşekkürler :heart:', '[TIKLA](https://discord.gg/NF6avRa6)', true)
        .setFooter(`⚔️ » Ana Komutlar !!ping !!davet !!botbilgi`)
    return  message.channel.send(embed);
  
        };




exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
};

exports.help = {
  name: 'davet',
  description: 'a!davet-sistemi Menüsü',
  usage: 'yardım'
};