exports.run = (client, message) => {
        let db = require("quick.db")
        let Discord = require("discord.js")
  
    let küfür = db.fetch(`küfür.${message.guild.id}.durum`)
  const codebase = new Discord.MessageEmbed()
     .setColor("CYAN")
.setDescription(`<:ReddetmekPng:783355287913496576> **HATA** <:ReddetmekPng:783355287913496576> - Bu Sunucuda Yetkili Değilsin.`)
        if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send(codebase)
      if(küfür) {
      db.delete(`küfür.${message.guild.id}`)
      message.channel.send(`<:OnayPng:783355285589983282> **Başarılı ile küfür engel kapandı.** <:OnayPng:783355285589983282>`).then(l => {
      l.delete({timeout: 5000})
    })
    }else{
      db.set(`küfür.${message.guild.id}.durum`,true)
      message.channel.send(`<:OnayPng:783355285589983282> **Başarılı ile küfür engel açıldı. ** <:OnayPng:783355285589983282>`).then(l => {
      l.delete({timeout: 5000})
    })
    }
    }

 exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["küfür-engel"],
  permLevel: 0
};

exports.help = {
  name: 'küfür',
  description: 'WESTRA',
  usage: 'WESTRA'
}