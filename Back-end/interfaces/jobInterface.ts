export interface jobInterface {
    jobName: string;
    jobPoster: string;
    companyName: string | undefined;
    status: 'finished' | 'reserved' | 'open';
    jobDescription: string;
    jobPrice: string;
    jobDueDate: string | undefined;
    requiredWorkers: string;
    appliedWorkers: { number: number; workers: string[] };
    consideredWorkers: { number: number; workers: string[] };
    acceptedWorkers: { number: number; workers: string[] };
    jobTags: { mainTag: string; otherTags: string[] };
    creationDate: string;
    finishDate: string;
    location: string;
    priority: number;
}
export interface jobInputValues {
    jobName: string;
    jobPoster: string;
    jobDescription: string;
    jobPrice: string;
    requiredWorkers: string;
    jobTags: { mainTag: string; otherTags?: string[] };
    location: string | string[];
    companyName?: string | undefined;
    jobDueDate?: string | undefined;
}
