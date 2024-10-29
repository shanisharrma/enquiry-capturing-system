import { Router } from 'express';
import v1Routes from './v1/index.js';

const router = new Router();

router.use('/v1', v1Routes);

export default router;
