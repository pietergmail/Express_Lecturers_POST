import { RowDataPacket } from 'mysql2';
import { Course } from '../types';
import { connectionPool } from '../database';

const getCourses = async (onResult: (error: Error, courses: Course[]) => void) => {
    const query = `SELECT c.id AS course_id, c.name AS course_name, c.description AS course_description, c.phase AS course_phase
  FROM course AS c`;

    try {
        const [rows] = await connectionPool.query(query);
        const courses = (<RowDataPacket[]>rows).map(
            ({ course_id, course_name, course_description, course_phase }) => ({
                id: course_id,
                name: course_name,
                description: course_description,
                phase: course_phase,
            })
        );

        onResult(null, courses);
    } catch (error) {
        onResult(error, null);
    }
};

export { getCourses };
