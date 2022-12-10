import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { jobInputErrorInterface, jobInputErrorWithResult } from '../ts/interfaces/validation';
import { jobInputValues } from '../ts/interfaces/jobInterface';
import { checkInputs } from '../ts/validation/jobCreationValidation';
const CreateJob = (props: { locationState: string[] | string; jobTagState: string[] | string }) => {
  const [errorState, setErrorState] = useState<jobInputErrorWithResult>(
    {} as jobInputErrorWithResult,
  );
  const jobNameRef = useRef<HTMLInputElement>(null);
  const jobDescriptionRef = useRef<HTMLTextAreaElement>(null);
  const companyNameRef = useRef<HTMLInputElement>(null);
  const jobDueDateRef = useRef<HTMLInputElement>(null);
  const jobPriceRef = useRef<HTMLInputElement>(null);
  const jobTagsMainRef = useRef<HTMLInputElement>(null);
  const jobTagsOtherRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const requiredWorkersRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <h2>Job creation board</h2>

      <div id='main'>
        <div>
          <input
            ref={jobNameRef}
            id='jobName'
            type='text'
            placeholder={
              errorState.jobName === true || errorState.jobName === undefined
                ? 'Name of your job'
                : errorState.jobName
            }
            required
          />
        </div>
        <div>
          <input
            ref={companyNameRef}
            id='companyName'
            type='text'
            placeholder={
              errorState.companyName === true || errorState.companyName === undefined
                ? 'Name of your company'
                : errorState.companyName
            }
          />
        </div>
        <div>
          <input
            placeholder={
              errorState.jobPrice === true || errorState.jobPrice === undefined
                ? 'Your price'
                : errorState.jobPrice
            }
            ref={jobPriceRef}
            id='jobPrice'
            type='text'
            required
          />
          <select>
            <option>rsd</option>
            <option>eur</option>
            <option>contact</option>
            <option>To be arranged</option>
          </select>
        </div>
        <div>
          <div>
            <label>Selected main category:{}</label>
          </div>

          <input
            placeholder={
              errorState.jobTagsMain === true || errorState.jobTagsMain === undefined
                ? 'Best suiting tag'
                : errorState.jobTagsMain
            }
            ref={jobTagsMainRef}
            id='mainJobTag'
            type='text'
            list='mainJobTagList'
            required
          />
          <datalist id='mainJobTagList'>
            <option>test1</option>
            <option>test2</option>
          </datalist>
        </div>
        <div>
          <div>
            <label>Selected secondary categories:{}</label>
          </div>
          <input
            placeholder={
              errorState.jobTagsOther === true || errorState.jobTagsOther === undefined
                ? 'Secondary tag'
                : errorState.jobTagsOther
            }
            ref={jobTagsOtherRef}
            id='secJobTags'
            type='text'
            list='secJobTagsList'
          />
          <datalist id='secJobTagsList'>
            <option>test3</option>
            <option>test0</option>
          </datalist>
        </div>
        <div>
          <textarea
            placeholder={
              errorState.jobDescription === true || errorState.jobDescription === undefined
                ? 'Describe your job'
                : errorState.jobDescription
            }
            ref={jobDescriptionRef}
            id='jobDescription'
            name='message'
            rows={10}
            cols={30}
            required
          />
        </div>

        <div>
          <input
            placeholder={
              errorState.requiredWorkers === true || errorState.requiredWorkers === undefined
                ? 'Number of workers needed'
                : errorState.requiredWorkers
            }
            ref={requiredWorkersRef}
            id='reqWorkers'
            type='range'
            min={1}
            max={50}
            defaultValue={1}
          />
          <label>{/* range value*/}</label>
        </div>
        <div>
          <input
            placeholder={
              errorState.location === true || errorState.location === undefined
                ? 'Location of job'
                : errorState.location
            }
            ref={locationRef}
            id='locationTags'
            type='text'
            list='locationTagsList'
          />
          <datalist id='locationTagsList'>
            <option>test3</option>
            <option>test0</option>
          </datalist>
        </div>
        <div>
          <input
            placeholder={
              errorState.jobDueDate === true || errorState.jobDueDate === undefined
                ? 'Job due date'
                : errorState.jobDueDate
            }
            ref={jobDueDateRef}
            id='jobDueDate'
            type='text'
          />
        </div>
        <button
          onClick={() => {
            submitData(props.jobTagState, props.locationState);
          }}
        >
          Publish the job
        </button>
      </div>
    </div>
  );

  async function submitData(locationState, jobTagState) {
    //submit data, send to backend

    const dataToCheck = {} as jobInputValues;
    dataToCheck.jobName = jobNameRef.current?.value;
    dataToCheck.jobDescription = jobDescriptionRef.current?.value;
    dataToCheck.companyName = jobNameRef.current?.value;
    dataToCheck.jobDueDate = jobDueDateRef.current?.value;
    dataToCheck.jobPrice = jobPriceRef.current?.value;
    dataToCheck.jobTagsMain = jobTagsMainRef.current?.value;
    dataToCheck.jobTagsOther = jobTagsOtherRef.current?.value;
    dataToCheck.location = locationRef.current?.value;
    dataToCheck.requiredWorkers = requiredWorkersRef.current?.value;

    const checkedValues = checkInputs(dataToCheck, locationState, jobTagState);

    if (checkedValues === true) {
      //send to back-end
    } else {
      //checkedInput.errors;
      setErrorState(checkedValues);
    }
  }
};

export default CreateJob;
