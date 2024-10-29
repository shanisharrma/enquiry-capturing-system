import dayjs from 'dayjs';
import { EnquiryService } from '../services/index.js';
import { StatusCodes } from 'http-status-codes';

export const enquiryController = async (req, res) => {
    // destructure the req body
    const { name, email, category, message } = req.body;

    // get current date
    const currentDate = dayjs().format('DD-MM-YYYY');

    try {
        // * check if today's sheet exists; create id not
        const isSheetExists = await EnquiryService.sheetExists(currentDate);
        if (!isSheetExists) {
            await EnquiryService.createSheet(currentDate);
        }

        // * append enquiry data to current date sheet
        await EnquiryService.appendEnquiryData(currentDate, { name, email, category, message });
        // send response
        res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'Enquiry submitted successfully.',
        });
    } catch (error) {
        console.error('Error submitting enquiry:', error.response?.data?.error || error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Failed to submit enquiry. Please try again later.',
        });
    }
};
