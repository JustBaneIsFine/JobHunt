import { userInterface } from '../../interfaces/userInterface';
import date from 'date-and-time';
import { jobInterface, jobInputValues } from '../../interfaces/jobInterface';

export function createDefaultJobObject(values: jobInputValues): jobInterface {
    const now = new Date();
    const newDate = date.format(now, 'YYYY/MM/DD HH:mm:ss');

    const job = {} as jobInterface;

    // setting default values
    job.status = 'otvoren';
    job.appliedWorkers = { number: 0, workers: [] };
    job.consideredWorkers = { number: 0, workers: [] };
    job.acceptedWorkers = { number: 0, workers: [] };
    job.creationDate = newDate;
    job.priority = 1;

    //setting user values
    job.jobName = values.jobName;
    job.jobPoster = '';
    job.jobDescription = '';
    job.jobPrice = '';
    job.requiredWorkers = '';
    job.jobTags = { mainTag: '', otherTags: [] };
    job.location = '';
    job.jobDueDate = values.jobDueDate;
    job.companyName = values.companyName;

    //
    return job;
}
