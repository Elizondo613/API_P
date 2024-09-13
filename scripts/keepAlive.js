const fetch = require('node-fetch');
const cron = require('node-cron');
require('dotenv').config();

const API_URL = process.env.API_URL || 'https://api-p.onrender.com';

async function pingAPI() {
    try {
        const response = await fetch(API_URL);
        if (response.ok) {
            console.log(`API pinged successfully at ${new Date().toISOString()}`);
        } else {
            console.error(`Failed to ping API. Status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error pinging API:', error);
    }
}

//Ejecuta la función cada 10 minutos
cron.schedule('*/10 * * * *', pingAPI);

console.log('Ping script started. Will ping API every 10 minutes.');

//Ejecuta inmediatamente al iniciar el script
pingAPI();