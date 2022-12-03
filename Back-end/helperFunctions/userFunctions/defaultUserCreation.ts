import { userObject } from '../../interfaces/userInterface';
import date from 'date-and-time';

export function createDefaultUserObject(
    username: string,
    email: string,
    hash: string
): userObject {
    const now = new Date();
    const newDate = date.format(now, 'YYYY/MM/DD HH:mm:ss');

    const user = {} as userObject;

    // setting default values
    user.level = 0;
    user.positiveReviews = { number: 0, reviews: [{}] };
    user.negativeReviews = { number: 0, reviews: [{}] };
    user.accCreationDate = newDate;
    user.jobsCreated = { number: 0, jobs: [] };
    user.jobsWorked = { number: 0, jobs: [] };
    user.image = '';
    user.tags = [];
    user.age = 0;
    user.showOnJobBoard = false;
    user.firstName = '';
    user.lastName = '';

    //setting user values
    user.username = username;
    user.email = email;
    user.hash = hash;

    return user;
}
