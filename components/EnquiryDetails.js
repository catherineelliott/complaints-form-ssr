import React from 'react';
import TextAreaInput from "./inputs/TextAreaInput"; 

export default function EnquiryDetails(props) {
    return (
    <div>
        <h1>Enquiry details</h1>
        <TextAreaInput label="Please tell us your story" name="yourStory" type="text" placeholder="" rows="5"/>
        <TextAreaInput label="Outcome" name="outcome" type="text" placeholder=""/>
    </div>
    )
  }