export interface jobInputValues {
  jobName: string;
  jobDescription: string;
  jobPrice: string;
  requiredWorkers: string;
  jobTags: { mainTag: string; otherTags?: string[] };
  location: string | string[];
  companyName?: string | undefined;
  jobDueDate?: string | undefined;
}
