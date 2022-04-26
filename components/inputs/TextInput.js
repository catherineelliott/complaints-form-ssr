import { useField  } from 'formik';

const TextInput = ({ label, ...props }) => {
  //console.log('label',label)
  //console.log('props', props)
 // console.log('...props', ...props)
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input>. We can use field meta to show an error
    // message if the field is invalid and it has been touched (i.e. visited)
    const [field, meta] = useField(props);
    console.log('text props', props)
    console.log('text field', field)
    console.log('text meta', meta)
    return (
      <>
        <label htmlFor={props.id || props.name}>{label}</label>
        <input className="text-input" {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </>
    );
  };

  export default TextInput