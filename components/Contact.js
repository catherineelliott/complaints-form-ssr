import React from 'react';
import CheckboxInput from "./inputs/CheckboxInput"; 
import TextInput from "./inputs/TextInput"; 
import { useFormikContext, ErrorMessage } from 'formik';

export default function Contact(props) {
  const formikContext = useFormikContext();

  return (
    <div>
      <h1>Contact details</h1>
      <TextInput label="Contact name" name="contactName" type="text" placeholder=""/>
      <h2>How would you like to be contacted?</h2>
      <p>Please choose at least one option</p>
      <CheckboxInput name="contactByEmail">
            Email
      </CheckboxInput>
      {formikContext.values.contactByEmail ? 
      <TextInput label="Contact email" name="email" type="email" placeholder=""/> : null }
      <CheckboxInput name="contactByTelephone">
            Telephone
      </CheckboxInput>
      {formikContext.values.contactByTelephone ? 
      <TextInput label="Contact telephone" name="telephone" type="tel" placeholder=""/> : null }
    </div>
  )
}