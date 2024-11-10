import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import { getRouter } from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../swagger';

const app = express();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:8080', credentials: true, preflightContinue: true   }));

app.use(getRouter());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
