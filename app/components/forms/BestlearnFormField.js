import React from 'react'
import {useFormikContext} from 'formik'
import BestlearnTextInput from '../shared/BestlearnTextInput';
import ErrorMessage from './ErrorMessage';

const BestlearnFormField = ({name, ...otherProps}) => {

    const {handleChange, setFieldTouched, errors, touched} = useFormikContext();

    return ( 
        <>
            <BestlearnTextInput 
                {...otherProps}
                onChangeText={handleChange(name)}
                onBlur={()=> setFieldTouched(name)}
            />
            <ErrorMessage error={errors[name]} visible={touched[name]}/>
        </>
     );
}
 
export default BestlearnFormField;