import dotenv from 'dotenv';
dotenv.config();

export default Object.freeze({
    port: process.env.PORT,
});
