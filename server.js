import express from 'express';
import { ServerConfig } from './config/index.js';
import cors from 'cors';
import apiRoutes from './routes/index.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', apiRoutes);

app.listen(ServerConfig.port, () => console.info(`Server started at port ${ServerConfig.port}`));
