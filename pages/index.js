import { useState } from "react";

import React from 'react';
import { Formik, Field, Form, ErrorMessage, FormikConfig, FormikValues, useFormikContext } from 'formik';
import * as Yup from 'yup';

import WhatDoYouWantToDo from "../components/WhatDoYouWantToDo";
import EnquiryDetails from "../components/EnquiryDetails";
import Contact from "../components/Contact";
import ContactYesNo from "../components/ContactYesNo";
import Summary from "../components/Summary";
import Address from "../components/Address";
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
      initialValues={{ whatDoYouWantToDo: '', yourStory: '', outcome: '', contactYesNo: '', contactName: '', contactByEmail: false, email: '', contactByTelephone: false, telephone: '', postcode: '', address: '' }}
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
          .required('Please choose an option')
      })}
      />
      <EnquiryDetails
        validationSchema={Yup.object({
          yourStory: Yup.string().max(100, 'Must be 100 characters or less')
            .required('Required'),
          outcome: Yup.string().max(100, 'Must be 100 characters or less'),
        })}
      />
      <ContactYesNo validationSchema={Yup.object({
        contactByEmail: Yup.boolean(),
        contactYesNo: Yup.string()
          .required('Please choose an option')
      })}
      />
      <Contact
        validationSchema={Yup.object().shape({
          contactName: Yup.string().max(15, 'Must be 15 characters or less')
            .required('Required'),
          contactByEmail: Yup.boolean()
          .when("contactByTelephone", {
            is: (contactByTelephone) => !contactByTelephone,
            then: Yup.bool().oneOf([true], "At least one needs to be checked")
          }),
          email: Yup.string().email('Invalid email address')
          .when("contactByEmail", {
              is: (contactByEmail) => contactByEmail === true,
              then: Yup.string().required('This field is required')
          }),
          contactByTelephone: Yup.boolean(),
          telephone: Yup.string().matches(/^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/,'Please enter a valid UK contact number (either landline format or mobile format)')
          .when("contactByTelephone", {
              is: (contactByTelephone) => contactByTelephone === true,
              then: Yup.string().required('This field is required')
          }),
        })}
      />
      <Address
        validationSchema={Yup.object({
          postcode: Yup.string().matches(/[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2}/gi, 'Invalid postcode format') //Get correct regex
            .required('Required'),
            address: Yup.string()
            .required('Please select an address'),
        })}
      />
      <Summary />
    </FormikStepper>
  );
};

/* export function FormikStep({ children, ...props }) {
  return <>{children}</>
} */

export function FormikStepper({ children, ...props }) {

  const [route, setRoute] = useState(["WhatDoYouWantToDo"]);
  const [page, setPage] = useState("WhatDoYouWantToDo");
  const [step, setStep] = useState(0);

  const childrenArray = React.Children.toArray(children);
  console.log('childrenArray', childrenArray)
  //const currentChild = childrenArray[0];
  const childrenFilteredArray = childrenArray.filter(obj => { return obj.type.name === page });
  console.log('childrenFilteredArray', childrenFilteredArray)
  const currentChild = childrenFilteredArray[0];
  console.log('currentChild', currentChild)

  const [hasServerError, setHasServerError] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState("");

  const isLastPage = () => {
    //return page === childrenArray.length - 1;
    return page === "Summary";
  }

  const updateRoute = async (values) => {
    const api = 'https://0v3vl199t1.execute-api.us-east-1.amazonaws.com/dev/forms';
    const data = { formName: 'Complaints', currentPage: page, values: values };
    axios
      .post(api, data)
      .then((response) => {
        if (response.data.nullFields) {
          response.data.nullFields.forEach(element => {
            values[element] = '';
          });
        }
        setPage(response.data.nextPage)
        setRoute((oldRoute) => [...oldRoute, response.data.nextPage])
      })
      .catch((error) => {
        console.log('error ', error);
        setHasServerError(true);
        setServerErrorMessage("error.response.data");

      });
    /* const options = {
         method: 'POST',
         body: JSON.stringify(  {currentPage: page, values: values  //can we just get values for current page?
       } )  
     };
     await fetch('api/getNextPageLambda', options)
       .then((res) => res.json())
       .then((data) => {
         console.log('data', data);
         setPage(data.page)
         setRoute((oldRoute) => [...oldRoute, data.page])
       })*/
  };

  function nextPage(values, helpers) {
    updateRoute(values);
    setStep(s => s + 1)
    helpers.setTouched({});
  }

  function previousPage() {
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
        console.log('submit', props)
        if (isLastPage(page, childrenArray)) {
          await props.onSubmit(values, helpers); //calls parent when on last page
        }
        else {
          nextPage(values, helpers)
        }
      }}>
      <Form>
        {step > 0 ? <button type="button" onClick={() => { previousPage() }}>Back</button> : null}
        {currentChild}
        <div>{serverErrorMessage}</div>
        <button type="submit">{isLastPage(page, childrenArray) ? 'Submit' : 'Continue'}</button>
      </Form>
    </Formik>
  );
}

export default Complaints;
