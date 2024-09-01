
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
require("dayjs/locale/fr");

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("fr");

const capitalCities = [
    {
        name: "Paris",
        tz: "Europe/Paris"
    },
    {
        name: "Londres",
        tz: "Europe/London"
    },
    {
        name: "Washington",
        tz: "US/Eastern"
    },
    {
        name: "Beijing",
        tz: "Asia/Shanghai"
    },
    {
        name: "Moscou",
        tz: "Europe/Moscow"
    },
    {
        name: "Tokyo",
        tz: "Asia/Tokyo"
    },
    {
        name: "Canberra",
        tz: "Australia/Canberra"
    }
];

// On exporte notre module afin qu'il soit accessible depuis l'exterieur
module.exports = {
    /**
     * Récupère les données d'une ville en fonction de son nom
     *
     * @param {string} cityName
     * @returns {Object|undefined}
     */
    getCityData(cityName) {
        return capitalCities.find(city => city.name.toLowerCase() === cityName.toLowerCase().replace("-", " "));
    },

    /**
     * Récupère la date du jour pour une ville donnée
     *
     * @param {string} cityName
     * @returns 
     */
    getDate(cityName) {
        const cityData = this.getCityData(cityName);

        if (!cityData) {
            return null;
        }

        return dayjs().tz(cityData.tz).format("dddd D MMMM YYYY");
    },

    /**
     * Récupère l'heure pour une ville donnée
     *
     * @param {string} cityName
     * @returns
     */
    getTime(cityName) {
        const cityData = this.getCityData(cityName);

        if (!cityData) {
            return null;
        }

        return dayjs().tz(cityData.tz).format("H:mm:ss");
    },
};
