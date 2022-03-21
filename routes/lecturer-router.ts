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
 *      LecturerInput:
 *          type: object
 *          properties:
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
    lecturerModel.getLecturers((err: Error, lecturers: Lecturer[]) => {
        if (err) {
            res.status(500).json({ status: 'error', errorMessage: err.message });
        } else {
            res.status(200).json(lecturers);
        }
    });
});

/**
 * @swagger
 * /lecturers/{id}:
 *   get:
 *      summary: Get a lecturer by ID
 *      responses:
 *         200:
 *           description: A lecturer
 *           content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Lecturer'
 *      parameters:
 *        - name: id
 *          in: path
 *          description: Lecturer ID
 *          required: true
 *          schema:
 *            type: integer
 *            format: int64
 */
lecturerRouter.get('/:id', (req: Request, res: Response) => {
    const lecturerId = parseInt(req.params.id);
    lecturerModel.getLecturer(lecturerId, (error: Error, lecturer: Lecturer) => {
        if (error) {
            res.status(500).json({ status: 'error', errorMessage: error.message });
        } else {
            res.status(200).json(lecturer);
        }
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
 *              $ref: '#/components/schemas/LecturerInput'
 *      responses:
 *         200:
 *            description: The ID of the new Lecturer
 *            content:
 *              application/json:
 *                schema:
 *                  type: number
 *                  description: Database ID
 */
lecturerRouter.post('/add', (req: Request, res: Response) => {
    const lecturer = <Lecturer>req.body;
    lecturerModel.addLecturer(lecturer, (error: Error, lecturerId: number) => {
        if (error) {
            res.status(500).json({ status: 'error', errorMessage: error.message });
        } else {
            res.status(200).json({ status: 'success', lecturerId });
        }
    });
});

/**
 * @swagger
 * /lecturers/delete/{id}:
 *   delete:
 *      summary: Delete a lecturer by ID
 *      responses:
 *         200:
 *            description: Delete succesful
 *      parameters:
 *        - name: id
 *          in: path
 *          description: Lecturer ID
 *          required: true
 *          schema:
 *            type: integer
 *            format: int64
 */
lecturerRouter.delete('/delete/:id', (req: Request, res: Response) => {
    const lecturerId = parseInt(req.params.id);
    lecturerModel.deleteLecturer(lecturerId, (error: Error) => {
        if (error) {
            res.status(500).json({ status: 'error', errorMessage: error.message });
        } else {
            res.status(200).json({ status: 'success' });
        }
    });
});

export { lecturerRouter };
