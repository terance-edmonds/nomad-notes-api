const dotenv = require('dotenv');

dotenv.config();

const { PORT, NODE_ENV, ENCRYPT_KEY, APP_URL, API_URL, HASH, HASH_REFRESH, DB_CONNECTION } =
    process.env;

const config = {
    version: 'v1',
    port: parseInt(PORT) || 8000,
    node_env: NODE_ENV,
    mongodb_con: DB_CONNECTION,
    encryption: {
        encrypt_key: ENCRYPT_KEY,
        hash: HASH,
        hash_refresh: HASH_REFRESH
    },
    client_urls: {
        app: APP_URL
    },
    server_urls: {
        api: API_URL
    }
};

// console.log(config);
module.exports = config;
