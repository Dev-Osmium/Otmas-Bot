const Discord = require('discord.js');
const client = new Discord.Client();
const VERSION = "0.9.3-alpha.2"
const config = require('./config.json');
const roleName = config.modRole
var prefix = config.prefix
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const got = require('got')

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function getHttp(theUrl) {
  got(theUrl)
    .then(response => {
        console.log(response.body);
        //=> '<!doctype html> ...'
    })
    .catch(error => {
        console.log(error.response.body);
        //=> 'Internal server error ...'
    });

}

client.on('ready', () => {
  console.log('OtmasBot V' + VERSION + ' has logged in and succesfully authenicated!');
});

client.on('message', message => {

  let command = message.content.split(' ')
  command = command.slice(prefix.length)

  if (message.author.bot) return;
  //if (!message.content.startsWith(prefix)) return;

  if (message.content.startsWith(prefix + 'ping')) {
    console.log('The bot works!')
    message.channel.sendMessage('pong!');
    message.channel.sendMessage('Current Ping:' + client.ping);
  }
//  if (message.content.startsWith(prefix + 'dog')) {
//	  var txt = httpGet('http://random.dog/woof')
//	message.channel.sendMessage('http://random.dog/' + txt);
  //}
    //if (message.content.startsWith(prefix + 'cat')) {
	//		var jsonfile = httpGet('http://random.cat/meow')
	//		var jsdc = JSON.parse(jsonfile);
	//		message.channel.sendMessage(jsdc.file);
  //}
  if (message.content.startsWith(prefix + 'cmds')) {
	  var cmdtext = 'Open commands are: \n -ping: Pong! \n -about: Displays some info. \n -authorInfo: Displays info about Otmas and Xavier Vernalls. \n -git: Sends you to the github Repository';
	  cmdtext = cmdtext.replace(/-/g,prefix);
      message.channel.sendMessage(cmdtext);
  }
  if (message.content.startsWith(prefix +'about')) {
    message.reply('This is OtmasBot Version ' + VERSION + " which was coded by @Otmas in just over 5 minutes. For more info, or to report problems, don't message him. :D \n Our website can be found here: http://dev-otmas.surge.sh/otmasbot-index.html ")
  }
  if (message.content.startsWith(prefix +'authorinfo')) {
    message.channel.sendMessage('This is totally not-lying information about @Otmas, the author of this bot.')
    message.channel.sendMessage('Otmas was born in the United States of Otmas, in the city of Otmasington D.C.')
    message.channel.sendMessage('He started programming at the early age of 0 months.')
    message.channel.sendMessage('He made his first malevolent AI at the age of 1 month')
    message.channel.sendMessage('He is also responsible for the destruction of SCP-666 and is personally responsible for the construction of SCPF Site-61')
  }
  if (message.content.startsWith(prefix + 'announce')) {
    let modRole = message.guild.find('name', roleName);
    if(message.member.roles.has(modRole)) {
       let args = message.content.split(' ')
   		 let annMsg = args.slice(1).join(" "); // remove first 2 args, then join array with a space
    	console.log(annMsg)
    	client.channels.get("251488086813442051").sendMessage(annMsg)
    } else {
  		message.reply(config.noPermsMsg);
		}

  }
  if (message.content.startsWith(prefix + 'prefix')) {
    var args = message.content.split(' ')
    prefix = args[1]
  }
  if (message.content.startsWith(prefix + 'git')) {
    message.reply('The github repo can be found at https://github.com/Oatmas64134/Otmas-Bot \n Please send all bug reports there, and not to Otmas')
  }
  if (message.content.startsWith(prefix + 'kick')) {
		let modRole = message.guild.find('name', roleName);
		if(message.member.roles.has(modRole)) {
    	let args = message.content.split(' ')
    	let userTarget = args[1]
   	  message.guild.member(args[1]).kick()
		} else {
			message.reply(config.noPermsMsg)
  }
  }
    if (message.content.startsWith(prefix + 'alive')) {
	message.reply('Yes, I am alive.\nThank you for being concerned about me!')
    }
	if (message.content.startsWith(prefix + 'trello')) {
		message.channel.sendMessage("The information trello can be found here: https://trello.com/b/dlVPh2TL/the-otmasbot")
	}
	if (message.content.startsWith(prefix + 'servers')) {
		message.channel.sendMessage("Current servers the OtmasBot is connected to are the following \n" + client.guilds);
	}
  if (message.content.startsWith(prefix + 'ddos')) {
    let modRole = config.modRole;
    if(message.member.roles.has(modRole)) {
      let args = message.content.split(' ')
      let theUrl = args.slice(0)
      let times = args.slice(1)
      var timesDone;
      while (timesDone<times) {
        getHttp(theUrl)
      }
    } else {
      message.reply(config.noPermsMsg)
    }
  }
});

client.login(config.token);
