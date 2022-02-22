import express, { Request, Response, Handler } from 'express';
import * as lecturerModel from '../model/lecturer';
import { Lecturer } from '../types/lecturer';

const lecturerRouter = express.Router();

/**
 * @swagger
 * /lecturers:
 *   get:
 *     summary: Get a list of lecturers and the courses they teach
 *     responses:
 *       200:
 *         description: A list of lecturers.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: Lecturer's name.
 *                 courses:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         description: Course name
 *                       description:
 *                         type: string
 *                         description: Course description
 *                       phase:
 *                         type: number
 *                         description: The phase within the education path
 */
lecturerRouter.get('/', (req: Request, res: Response) => {
    lecturerModel.getLecturers((err: Error, lecturers: Array<Lecturer>) => {
        if (err) {
            return res.status(500).json({ errorMessage: err.message });
        }

        res.status(200).json(lecturers);
    });
});

export { lecturerRouter };
