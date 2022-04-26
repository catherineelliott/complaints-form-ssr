//Client side
//Built at build time
//Reused on each request
//Cached by a CDN
import { Field, Form, ErrorMessage } from "formik";

function WhatDoYouWantToDo() {
    
    return (
      <div>
        <h1>What do you want to do today?</h1>
        <div id="whatDoYouWantToDo-radio-group">What do you want to do today?</div>
        <div role="group" aria-labelledby="whatDoYouWantToDo-radio-group">
          <label>
            <Field type="radio" name="whatDoYouWantToDo" value="TakeAction" />
            Request the council take action
          </label>
          <label>
            <Field type="radio" name="whatDoYouWantToDo" value="Compliment" />
            Give a compliment
          </label>
          <label>
            <Field type="radio" name="whatDoYouWantToDo" value="Feedback" />
            Provide some feedback
          </label>
          <label>
            <Field type="radio" name="whatDoYouWantToDo" value="Complaint" />
            Make a complaint
          </label>
          <ErrorMessage name="whatDoYouWantToDo" />
        </div>
      </div>
    );
  }

export default WhatDoYouWantToDo