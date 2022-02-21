create table course
(
    name        varchar(100) not null,
    id          int auto_increment
        primary key,
    description varchar(255) null,
    phase       int          not null,
    constraint course_id_uindex
        unique (id)
);

INSERT INTO lecturers.course (name, id, description, phase) VALUES ('Web development 4', 1, 'Web development with Express and React', 2);
INSERT INTO lecturers.course (name, id, description, phase) VALUES ('Web development 1', 2, 'Valid HTML & CSS', 1);
INSERT INTO lecturers.course (name, id, description, phase) VALUES ('Algoritmisch denken', 3, 'Learn to write algorithms', 1);
INSERT INTO lecturers.course (name, id, description, phase) VALUES ('Web development 2', 5, 'Servlets & JSP', 1);
INSERT INTO lecturers.course (name, id, description, phase) VALUES ('Web development 3', 6, 'Client-server, JS, security, deployment', 2);

create table lecturer
(
    id   int auto_increment
        primary key,
    name varchar(100) not null,
    constraint lecturer_id_uindex
        unique (id)
);

INSERT INTO lecturers.lecturer (id, name) VALUES (1, 'Elke Steegmans');
INSERT INTO lecturers.lecturer (id, name) VALUES (2, 'Johan Pieck');
INSERT INTO lecturers.lecturer (id, name) VALUES (3, 'Greetje Jongen');
INSERT INTO lecturers.lecturer (id, name) VALUES (4, 'Jan Van Hee');

create table lecturer_course
(
    id          int auto_increment
        primary key,
    lecturer_id int not null,
    course_id   int not null,
    constraint fk_course_id
        foreign key (course_id) references course (id),
    constraint fk_lecturer_id
        foreign key (lecturer_id) references lecturer (id)
);

INSERT INTO lecturers.lecturer_course (id, lecturer_id, course_id) VALUES (1, 1, 1);
INSERT INTO lecturers.lecturer_course (id, lecturer_id, course_id) VALUES (2, 1, 6);
INSERT INTO lecturers.lecturer_course (id, lecturer_id, course_id) VALUES (3, 2, 1);
INSERT INTO lecturers.lecturer_course (id, lecturer_id, course_id) VALUES (4, 2, 2);
INSERT INTO lecturers.lecturer_course (id, lecturer_id, course_id) VALUES (5, 2, 3);
INSERT INTO lecturers.lecturer_course (id, lecturer_id, course_id) VALUES (6, 3, 2);
INSERT INTO lecturers.lecturer_course (id, lecturer_id, course_id) VALUES (7, 3, 5);
INSERT INTO lecturers.lecturer_course (id, lecturer_id, course_id) VALUES (8, 3, 6);
INSERT INTO lecturers.lecturer_course (id, lecturer_id, course_id) VALUES (9, 4, 2);
