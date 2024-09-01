const express = require("express");
const path = require("path");
const capitalCities = require("./my_modules/capitalCities");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    // res.sendFile(__dirname + "/views/index.html");

    // L'utilisation de path pour ce lien peut sembler un peu too much, mais c'est une bonne pratique de l'utiliser, car :
    //  - Il SÉCURISE nos url => gère les caractères bizzare entre autre
    //  - Il fonctionnera que vous codier sur Linux ou Windows par exemple => Sur Windows, les séparateurs de dossier dont des \, pas des /
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get("/city/:name", (req, res) => {
    //capitalCities.getDate();

    // let capitalCity;
    // capitalCities.forEach(city => {
    //     if (city.name.toLowerCase() === req.params.name.toLowerCase()) {
    //         capitalCity = city;
    //     }
    // });
    const capitalCity = capitalCities.getCityData(req.params.name);

    // Si on n'a pas trouvé la ville (en gros, l'utilisateur a demandé une url avec une ville non géré),
    // alors on affiche une erreur 404
    if (!capitalCity) {
        return res.status(404).sendFile(path.join(__dirname, 'views', 'error404.html'));
    }

    const day = capitalCities.getDate(capitalCity.name);
    const hour = capitalCities.getTime(capitalCity.name);

    res.send(`
        <!DOCTYPE html>
        <html lang="fr">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>Heure à ${capitalCity.name}</title>
            </head>
            <body>
                À ${capitalCity.name} nous sommes le ${day} et il est ${hour}.
            </body>
        </html>
    `);
});

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});