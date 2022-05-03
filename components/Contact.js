import React from 'react';
import TextInput from "./inputs/TextInput"; 

export default function Contact(props) {
  console.log('contact props', props)
    return (
    <div>
         <h1>Contact details</h1>
          
            {/*  <div>{props.formikProp.values.contactName}</div>*/}
              <TextInput label="Contact name" name="contactName" type="text" placeholder=""/>
              <TextInput label="Contact email" name="email" type="email" placeholder=""/>
    </div>
    )
  }