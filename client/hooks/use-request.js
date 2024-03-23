import axios from "axios";
import { useState } from "react";

const useRequest = ({url, method, body}) => {
    const [errors, setErrors] = useState(null);

    const doRequest = async () => {

        try{
            const response = await axios[method](url, body);

            return response.data;
        }catch(err){
            setErrors(

            )
        }

    }

    // As in hooks we return array  but here we are using object
    return {doRequest, errors};
}