import React from 'react';
import { Formik, Field, Form, ErrorMessage, FormikConfig, FormikValues, useFormikContext  } from 'formik';
 import { useField  } from 'formik';
import TextInput from "./inputs/TextInput"; 

export default function Contact() {
    return (
    <div>
         <h1>Contact details</h1>
          
            {/*  <div>{props.formikProp.values.contactName}</div>*/}
              <TextInput label="Contact name" name="contactName" type="text" placeholder=""/>
              <TextInput label="Contact email" name="email" type="email" placeholder=""/>
    </div>
    )
  }