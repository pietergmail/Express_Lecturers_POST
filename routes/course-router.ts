/**
 * @swagger
 *   components:
 *    schemas:
 *      Course:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *            name:
 *              type: string
 *              description: Course name.
 *            description:
 *              type: string
 *              description: Course description.
 *            phase:
 *              type: string
 *              description: Course phase.
 */
import express, { Request, Response, Handler } from 'express';
import * as courseModel from '../model/course';
import { Course } from '../types';

const courseRouter = express.Router();

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Get a list of all courses
 *     responses:
 *       200:
 *         description: A list of courses.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 */
courseRouter.get('/', (req: Request, res: Response) => {
    courseModel.getCourses((err: Error, courses: Course[]) => {
        if (err) {
            res.status(500).json({ status: 'error', errorMessage: err.message });
        } else {
            res.status(200).json(courses);
        }
    });
});

export { courseRouter };
