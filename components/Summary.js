import { useFormikContext  } from 'formik';

function Summary(props) {
  const formikContext = useFormikContext();
  return (
    <div>        
        <h2>Summary</h2>
        <ul>
             <li>What Do You Want To Do: {formikContext.values.whatDoYouWantToDo}</li>
             <li>Your story: {formikContext.values.yourStory}</li>
             <li>Outcome: {formikContext.values.outcome}</li>
            <li>Name: {formikContext.values.contactName}</li>
            <li>Email: {formikContext.values.email}</li>
            <li>Postcode: {formikContext.values.postcode}</li> 
            <li>Address: {formikContext.values.address}</li> 
        </ul>
    </div>
  )
}

export default Summary