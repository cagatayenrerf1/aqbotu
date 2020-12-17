const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("BAN_MEMBERS")) {
    const embed = new Discord.MessageEmbed()
      .setDescription("<:ReddetmekPng:783355287913496576> ``Bu komutu kullanabilmek için Üyeleri Yasakla yetkisine sahip olmalısın!``")
      .setColor("BLACK");
 
    message.channel.send(embed);
    return;
  }
 
  let u = message.mentions.users.first();
  if (!u) {
    return message.channel.send(
      new Discord.MessageEmbed()
        .setDescription("<:ReddetmekPng:783355287913496576> Lütfen kicklenecek kişiyi etiketleyiniz!")
        .setColor("BLACK")
        .setFooter(bot.user.username, bot.user.avatarURL)
    );
  }
 
  const embed = new Discord.MessageEmbed()
    .setColor("BLACK")
    .setDescription(`<:ekiPng:783355291580104796> ${u} Adlı şahsın sunucudan atılmasını onaylıyor musunuz?`)
    .setFooter(bot.user.username, bot.user.avatarURL);
  message.channel.send(embed).then(async function(sentEmbed) {
    const emojiArray = ["✅"];
    const filter = (reaction, user) =>
      emojiArray.includes(reaction.emoji.name) && user.id === message.author.id;
    await sentEmbed.react(emojiArray[0]).catch(function() {});
    var reactions = sentEmbed.createReactionCollector(filter, {
      time: 30000
    });
    reactions.on("end", () => sentEmbed.edit("<:ReddetmekPng:783355287913496576> İşlem iptal oldu!"));
    reactions.on("collect", async function(reaction) {
      if (reaction.emoji.name === "✅") {
        message.channel.send(
          `<:OnayPng:783355285589983282> İşlem onaylandı! ${u} adlı şahıs sunucudan atıldı!`
        );
 
        message.guild.member(u).kick();
      }
    });
  });
};
 
module.exports.conf = {
  aliases: [],
  permLevel: 0,
  enabled: true,
  guildOnly: true,
  kategori: "moderasyon"
};
 
module.exports.help = {
  name: "kick",
  description: "kick",
  usage: "ban"
};