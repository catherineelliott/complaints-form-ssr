import { Field, ErrorMessage } from "formik";

function ContactYesNo(props) {
    
    return (
      <div>
        <h1>Please indicate if you wish to provide your contact details</h1>
        <div id="contactYesNo-radio-group"></div>
        <div role="group" aria-labelledby="contactYesNo-radio-group">
          <label>
            <Field type="radio" name="contactYesNo" value="Yes" />
            Yes
          </label>
          <label>
            <Field type="radio" name="contactYesNo" value="No" />
            No
          </label>
          <ErrorMessage name="contactYesNo" />
        </div>
      </div>
    );
  }

export default ContactYesNo