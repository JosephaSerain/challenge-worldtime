const express = require('express');
const dayjs = require('dayjs');
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
const capitalCities = require('./my_modules/capitalCities');

const app = express();
dayjs.extend(utc);
dayjs.extend(timezone);

function htmlUlListElement(city) {
    return `
        <ul>
            <li><a href="/city/${city.name}">${city.name}</a></li>
        </ul>
    `;
};


app.get("/accueil", (req, res)=>{
    res.send(`   
         
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Accueil</title>
        </head>
        <body>
            <h1>Accueil</h1>
            ${capitalCities.map(city => htmlUlListElement(city)).join('')}
            <a href="/Accueil">Retour</a>
        </body>
        </html>`);

});

app.get("/city/:cityName", function (req, res) {
    res.send(`vous avez choisit la ville de : ${req.params.cityName} `)
});
    



app.listen(3000);