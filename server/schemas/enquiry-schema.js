import { z } from 'zod';

export const enquirySchema = z.object({
    name: z
        .string()
        .min(2, 'Name must be at least 2 characters long')
        .max(32, 'Name must be at most 32 characters long'),
    email: z.string().email('Please enter a valid email address'),
    category: z.enum(
        ['Complaint', 'Service Request', 'Feedback'],
        'Please select a valid category',
    ),
    message: z
        .string()
        .min(3, 'Message must be at least 3 characters long')
        .max(200, 'Message can be at most 200 characters long'),
});
