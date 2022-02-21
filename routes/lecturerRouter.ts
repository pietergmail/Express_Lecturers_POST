import express, { Request, Response, Handler } from 'express';
import * as lecturerModel from '../model/lecturer';
import { Lecturer } from '../types/lecturer';

const lecturerRouter = express.Router();

lecturerRouter.get('/', (req: Request, res: Response) => {
    lecturerModel.getLecturers((err: Error, lecturers: Array<Lecturer>) => {
        if (err) {
            return res.status(500).json({ errorMessage: err.message });
        }

        res.status(200).json(lecturers);
    });
});

export { lecturerRouter };
