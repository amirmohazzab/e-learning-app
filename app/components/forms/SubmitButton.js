import React from 'react'
import CustomButton from '../shared/CostomButton';
import { useFormikContext } from 'formik';


const SubmitButton = ({title}) => {

    const {handleSubmit} = useFormikContext();

    return ( 
        <CustomButton title={title} onPress={handleSubmit} />
     );
};
 
export default SubmitButton;