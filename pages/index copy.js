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
  const x = () => {
    console.log('x')
  }
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

  const route1 = [0,1,2,3]
  const route2 = [0,1,3]
  //const pageArray = ['WhatDoYouWantToDo']
  
  const [route, setRoute] = useState(route1);

  const childrenArray = React.Children.toArray(children);
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];

  const [hasServerError, setHasServerError] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState("");

 const isLastStep = () => {
  return step === childrenArray.length - 1;
} 

const fetchRoute = async () => {
  const req = await fetch(`api/getAddress/0L9`);
  const data = await req.json();
  console.log('data', data)
  return setRoute(data.route);
};

  function nextStep (values,helpers) {
    fetchRoute();
    console.log('route', route)
    console.log('step', step)
    if (step === 1 && values.contactYesNo === 'No') {
      console.log('step 1', route2)
      setRoute([...route, ...route2])
    }
    const nextStep = route[step + 1]
    console.log('route', route)
    console.log('route step', route[step + 1])
    console.log('next step', nextStep)
    setStep(nextStep);
    //console.log('next step', step)
    //setStep(s => s + 1);
    helpers.setTouched({});
  }

  function previousStep() {
    console.log('step', step)
    const nextStep = route[step - 1]
    console.log('previous step', nextStep)
    setStep(nextStep);
  }

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        console.log('submit', values)
        if (isLastStep(step,childrenArray)) {
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
                  nextStep(values,helpers);
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
              nextStep(values,helpers)
           // }
            
          }
          
        }
      }}>
      <Form>
        {step > 0 ? <button type="button" onClick={() => {previousStep()}}>Back</button> : null}
        {currentChild}
        <div>Error: {serverErrorMessage}</div>
        <button type="submit">{isLastStep(step,childrenArray) ? 'Submit' : 'Next'}</button>
      </Form>
    </Formik>
  );
}

export default Complaints;
