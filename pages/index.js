import { useState } from "react";

import React from 'react';
import { Formik, Field, Form, ErrorMessage, FormikConfig, FormikValues, useFormikContext } from 'formik';
import * as Yup from 'yup';

import WhatDoYouWantToDo from "../components/WhatDoYouWantToDo";
import Contact from "../components/Contact";
import ContactYesNo from "../components/ContactYesNo";
import Summary from "../components/Summary";
import styles from "../styles/styles.module.css";

import { Amplify } from 'aws-amplify';
import awsExports from '../src/aws-exports';

Amplify.configure({ ...awsExports, ssr: true });

import axios from 'axios';

const Complaints = () => {

  return (
    <FormikStepper 
      initialValues={{ whatDoYouWantToDo: '', contactYesNo: '', contactName: '', email: '' }}
      onSubmit={async (values, { setSubmitting }) => {
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
        console.log(JSON.stringify(result, null, 2));
        setSubmitting(false);
      }}
    >
        <WhatDoYouWantToDo validationSchema={Yup.object({
          whatDoYouWantToDo: Yup.string()
                        .required('Required')
        })}
        />
        <ContactYesNo validationSchema={Yup.object({
          contactYesNo: Yup.string()
                        .required('Required')
        })}
        />
      <FormikStep
        validationSchema={Yup.object({
          contactName: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .required('Required'),
          email: Yup.string().email('Invalid email address').required('Required'),
        })}>
          <Contact page="2" />
      </FormikStep>
      <FormikStep>
        <Summary/>
      </FormikStep>
      {/* <Contact formikProp={formik}/>  */}
    </FormikStepper>
  );
};

export function FormikStep({ children, ...props }) {
/*   console.log('children',children)
  console.log('props',props) */
  return <>{children}</>
}

export function FormikStepper({ children, ...props }) {

  const pageArray = ['WhatDoYouWantToDo']
  
  const childrenArray = React.Children.toArray(children);
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];

  const [hasServerError, setHasServerError] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState("");

  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        console.log('submit', values)
        if (isLastStep()) {
          await props.onSubmit(values, helpers); //calls parent when on last step
        }
        else {
          if (step === 2) {
            const api = 'https://8hxshe9w7g.execute-api.us-east-1.amazonaws.com/dev/contact';
            const data = { "contactName": values.contactName };
            axios
              .post(api, data)
              .then((response) => {
                console.log('resp ', response);
                //Would fix routes
                //if (values.whatDoYouWantToDo === "Complaint" && step === 0) {
                //  setStep(2);
                //}
                //else {
                  setStep(s => s + 1);
                //}
               // helpers.setTouched({});
              })
              .catch((error) => {
                console.log('error ', error.response);
                setHasServerError(true);
                setServerErrorMessage("error.response.data");

              });
          } else {
            //Would fix routes
           // if (values.whatDoYouWantToDo === "Complaint" && step === 0) {
           //   setStep(2);
            //}
            //else {
             setStep(s => s + 1);
           // }
            
          }
          helpers.setTouched({});
        }
      }}>
      <Form>
        {step > 0 ? <button type="button" onClick={() => setStep(s => s - 1)}>Back</button> : null}
        {currentChild}
        <div>Error: {serverErrorMessage}</div>
        <button type="submit">{isLastStep() ? 'Submit' : 'Next'}</button>
      </Form>
    </Formik>
  );
}

export default Complaints;
