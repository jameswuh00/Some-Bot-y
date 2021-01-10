console.log("Beep beep!");

require('dotenv').config(); // config() loads values from .env file

const fetch = require('node-fetch');
const Discord = require('discord.js');
const client = new Discord.Client(); // connects to the Discord API
client.login(process.env.BOT_TOKEN);

client.on('ready', () => {
    console.log('<3');
});

const replies = [
    'hi',
    'hello',
    'hiya',
    'hey'
]
client.on('message', async msg => {
    if (msg.author.bot) return; // don't reply to other bots

    //console.log(msg.content);
    if (msg.channel.id == process.env.BOT_CHANNEL_ID) { // msg recieved in the bot-testing channel
        let tokens = msg.content.split(' '); // split command into array of tokens

        
        if (tokens[0] === 'hello') {
            const index = Math.floor(Math.random() * replies.length); // Math.random() returns a float in range [0, 1)
            msg.channel.send(replies[index]);
        } else if (tokens[0] === '!gif') {
            let searchKey = 'hunterxhunter';
            if (tokens.length > 1) {
                searchKey = tokens.slice(1, tokens.length).join(' ');
            }
            let url = `https://api.tenor.com/v1/search?q=${searchKey}&key=${process.env.TENOR_KEY}&limit=8`
            let response = await fetch(url);
            let json = await response.json();
            //console.log(json);

            let index = Math.floor(Math.random() * json.results.length);
            msg.channel.send(json.results[index].url);
        } else if (tokens[0] === '!joke') {
            // API from https://sv443.net/jokeapi/v2/
            let url = `https://v2.jokeapi.dev/joke/Any`;
            let response = await fetch(url);
            let json = await response.json();
            //console.log(json);

            if (json.type === 'single') {
                msg.channel.send(json.joke);
            } else if (json.type === 'twopart') {
                msg.channel.send(json.setup);
                msg.channel.send(json.delivery);
            }   
        }
    }

});

