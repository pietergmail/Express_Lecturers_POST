import { Lecturer, Course } from '../types';
import { database } from '../database';
import { OkPacket, RowDataPacket } from 'mysql2';

const getLecturers = (callback: Function) => {
    const query = `SELECT l.name AS lecturer_name, c.name AS course_name, c.description AS course_description, c.phase AS course_phase
  FROM lecturer AS l, course AS c, lecturer_course AS lc
  WHERE l.id = lc.lecturer_id
  AND c.id = lc.course_id`;

    database.query(query, (err, result) => {
        if (err) {
            callback(err);
        }
        const rows = <RowDataPacket[]>result;

        const lecturers = rows.reduce((mem, cur) => {
            const course = {
                name: cur.course_name,
                description: cur.course_description,
                phase: cur.course_phase,
            };
            const lecturer = mem.find((el) => el.name === cur.lecturer_name);

            if (!lecturer) {
                mem.push({
                    name: cur.lecturer_name,
                    courses: [course],
                });
            } else {
                lecturer.courses.push(course);
            }

            return mem;
        }, []);

        callback(null, lecturers);
    });
};

export { getLecturers };
