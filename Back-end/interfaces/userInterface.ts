export interface userInterface {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    level: number;
    positiveReviews: { number: number; reviews: Array<object> };
    negativeReviews: { number: number; reviews: Array<object> };
    accCreationDate: string;
    jobsCreated: { number: number; jobs: Array<object> };
    jobsWorked: { number: number; jobs: Array<object> };
    image: string;
    tags: Array<string>;
    age: number;
    hash: string;
    showOnJobBoard: boolean;
}
