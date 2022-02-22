export interface Lecturer {
    id: number;
    name: string;
    courses: Array<Course> | null;
}

export interface Course {
    id: number;
    name: string;
    description: string;
    phase: number;
}
