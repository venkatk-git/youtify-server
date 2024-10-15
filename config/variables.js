const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });

module.exports = {
    PORT: process.env.PORT || 4000,
    DB_ATLAS: process.env.DB_ATLAS,
    CLIENT_ORIGIN: process.env.CLIENT_ORIGIN,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    CALLBACK_URL: process.env.CALLBACK_URL,
};
