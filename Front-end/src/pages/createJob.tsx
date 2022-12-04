import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { checkInputs } from '../ts/validation/jobCreationValidation';
const CreateJob = (props: { state }) => {
  return (
    <div>
      <h2>Job creation board</h2>

      <div id='main'>
        <div>
          <label htmlFor='jobName'>Job Name</label>
          <input id='jobName' type='text' required />
        </div>
        <div>
          <label htmlFor='companyName'>Company Name</label>
          <input id='companyName' type='text' />
        </div>
        <div>
          <label htmlFor='jobPrice'>Job Price</label>
          <input id='jobPrice' type='text' required />
          <select>
            <option>rsd</option>
            <option>eur</option>
            <option>contact</option>
            <option>To be arranged</option>
          </select>
        </div>
        <div>
          <label htmlFor='mainJobTag'>Main job category</label>
          <div>
            <label>Selected category:{}</label>
          </div>

          <input id='mainJobTag' type='text' list='mainJobTagList' required />
          <datalist id='mainJobTagList'>
            <option>test1</option>
            <option>test2</option>
          </datalist>
        </div>
        <div>
          <label htmlFor='secJobTags'>Secondary job categories</label>
          <div>
            <label>Selected categories:{}</label>
          </div>
          <input id='secJobTags' type='text' list='secJobTagsList' />
          <datalist id='secJobTagsList'>
            <option>test3</option>
            <option>test0</option>
          </datalist>
        </div>
        <div>
          <label htmlFor='jobDescription'>Job description</label>
          <textarea id='jobDescription' name='message' rows={10} cols={30} required />
        </div>

        <div>
          <label htmlFor='reqWorkers'>Required workers</label>
          <input id='reqWorkers' type='range' min={1} max={50} defaultValue={1} />
          <label></label>
          {/* range value in the label above */}
        </div>
        <div>
          <label htmlFor='location'>Location:</label>
          <div>
            <label>Selected locations:{}</label>
          </div>
          <input id='locationTags' type='text' list='locationTagsList' />
          <datalist id='locationTagsList'>
            <option>test3</option>
            <option>test0</option>
          </datalist>
        </div>
        <div>
          <label htmlFor='jobDueDate'>Job due date</label>
          <input id='jobDueDate' type='text' />
        </div>
        <button onClick={submitData}>Publish the job</button>
      </div>
    </div>
  );

  async function submitData() {
    //submit data, send to backend
    const checkedInput = checkInputs();
    if (checkedInput === true) {
      //send to back-end
    } else {
      //checkedInput.errors;
    }
  }
};

export default CreateJob;
