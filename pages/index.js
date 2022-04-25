import { useState } from "react";
import TextInput from "../components/inputs/TextInput";
import Contact from "./Contact";

import React from 'react';
import { Formik, Field, Form, ErrorMessage, FormikConfig, FormikValues, useFormikContext  } from 'formik';
import * as Yup from 'yup';

import styles from "../styles/styles.module.css";

import { Amplify } from 'aws-amplify';
import awsExports from '../src/aws-exports';

Amplify.configure({...awsExports, ssr: true});


const Complaints = () => {
  

  return (
        <Formik initialValues={{ email: '', contactName: ''}}
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
              <Contact formikProp={formik}/>

              <button type="submit">Submit</button>
            </form>
          )}
        </Formik>
  );
} ;

export default Complaints;
