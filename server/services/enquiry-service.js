import { request } from 'express';
import { sheets, ServerConfig } from '../config/index.js';

const HEADERS = ['Name', 'Email', 'Category', 'Message', 'Date'];

// * checking sheet exists or not
const sheetExists = async (date) => {
    // Fetch existing sheets in the spreadsheet
    const response = await sheets.spreadsheets.get({
        spreadsheetId: ServerConfig.GOOGLE_SHEETS.ID,
    });

    if (!response) {
        console.error('Spreadsheet not found!');
    }

    return response.data.sheets.some((sheet) => sheet.properties.title === date);
};

// * setting the headers for new sheet
const setSheetHeaders = async (date) => {
    await sheets.spreadsheets.values.update({
        spreadsheetId: ServerConfig.GOOGLE_SHEETS.ID,
        range: `${date}!A1:E1`,
        valueInputOption: 'RAW',
        requestBody: {
            values: [HEADERS],
        },
    });
};

// * froze the first row of the sheet
const freezeSheetFirstRow = async (newSheetId) => {
    await sheets.spreadsheets.batchUpdate({
        spreadsheetId: ServerConfig.GOOGLE_SHEETS.ID,
        requestBody: {
            requests: [
                {
                    // Freeze the first row
                    updateSheetProperties: {
                        properties: {
                            sheetId: newSheetId,
                            gridProperties: {
                                frozenRowCount: 1,
                            },
                        },
                        fields: 'gridProperties.frozenRowCount',
                    },
                },
            ],
        },
    });
};

// * create new sheet in the spreadsheet
const createSheet = async (date) => {
    // * step 1: Create new sheet
    const createSheetResponse = await sheets.spreadsheets.batchUpdate({
        spreadsheetId: ServerConfig.GOOGLE_SHEETS.ID,
        requestBody: {
            requests: [
                {
                    addSheet: {
                        properties: {
                            title: date,
                        },
                    },
                },
            ],
        },
    });

    // * get new sheet Id
    const newSheetId = createSheetResponse.data.replies[0].addSheet.properties.sheetId;

    // * step 2: set headers in the new sheet
    await setSheetHeaders(date);

    // * step 3: freeze the first row
    await freezeSheetFirstRow(newSheetId);
};

// * append the enquiry data received from user
const appendEnquiryData = async (date, enquiryData) => {
    const { name, email, category, message } = enquiryData;

    await sheets.spreadsheets.values
        .append({
            spreadsheetId: ServerConfig.GOOGLE_SHEETS.ID,
            range: `${date}!A:E`,
            insertDataOption: 'INSERT_ROWS',
            valueInputOption: 'RAW',
            requestBody: {
                values: [[name, email, category, message, date]],
            },
        })
        .catch((err) => {
            console.error(err.response.data.error);
        });
};

export default {
    appendEnquiryData,
    createSheet,
    sheetExists,
};
