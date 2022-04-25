import { useState } from "react";
import { useRouter } from "next/router";
import WhatDoYouWantToDo from './WhatDoYouWantToDo';
import Contact from "./Contact";
import AddressLookup from './addresslookup'
import Summary from './Summary';

import React from 'react';
import { Formik, Field, Form, ErrorMessage, FormikConfig, FormikValues, useFormikContext  } from 'formik';
import * as Yup from 'yup';

import Layout from "../components/Layout";
import styles from "../styles/styles.module.css";

import { Amplify } from 'aws-amplify';
import awsExports from '../src/aws-exports';

Amplify.configure({...awsExports, ssr: true});

const title = "Let us know";
const description = "meta description";

const Complaints = () => {
  const router = useRouter();

  return (
    <Layout title={title} description={description}>
        <h1 className={styles.title}>
          Let us know
        </h1>
        <FormikStepper
          initialValues={{ whatDoYouWantToDo: '', contactName: '', email: '', postcode: '' }}
          onSubmit={async (values, { setSubmitting }) => {
            console.log('onSubmit');
           // setTimeout(() => {
              console.log(JSON.stringify(values, null, 2));
              const res = await fetch('api/submitToBizTalk',
                //'https://integration.leeds.gov.uk/someendpoint',
                {
                  body: JSON.stringify(values, null, 2),
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  method: 'POST'
                }
              ) 
          
              //Reply from endpoint
              const result = await res.json()
              console.log(JSON.stringify(result,null,2));
              setSubmitting(false);
           // }, 400);
          }}
        >
        <FormikStep 
          validationSchema={Yup.object({
            whatDoYouWantToDo: Yup.string()
              .required('Required')
          })}>
          <WhatDoYouWantToDo/>
        </FormikStep>
        <FormikStep 
          validationSchema={Yup.object({
            contactName: Yup.string()
              .max(15, 'Must be 15 characters or less')
              .required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
          })}>
          <Contact/>
        </FormikStep>
        <FormikStep>
          <AddressLookup/> 
        </FormikStep>
        <FormikStep>
          <Summary/>
        </FormikStep>
        </FormikStepper>
    </Layout>
  );
} ;

export function FormikStep({children})  {
  return <>{children}</>
}

export function FormikStepper({children, ...props}) {
  const childrenArray = React.Children.toArray(children);
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];

  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  return (
  <Formik 
      {...props} 
      validationSchema = {currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
    if (isLastStep()) {
      await props.onSubmit(values, helpers); //calls parent when on last step
    }
    else {
      setStep(s=> s + 1);
    }
  }}>
    <Form>
      {step > 0 ? <button type="button" onClick={() => setStep(s=>s-1)}>Back</button> : null}
      {currentChild}
      <button type="submit">{isLastStep() ? 'Submit' : 'Next'}</button>
    </Form>
  </Formik>
  );
}

export default Complaints;
