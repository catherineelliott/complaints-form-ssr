import React from "react";
import { useState } from "react";
import TextInput from "./inputs/TextInput";
import { useFormikContext, ErrorMessage } from 'formik';

function Address() {
    const formikContext = useFormikContext();
    const [data, setData] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [isErrored, setErrored] = useState(false);
    //const [isClicked, setClicked] = useState(false);

    const fetchData = async () => {
/*         setLoading(true);
        await fetch(`api/getAddress/${formikContext.values.postcode}`)
            .then((res) => res.json())
            .then((data) => {
                console.log('address data', data);
                setErrored(false);
                setData(data);
            })
            .catch ((data) => {
                console.log("err ", data.status);
                setErrored(true);
            })
            setLoading(false) */
        try {
            //setClicked(true);
            setLoading(true);
            const req = await fetch(`api/getAddress/${formikContext.values.postcode}`);
            const data = await req.json();
            console.log('address data',data)
             if (req.ok) {
                setErrored(false)
                setData(data);
            }
            else {
                console.log("err ", data.status)
                formikContext.values.address = '';
                setErrored(true)
            }
            setLoading(false)
        }
        catch (err) {
            console.log("catch err ", err)
            formikContext.values.address = '';
            setLoading(false)
            setErrored(true)
        } 
        
    };

    const handleClick = (event) => {
        event.preventDefault();
        fetchData();
    };

    return (
        <div>
            <h2>Customer address</h2>
            <TextInput
                label="Enter your postcode"
                name="postcode"
                type="text"
                placeholder=""
            />            
            <button type="button" onClick={handleClick}>Find address</button>
            {isLoading ? <p>Loading...</p> : null}
            {isErrored ? <p>No matching addresses were found!</p> : 
                <>
                {data ?
                <div>
                    <label htmlFor="address" style={{ display: "block" }}>
                        Select your address
                    </label>
                    <select
                        name="address"
                        value={formikContext.values.address}
                        onChange={formikContext.handleChange}
                        onBlur={formikContext.handleBlur}
                        style={{ display: "block" }}
                    >
                        <option value="" label="-Please select-">
                        -Please select-{" "}
                        </option>
                        {data.addresses?.map((address) => 
                            <option key={address} value={address} label={address}>
                                    {" "}
                                    {address}
                            </option>
                        )}
                        
                    </select>
                </div> :
                <>{formikContext.values.address ? <p>Selected address: {formikContext.values.address} </p> : null}</>}
                </>
            }
            <ErrorMessage name="address" />
        </div>
    )
}

export default Address