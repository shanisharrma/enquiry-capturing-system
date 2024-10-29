import { Router } from 'express';
import { validateRequest } from '../../middlewares/index.js';
import schemas from '../../schemas/index.js';
import { enquiryController } from '../../controllers/index.js';

const router = new Router();

router.post('/enquiry', validateRequest(schemas.enquirySchema), enquiryController);

export default router;
