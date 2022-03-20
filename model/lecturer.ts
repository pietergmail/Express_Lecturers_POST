import { OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import mapToLecturers from './lecturer-mapper';
import { Lecturer } from '../types';
import { connectionPool } from '../database';

const getLecturers = async (onResult: (error: Error, lecturers: Lecturer[]) => void) => {
    const query = `SELECT l.id AS lecturer_id, l.name AS lecturer_name, c.id AS course_id, c.name AS course_name, c.description AS course_description, c.phase AS course_phase
  FROM lecturer AS l, course AS c, lecturer_course AS lc
  WHERE l.id = lc.lecturer_id
  AND c.id = lc.course_id`;

    /**
     * You can avoid a try/catch block by wrapping the logic into an IIFE (immediately invoked function expression):
     *  (async () => {
     *      const rows = await connectionPool.query(query);
     *      onResult(null, mapToLecturers(rows));
     *  })().catch((err) => onResult(err));
     */
    try {
        const [rows] = await connectionPool.query(query);
        onResult(null, mapToLecturers(<RowDataPacket[]>rows));
    } catch (error) {
        onResult(error, null);
    }
};

const getLecturer = async (
    lecturerId: number,
    onResult: (error: Error, lecturer: Lecturer) => void
) => {
    const query = `SELECT l.id AS lecturer_id, l.name AS lecturer_name, c.id AS course_id, c.name AS course_name, c.description AS course_description, c.phase AS course_phase
  FROM lecturer AS l, course AS c, lecturer_course AS lc
  WHERE l.id = ?
  AND l.id = lc.lecturer_id
  AND c.id = lc.course_id`;

    try {
        const [row] = await connectionPool.execute(query, [lecturerId]);
        onResult(null, mapToLecturers(<RowDataPacket[]>row)[0]);
    } catch (error) {
        onResult(error, null);
    }
};

const addLecturer = async (
    lecturer: Lecturer,
    onResult: (error: Error, addedLecturerId: number) => void
) => {
    const lecturerInsert = 'INSERT INTO lecturer (name) VALUES (?)';
    const lecturerCourseInsert =
        'INSERT INTO lecturer_course (lecturer_id, course_id) VALUES (?, ?)';

    const connection = await connectionPool.getConnection();

    // Multiple queries are involved, so we execute them in a transaction to assure they will only get commited
    // when all queries were succesful. Otherwise, all queries need to be rolled back.
    await connection.beginTransaction();

    try {
        const [result] = await connection.execute(lecturerInsert, [lecturer.name]);
        const addedLecturerId = (<ResultSetHeader>result).insertId;

        // we can't use forEach, since it expects a synchronous function and doesn't wait for promises
        for (const course of lecturer.courses) {
            await connection.execute(lecturerCourseInsert, [addedLecturerId, course.id]);
        }

        await connection.commit();
        onResult(null, addedLecturerId);
    } catch (error) {
        await connection.rollback();
        onResult(error, null);
    } finally {
        await connection.release();
    }
};

const deleteLecturer = async (lecturerId: number, onResult: (error: Error) => void) => {
    const lecturerDelete = 'DELETE FROM lecturer WHERE ID = ?';
    const lecturerCourseDelete = 'DELETE FROM lecturer_course WHERE lecturer_id = ?';

    const connection = await connectionPool.getConnection();

    await connection.beginTransaction();

    try {
        await connection.execute(lecturerCourseDelete, [lecturerId]);
        await connection.execute(lecturerDelete, [lecturerId]);

        await connection.commit();
        onResult(null);
    } catch (error) {
        await connection.rollback();
        onResult(error);
    } finally {
        await connection.release();
    }
};

export { getLecturers, getLecturer, addLecturer, deleteLecturer };
