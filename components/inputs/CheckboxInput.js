import { useField  } from 'formik';

const CheckboxInput = ({ children, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input>. We can use field meta to show an error
    // message if the field is invalid and it has been touched (i.e. visited)
    const [field, meta] = useField({...props, type: "checkbox"});
    return (
      <>
        <label className='checkbox'>
            <input {...field} {...props} type='checkbox'/>
            {children}
        </label>
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </>
    );
  };

  export default CheckboxInput