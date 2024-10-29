import { google } from 'googleapis';
import { ServerConfig } from './index.js';

const { CLIENT_EMAIL, PRIVATE_KEY } = ServerConfig.GOOGLE_SHEETS;

const scopes = ['https://www.googleapis.com/auth/spreadsheets'];

const sheetClient = new google.auth.JWT(CLIENT_EMAIL, null, PRIVATE_KEY, scopes);

export const sheets = new google.sheets({
    version: 'v4',
    auth: sheetClient,
});
