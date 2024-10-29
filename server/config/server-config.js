import dotenv from 'dotenv';
dotenv.config();

export default Object.freeze({
    PORT: process.env.PORT,

    //  Google Sheets Configuration
    GOOGLE_SHEETS: {
        ID: process.env.GOOGLE_SHEETS_ID,
        CLIENT_EMAIL: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        PRIVATE_KEY: process.env.GOOGLE_SHEETS_PRIVATE_KEY,
    },
});
