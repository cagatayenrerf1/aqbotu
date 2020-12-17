const express = require("express");
const app = express();
const http = require("http");
app.get("/", (request, response) => {
  console.log(
    `Bot az önce ping yedi.`
  );
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
const Discord = require("discord.js");
const db = require('quick.db')
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const fs = require("fs");
const moment = require("moment");
moment.locale("tr")
const chalk = require("chalk");
require("./util/eventLoader")(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token)

//KOMUTLAR İLE İLGİLİ KISIM//

////reklam-engel

const reklam = [
        ".com",
        ".net",
        ".xyz",
        ".tk",
        ".pw",
        ".io",
        ".me",
        ".gg",
        "www.",
        "https",
        "http",
        ".gl",
        ".org",
        ".com.tr",
        ".biz",
        "net",
        ".rf",
        ".gd",
        ".az",
        ".party",
		    ".gf"
      ];
client.on("messageUpdate", async (old, nev) => {
  
    if (old.content != nev.content) {
    let i = await db.fetch(`reklam.${nev.member.guild.id}.durum`);
    let y = await db.fetch(`reklam.${nev.member.guild.id}.kanal`);
   if (i) {
      
      if (reklam.some(word => nev.content.includes(word))) {
      if (nev.member.hasPermission("BAN_MEMBERS")) return ;
       //if (ayarlar.gelistiriciler.includes(nev.author.id)) return ;
 const embed = new Discord.MessageEmbed() .setColor("#ff7e00") .setDescription(`<:ReddetmekPng:783355287913496576> ${nev.author} , **Mesajını Editleyerek Reklam Yapmaya Çalıştı!**`)
            .addField("Reklamı:",nev)
        
            nev.delete();
            const embeds = new Discord.MessageEmbed() .setColor("#ff7e00") .setDescription(`<:ReddetmekPng:783355287913496576> ${nev.author} , **Mesajı Editleyerek Reklam Yapamana İzin Veremem!**`) 
          client.channels.cache.get(y).send(embed)
            nev.channel.send(embeds).then(msg => msg.delete({timeout:5000}));
          
      }
    } else {
    }
    if (!i) return;
  }
});

client.on("message", async msg => {

     
    if(msg.author.bot) return;
    if(msg.channel.type === "dm") return;
         let y = await db.fetch(`reklam.${msg.member.guild.id}.kanal`);
   
    let i = await db.fetch(`reklam.${msg.member.guild.id}.durum`);
          if (i) {
              if (reklam.some(word => msg.content.toLowerCase().includes(word))) {
                try {
                 if (!msg.member.hasPermission("MANAGE_GUILD")) {
                 //  if (!ayarlar.gelistiriciler.includes(msg.author.id)) return ;
     msg.delete({timeout:750});
                    const embeds = new Discord.MessageEmbed() .setColor("#ff7e00") .setDescription(`<a:redke:763316512937082890> <@${msg.author.id}> , **Bu Sunucuda Reklam Yapmak Yasak!**`)
      msg.channel.send(embeds).then(msg => msg.delete({timeout: 5000}));
                const embed = new Discord.MessageEmbed() .setColor("#ff7e00") .setDescription(`<a:redke:763316512937082890> ${msg.author} , **Reklam Yapmaya Çalıştı!**`) .addField("Mesajı:",msg)
               client.channels.cache.get(y).send(embed)
                  }              
                } catch(err) {
                  console.log(err);
                }
              }
          }
         if(!i) return ;
});


//reklam engel son //


//küfür engel başlangıç//
const küfür = [
        "siktir",
        "fuck",
        "puşt",
        "pust",
        "piç",
        "sikerim",
        "sik",
        "yarra",
        "yarrak",
        "amcık",
        "orospu",
        "orosbu",
        "orosbucocu",
        "oç",
        ".oc",
        "ibne",
        "yavşak",
        "bitch",
        "dalyarak",
        "amk",
        "awk",
        "taşak",
        "taşşak",
        "daşşak",
		    "sikm",
		    "sikim",
		    "sikmm",
	    	"skim",
		    "skm",
	     	"sg"
      ];
client.on("messageUpdate", async (old, nev) => {
  
    if (old.content != nev.content) {
    let i = await db.fetch(`küfür.${nev.member.guild.id}.durum`);
    let y = await db.fetch(`küfür.${nev.member.guild.id}.kanal`);
   if (i) {
      
      if (küfür.some(word => nev.content.includes(word))) {
      if (nev.member.hasPermission("BAN_MEMBERS")) return ;
       //if (ayarlar.gelistiriciler.includes(nev.author.id)) return ;
 const embed = new Discord.MessageEmbed() .setColor("#ff7e00") .setDescription(`<a:redke:763316512937082890> ${nev.author} , **Mesajını Editleyerek Küfür Etmeye Çalıştı!**`)
            .addField("Küfür:",nev)
        
            nev.delete();
            const embeds = new Discord.MessageEmbed() .setColor("#ff7e00") .setDescription(`<a:redke:763316512937082890> ${nev.author} , **Mesajı Editleyerek Küfür Etmene İzin Veremem!**`) 
          client.channels.cache.get(y).send(embed)
            nev.channel.send(embeds).then(msg => msg.delete({timeout:5000}));
          
      }
    } else {
    }
    if (!i) return;
  }
});

client.on("message", async msg => {

     
    if(msg.author.bot) return;
    if(msg.channel.type === "dm") return;
         let y = await db.fetch(`küfür.${msg.member.guild.id}.kanal`);
   
    let i = await db.fetch(`küfür.${msg.member.guild.id}.durum`);
          if (i) {
              if (küfür.some(word => msg.content.toLowerCase().includes(word))) {
                try {
                 if (!msg.member.hasPermission("MANAGE_GUILD")) {
                 //  if (!ayarlar.gelistiriciler.includes(msg.author.id)) return ;
     msg.delete({timeout:750});
                    const embeds = new Discord.MessageEmbed() .setColor("#ff7e00") .setDescription(`<a:redke:763316512937082890> <@${msg.author.id}> , **Bu Sunucuda Küfür Yasak!**`)
      msg.channel.send(embeds).then(msg => msg.delete({timeout: 5000}));
                const embed = new Discord.MessageEmbed() .setColor("#ff7e00") .setDescription(`<a:redke:763316512937082890> ${msg.author} , **Küfür Etmeye Çalıştı!**`) .addField("Mesajı:",msg)
               client.channels.cache.get(y).send(embed)
                  }              
                } catch(err) {
                  console.log(err);
                }
              }
          }
         if(!i) return ;
});

//küfür engel son //