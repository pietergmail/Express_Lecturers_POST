export interface Lecturer {
    name: string;
    courses: Array<Course> | null;
}

export interface Course {
    name: string;
    description: string;
    phase: number;
}
