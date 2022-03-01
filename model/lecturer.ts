import { OkPacket } from 'mysql2';
import mapToLecturers from './lecturer-mapper';
import { Lecturer } from '../types';
import { query } from '../database';

const getLecturers = (callback: Function) => {
    const queryStatement = `SELECT l.id AS lecturer_id, l.name AS lecturer_name, c.id AS course_id, c.name AS course_name, c.description AS course_description, c.phase AS course_phase
  FROM lecturer AS l, course AS c, lecturer_course AS lc
  WHERE l.id = lc.lecturer_id
  AND c.id = lc.course_id`;

    (async () => {
        const rows = await query(queryStatement);
        callback(null, mapToLecturers(rows));
    })().catch((err) => callback(err));
};

const addLecturer = (lecturer: Lecturer, callback: Function) => {
    const lecturerInsert = 'INSERT INTO lecturer (name) VALUES (?)';
    const lecturerCourseInsert =
        'INSERT INTO lecturer_course (lecturer_id, course_id) VALUES (?, ?)';

    (async () => {
        const result = await query(lecturerInsert, [lecturer.name]);
        const addedLecturerId = (<OkPacket>result).insertId;

        lecturer.courses.forEach(
            async (course) => await query(lecturerCourseInsert, [addedLecturerId, course.id])
        );

        callback(null, addedLecturerId);
    })().catch((err) => callback(err));
};

export { getLecturers, addLecturer };
