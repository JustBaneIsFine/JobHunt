interface jobs {
    name: string;
    jobPoster: { name: string; userRef: string };
    jobStatus: 'otvoren' | 'rezervisan' | 'zavrsen' | 'zatvoren';
    jobDescription: string;
    jobPrice: string;
    jobDueDate: string;
    requiredWorkers: string;
    workersApplied: { number: string; workers: Array<object> };
    mainTag: string; //This is the main category..If user doesn't provide it, then the tags will take over
    tags: Array<string>;
    dateCreated: string;
    finishDate: string;
    location: string;
}
