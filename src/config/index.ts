require('dotenv').config({ path: `.env`, override: true });

const CONFIG = {
    TOKEN: Object.freeze({
        SECRET: process.env.SECRET_TOKEN
    }),
    SERVICE_PORT: process.env.SERVICE_PORT,
    DATABASE_URI: process.env.DATABASE_URI
};

export {
    CONFIG
}