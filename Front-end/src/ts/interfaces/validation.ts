export interface validationErrorObject {
  usernameError: string;
  emailError: string;
  passwordError: string;
}

export interface jobInputErrorInterface {
  jobName: string | true;
  jobDescription: string | true;
  jobPrice: string | true;
  requiredWorkers: string | true;
  jobTagsMain: string | true;
  jobTagsOther?: string | true;
  location: string | true;
  companyName?: string | true;
  jobDueDate: string | true;
}

export interface jobInputErrorWithResult extends jobInputErrorInterface {
  result: boolean;
}
