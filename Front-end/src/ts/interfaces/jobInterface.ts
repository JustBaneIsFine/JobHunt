export interface jobInputValues {
  jobName: string | undefined;
  jobDescription: string | undefined;
  jobPrice: string | undefined;
  requiredWorkers: string | undefined;
  jobTagsMain: string | undefined;
  jobTagsOther?: string | undefined;
  location: string | string[] | undefined;
  companyName?: string | undefined;
  jobDueDate?: string | undefined;
}
