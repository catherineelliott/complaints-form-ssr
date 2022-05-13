import { useField  } from 'formik';

//Works but doesn't show as selected??
const RadioInput = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input>. We can use field meta to show an error
    // message if the field is invalid and it has been touched (i.e. visited)
    const [field, meta] = useField(props);
    console.log("field", field);
    console.log("meta", meta);
    console.log(props.id, props.name);
    return (
      <>
        <label htmlFor={props.id || props.name}>{label}</label>
        <div role="group" aria-labelledby="whatDoYouWantToDo-radio-group">
{/*         {props.options.map(option => { */}
        <label>
            <input {...field} {...props} value="TakeAction" checked={field.value === 'TakeAction'}/>
            Request the council take action
          </label>
          <label>
            <input {...field} {...props} value="Compliment" checked={field.value === 'Compliment'}/>
            Give a compliment
          </label>
{/*         })} */}
 </div>
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </>
    );
  };

  export default RadioInput