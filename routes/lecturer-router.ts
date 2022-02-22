/**
 * @swagger
 *   components:
 *    schemas:
 *      Lecturer:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *            name:
 *              type: string
 *              description: Lecturer's name.
 *            courses:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: number
 *                  name:
 *                    type: string
 *                    description: Course name
 *                  description:
 *                    type: string
 *                    description: Course description
 *                  phase:
 *                    type: number
 *                    description: The phase within the education path
 */
import express, { Request, Response, Handler } from 'express';
import * as lecturerModel from '../model/lecturer';
import { Lecturer } from '../types';

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
 *               $ref: '#/components/schemas/Lecturer'
 */
lecturerRouter.get('/', (req: Request, res: Response) => {
    lecturerModel.getLecturers((err: Error, lecturers: Array<Lecturer>) => {
        if (err) {
            return res.status(500).json({ status: 'error', errorMessage: err.message });
        }

        res.status(200).json(lecturers);
    });
});

/**
 * @swagger
 * /lecturers/add:
 *   post:
 *      summary: Add a lecturer
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Lecturer'
 *      responses:
 *         "200":
 *            description: The ID of the new Lecturer
 *            content:
 *              application/json:
 *                schema:
 *                  type: number
 *                  description: Database ID
 */
lecturerRouter.post('/add', (req: Request, res: Response) => {
    const lecturer = <Lecturer>req.body;
    lecturerModel.addLecturer(lecturer, (err: Error, lecturerId: number) => {
        if (err) {
            return res.status(500).json({ status: 'error', errorMessage: err.message });
        }

        res.status(200).json({ status: 'success', lecturerId });
    });
});

export { lecturerRouter };