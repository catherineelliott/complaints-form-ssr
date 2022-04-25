import { useState} from 'react';
import TextInput from "../components/inputs/TextInput";
import { useFormikContext  } from 'formik';

function AddressLookup() {
    const formikContext = useFormikContext();
    const [data, setData] = useState("");
    const [isLoading, setLoading] = useState(false)

    const fetchData = async () => {
        setLoading(true)
        const req = await fetch(`api/getAddress/${formikContext.values.postcode}`);
        const data = await req.json();
        setLoading(false)
        return setData(data);
    };

    const handleClick = (event) => {
        event.preventDefault();
        fetchData();
    };

    return (
        <div>        
            <h2>Address</h2>
            <TextInput
                label="Postcode"
                name="postcode"
                type="text"
                placeholder=""
                />
            <p>{isLoading ? "Loading..." : null}</p>
            <p>{!data ? "No data" : data.name}</p>
            <button type="button" onClick={handleClick}>Find address</button>
        </div>
    )
}

export default AddressLookup