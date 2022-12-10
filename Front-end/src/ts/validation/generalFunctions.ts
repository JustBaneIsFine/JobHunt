import { jobInputErrorWithResult } from '../interfaces/validation';

interface test {
  jobName: React.RefObject<HTMLInputElement>;
  jobDescription: React.RefObject<HTMLTextAreaElement>;
  jobDueDate: React.RefObject<HTMLInputElement>;
  jobPrice: React.RefObject<HTMLInputElement>;
  jobTagsMain: React.RefObject<HTMLInputElement>;
  location: React.RefObject<HTMLInputElement>;
  requiredWorkers: React.RefObject<HTMLInputElement>;
}

export function lengthIsGood(min: number, max: number, data: string): 'min' | 'max' | true {
  if (data.length < min) {
    return 'min';
  }
  if (data.length > max) {
    return 'max';
  }
  return true;
}

export function hasLeadingZeros(data): boolean {
  const parsed = parseInt(data);
  if (parsed.toString().length != data.length) {
    return true;
  }
  return false;
}

export function containsLetters(data): boolean {
  const result = data.match(/\D+/g);
  return result === null ? false : true;
}

export function isItUndefined(obj: test): jobInputErrorWithResult {
  //
  const errorAcc = {} as jobInputErrorWithResult;
  Object.keys(obj).forEach((key) => {
    if (obj[key].current?.value === undefined) {
      errorAcc[key] = false;
      errorAcc.result = false;
    } else {
      errorAcc[key] = obj[key].current.value;
    }
  });

  return errorAcc;
}
