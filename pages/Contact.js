import { Field, Form, ErrorMessage } from "formik";
import TextInput from "../components/inputs/TextInput";

export default function Contact() {
    return (
    <div>
        <h1>Contact details</h1>
        <TextInput
        label="Contact name"
        name="contactName"
        type="text"
        placeholder=""
        />
        <TextInput
        label="Contact email"
        name="email"
        type="email"
        placeholder=""
        />
    </div>
    )
  }