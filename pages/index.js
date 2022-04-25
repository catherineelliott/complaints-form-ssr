import { useState } from "react";
import TextInput from "../components/inputs/TextInput";

import React from 'react';
import { Formik, Field, Form, ErrorMessage, FormikConfig, FormikValues, useFormikContext  } from 'formik';
import * as Yup from 'yup';

import styles from "../styles/styles.module.css";

import { Amplify } from 'aws-amplify';
import awsExports from '../src/aws-exports';

Amplify.configure({...awsExports, ssr: true});


const Complaints = () => {
  

  return (
        <Formik initialValues={{ email: ''}}
        validationSchema={Yup.object({
          contactName: Yup.string()
              .max(15, 'Must be 15 characters or less')
              .required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
          })}
          onSubmit={(values, { setSubmitting }) => {
         setTimeout(() => {
           alert(JSON.stringify(values, null, 2));
           setSubmitting(false);
         }, 400);
       }}
        >
          {formik => (
            <form onSubmit={formik.handleSubmit}>
              <label htmlFor="email">Email Address</label>
              <input id="email" type="email" {...formik.getFieldProps('email')} />
              {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
              ) : null}
    
              <TextInput label="Contact name" name="contactName" type="text" placeholder=""/>
              <button type="submit">Submit</button>
            </form>
          )}
        </Formik>
  );
} ;

export default Complaints;
