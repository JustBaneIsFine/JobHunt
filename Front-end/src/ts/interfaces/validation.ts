export interface validationErrorObject {
  usernameError: string;
  emailError: string;
  passwordError: string;
}

export interface jobInputErrorInterface {
  nameError: string | false;
  posterError: string | false;
  descriptionError: string | false;
  priceError: string | false;
  requiredWorkersError: string | false;
  jobTagsError: { mainTagError: string | false; otherTagsError: string | false };
  locationError: string | false;
  companyNameError: string | false;
  jobDueDateError: string | false;
}
