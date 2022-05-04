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
  return <>{children}</>
}



export function FormikStepper({ children, ...props }) {
  
  const [route, setRoute] = useState([0]);
  const [page, setPage] = useState(0);
  const [step, setStep] = useState(0);

  const childrenArray = React.Children.toArray(children);
  const currentChild = childrenArray[page];

  const [hasServerError, setHasServerError] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState("");

  const isLastPage = () => {
    //might need to check another way
    return page === childrenArray.length - 1;
  } 

  const fetchRoute = async (values) => {
    const options = {
        method: 'POST',
        body: JSON.stringify(  {currentPage: page, values: values  //can we just get values for current page?
      } )  
    };
    await fetch('api/getNextPage', options)
      .then((res) => res.json())
      .then((data) => {
        console.log('data', data);
        setPage(data.page)
        setRoute((oldRoute) => [...oldRoute, data.page])
      })
  };

  function nextPage (values,helpers) {
    console.log('np route', route)
    console.log('np page', page)
    console.log('np step', step)
    fetchRoute(values);
    setStep(s => s + 1)
    helpers.setTouched({});
  }

  function previousPage() {
    console.log('pp route length', route.length)
    console.log('pp route', route)
    console.log('pp page', page)
    console.log('pp step', step)
    setPage(route[step - 1])
    setStep(s => s - 1)
    setRoute([...route.slice(0, route.length - 1),
      ...route.slice(route.length)])
  }

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        console.log('submit', values)
        if (isLastPage(page,childrenArray)) {
          await props.onSubmit(values, helpers); //calls parent when on last page
        }
        else {
              nextPage(values,helpers)          
        }
      }}>
      <Form>
        {step > 0 ? <button type="button" onClick={() => {previousPage()}}>Back</button> : null}
        {currentChild}
        <div>{serverErrorMessage}</div>
        <button type="submit">{isLastPage(page,childrenArray) ? 'Submit' : 'Next'}</button>
      </Form>
    </Formik>
  );
}

export default Complaints;
