const { google } = require("googleapis");

module.exports = function () {
    const keys = require("./credentials.json");
    const client = new google.auth.JWT(
        keys.client_email,
        null,
        keys.private_key,
        ["https://www.googleapis.com/auth/spreadsheets"]);

    client.authorize();

    return client;
}