import { jobInputErrorInterface } from '../../ts/interfaces/validation';
import { checkLength } from '../validation/generalFunctions';
export function checkInputs(): true | jobInputErrorInterface {
  return true;
}

// jobName: string;
// jobPoster: string;
// jobDescription: string;
// jobPrice: string;
// requiredWorkers: string;
// jobTags: { mainTag: string; otherTags?: string[] };
// location: string | string[];
// companyName?: string | undefined;
// jobDueDate?: string | undefined;

function checkJobName(data: string) {
  return checkLength(5, 50, data);
  //add additional checks?
}
function checkDescription(data: string) {
  return checkLength(5, 2000, data);
  //add additional checks?
}

function checkPrice(data: string): { priceError: string } | true {
  const containsLetters = data.match(/\D+/g);
  const dataLength = checkLength(1, 6, data);
  const error = { priceError: '' };

  // no letters/symbols and length is good
  if (containsLetters != null) {
    error.priceError = 'There should be no letters in the price';
    return error;
  }

  if (dataLength != true) {
    error.priceError = dataLength === 'min' ? 'Your price is too low' : 'Your price is too high';
    return error;
  }

  // check for leading zeros
  const parsed = parseInt(data);
  if (parsed.toString().length != data.length) {
    error.priceError = 'No leading zeros allowed';
    return error;
  }
  return true;
}

// function checkPrice(data: string): { priceError: string } | true {
//   const containsLetters = data.match(/\D+/g);
//   const dataLength = checkLength(1, 6, data);
//   const error = { priceError: '' };

//   // no letters/symbols and length is good----most likely case
//   if (containsLetters === null && dataLength === true) {
//     // check for leading zeros
//     const parsed = parseInt(data);

//     if (parsed.toString().length != data.length) {
//       error.priceError = 'No leading zeros allowed';
//       return error;
//     }

//     return true;
//   } else {
//     if (containsLetters != null) {
//       error.priceError = 'There should be no letters in the price';
//       return error;
//     } else {
//       error.priceError = dataLength === 'min' ? 'Your price is too low' : 'Your price is too high';
//       return error;
//     }
//   }
// }

function checkRequiredWorkers(data: string): { reqWorkerError: string } | true {
  const containsLetters = data.match(/\D+/g);
  const dataLength = checkLength(1, 6, data);
  const error = { reqWorkerError: '' };

  if (containsLetters != null) {
    error.reqWorkerError = 'Must not contain letters/symbols';
    return error;
  }

  if (dataLength != true) {
    error.reqWorkerError =
      dataLength === 'min' ? 'Not enough workers selected' : 'Too many workers selected';
    return error;
  }

  const parsed = parseInt(data);
  if (parsed.toString().length != data.length) {
    error.reqWorkerError = 'No leading zeros allowed';
    return error;
  }
  return true;

  //add additional checks?
}
function checkJobTag(data: string, arrayOfTags: string[]) {
  const error = { tag: '', errorText: '' };

  if (!arrayOfTags.includes(data)) {
    error.tag = data;
    error.errorText = `${data} tag doesn't exist`;
    return error;
  }
  return true;
  //add additional checks?
}
function checkLocation(data: string, locations: string[]) {
  const error = { location: '', errorText: '' };
  if (!locations.includes(data)) {
    error.location = data;
    error.errorText = `${data}: location doesn't exist`;
    return error;
  }
  return true;
  //add additional checks?
}
function checkCompanyName(data: string) {
  //add additional checks?
}
function checkJobDueDate(data: string) {
  //add additional checks?
}
