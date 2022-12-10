import { jobInputErrorWithResult } from '../../ts/interfaces/validation';
import { jobInputValues } from '../interfaces/jobInterface';
import { lengthIsGood, containsLetters, hasLeadingZeros } from '../validation/generalFunctions';

export function checkInputs(
  data: jobInputValues,
  locations: string[] | string,
  jobTags: string[] | string,
): true | jobInputErrorWithResult {
  //maybe try reduce method
  const errors = {} as jobInputErrorWithResult;
  checkAndReturn(errors, data, 'jobName', 'This field is required', checkJobName);
  checkAndReturn(errors, data, 'jobDescription', 'This field is required', checkDescription);
  checkAndReturn(errors, data, 'jobPrice', 'This field is required', checkPrice);
  checkAndReturn(
    errors,
    data,
    'companyName',
    'This field is required',
    checkCompanyName,
    undefined,
    true,
  );
  checkAndReturn(errors, data, 'requiredWorkers', 'This field is required', checkRequiredWorkers);
  checkAndReturn(errors, data, 'jobTagsMain', 'This field is required', checkJobTag, jobTags);
  checkAndReturn(
    errors,
    data,
    'jobTagsOther',
    'This field is required',
    checkJobTag,
    jobTags,
    true,
  );
  checkAndReturn(errors, data, 'location', 'This field is required', checkLocation, locations);
  checkAndReturn(errors, data, 'jobDueDate', 'This field is required', checkJobDueDate);

  // errors.jobName =
  //   data.jobName === undefined ? 'This is a required field' : checkJobName(data.jobName);

  if (errors.result != true) {
    return errors;
  }
  return true;
}

function checkJobName(data: string) {
  const result = lengthIsGood(5, 50, data);

  if (result === true) {
    return result;
  }

  return result === 'min' ? 'Job name is too short' : 'Job name is too long';
  //add additional checks?
}
function checkDescription(data: string) {
  const result = lengthIsGood(5, 2000, data);
  if (result === true) {
    return result;
  }
  return result === 'min' ? 'Description is too short' : 'Description is too long';
  //add additional checks?
}

function checkPrice(data: string): string | true {
  const dataLength = lengthIsGood(1, 6, data);
  // no letters/symbols and length is good
  if (containsLetters(data)) {
    return 'There should be no letters in the price';
  }

  if (dataLength != true) {
    return dataLength === 'min' ? 'Your price is too low' : 'Your price is too high';
  }

  // check for leading zeros

  if (hasLeadingZeros(data)) {
    return 'No leading zeros allowed';
  }

  return true;
}

function checkRequiredWorkers(data: string): string | true {
  const dataLength = lengthIsGood(1, 6, data);

  if (containsLetters(data)) {
    return 'Must not contain letters/symbols';
  }

  if (dataLength != true) {
    dataLength === 'min' ? 'Not enough workers selected' : 'Too many workers selected';
    return dataLength;
  }

  if (hasLeadingZeros(data)) {
    return 'No leading zeros allowed';
  }
  return true;
  //add additional checks?
}
function checkJobTag(data: string, arrayOfTags: string[]) {
  if (!arrayOfTags.includes(data)) {
    return `${data} tag doesn't exist`;
  }
  return true;
  //add additional checks?
}
function checkLocation(data: string, locations: string[]) {
  if (!locations.includes(data)) {
    return `${data}: location doesn't exist`;
  }
  return true;
  //add additional checks?
}
function checkCompanyName(data: string) {
  const length = lengthIsGood(4, 50, data);

  if (length != true) {
    return length === 'min' ? 'Company name is too short' : 'Name is too long';
  }
  return true;
  //add additional checks?
}
function checkJobDueDate(data: string) {
  const matchDateSimple = data.match(/(\d{2}\.\d{2}\.\d{4})/g);

  if (matchDateSimple === null) {
    return 'Invalid format';
  }
  return true;
  //if data date is less than current date, return, date is unavailable
  //add additional checks?
}

function checkAndReturn(
  errorObj: jobInputErrorWithResult,
  data: jobInputValues,
  dataKey: string,
  text: string,
  func,
  someArray?,
  notRequired?: boolean,
) {
  if (notRequired) {
    errorObj[dataKey] =
      data[dataKey] === undefined || data[dataKey] === ''
        ? undefined
        : func(data[dataKey], someArray);
    errorObj.result = false;
  } else {
    errorObj[dataKey] =
      data[dataKey] === undefined || data[dataKey] === '' ? text : func(data[dataKey], someArray);
    errorObj.result = false;
  }
}
// helper functions
