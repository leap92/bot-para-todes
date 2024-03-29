const eris = require('eris');
const axios = require('axios');
const _ = require('lodash');

// Create a Client instance with our bot token.
const bot = new eris.Client('ODU1MjQxMjk3NDc2MTkwMjI4.GZmQor.QSpnqYn8Ffy8HhUZIPI9tRsD3vmHifcaBMzPH0');
const { google } = require("googleapis");

// When the bot is connected and ready, log to console.
bot.on('ready', () => {
    console.log('Connected and ready.');
});

// Every time a message is sent anywhere the bot is present,
// this event will fire and we will check if the bot was mentioned.
// If it was, the bot will attempt to respond with "Present".
bot.on('messageCreate', async (msg) => {
    const botWasMentioned = msg.mentions.find(
        mentionedUser => mentionedUser.id === bot.user.id && msg.channel.name == "rank"
    );

    if (botWasMentioned) {
        try {
            const leaderboard_id = _.includes(msg.content, "tg") ? 4 : 3;
            await axios
                .get(`https://aoe2.net/api/leaderboard?game=aoe2de&leaderboard_id=${leaderboard_id}&start=1&count=10000&search=[TodEs]`)
                .then(function (response) {
                    let tuvieja = [];
                    response.data.leaderboard.map((r, index, array) => tuvieja.push((index + 1) + " " + r.name + " " + r.rating));
                    msg.channel.createMessage(tuvieja.join('\n') + "\n PD: Utena tkm 😍");
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
            //await msg.channel.createMessage('Present');
        } catch (err) {
            // There are various reasons why sending a message may fail.
            // The API might time out or choke and return a 5xx status,
            // or the bot may not have permission to send the
            // message (403 status).
            console.warn('Failed to respond to mention.');
            console.warn(err);
        }
    }

    if (msg.content == "aber el prode") {

        try {
            let cl = auth();
            const gsapi = google.sheets({ version: 'v4', auth: cl });
            const opt1 = {
                spreadsheetId: '1nVvIYIGSdSuCGhucyOWqhuS392AEiM69lUm-0VCKD8Q',
                range: 'Ranking!K2:K25'
            }

            let jugadoresResponse = await gsapi.spreadsheets.values.get(opt1);
            let jugadores = jugadoresResponse.data.values;

            const opt2 = {
                spreadsheetId: '1nVvIYIGSdSuCGhucyOWqhuS392AEiM69lUm-0VCKD8Q',
                range: 'Ranking!L2:L25'
            }

            let puntosResponse = await gsapi.spreadsheets.values.get(opt2);
            let puntos = puntosResponse.data.values;

            let mensaje = '';
            for (let index = 0; index < jugadores.length; index++) {
                mensaje += jugadores[index] + ' ' + puntos[index] + '\n';
            }

            await msg.channel.createMessage(mensaje);
        } catch (err) {
            // There are various reasons why sending a message may fail.
            // The API might time out or choke and return a 5xx status,
            // or the bot may not have permission to send the
            // message (403 status).
            console.warn('Failed to respond to mention.');
            console.warn(err);
        }
    }
});

bot.on('error', err => {
    console.warn(err);
});

bot.connect();