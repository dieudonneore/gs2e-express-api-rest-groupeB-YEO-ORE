const dotenv = require('dotenv')
dotenv.config({path:'./.env'});
const envVariable = process.env
const Config = {
    dburl: (envVariable.ENV === "prod")? envVariable.DB_URL_PROD :envVariable.DB_URL_DEV,
    dbname:(envVariable.ENV === "prod")? envVariable.DB_NAME_PROD :envVariable.DB_NAME_DEV,
    dbport:(envVariable.ENV === "prod")? envVariable.DB_PORT_PROD :envVariable.DB_PORT_DEV,
    appName: envVariable.API_NAME,
    apiPort:envVariable.API_PORT,
    apiSecret:envVariable.API_SECRET
}

module.exports = Config