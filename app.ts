import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { lecturerRouter } from './routes/lecturer-router';
import { courseRouter } from './routes/course-router';

const app = express();
dotenv.config();

const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API for Lecturers app',
            version: '1.0.0',
        },
    },
    apis: ['./routes/*.ts'],
};
const swaggerSpec = swaggerJSDoc(swaggerOpts);

app.use(cors());
app.use(bodyParser.json());
app.use('/lecturers', lecturerRouter);
app.use('/courses', courseRouter);

app.get('/status', (req, res) => {
    res.json({ message: 'Backend is running...' });
});

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(process.env.APP_PORT, () => {
    console.log(`Server is running on port ${process.env.APP_PORT}.`);
});
