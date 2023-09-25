import React from 'react'
import {View, StyleSheet, Image} from 'react-native'
import * as Yup from 'yup'
import Constants from 'expo-constants'
import {BestlearnForm, BestlearnFormField, SubmitButton} from '../components/forms'


const validationSchema = Yup.object().shape({
    fullname: Yup.string().required('Fullname is required'),
    email: Yup.string().required('This field is required').email('Email is not valid'),
    password: Yup.string().required('This field is required').min(4),
    passwordConfirmation: Yup.string().required('Repeat password is required')
    .oneOf([Yup.ref("password"), null], 'Passwords must be equal')
});

const Register = () => {
    
    return ( 
        <View style={styles.container} >
            <Image style={styles.logo} source={require('../assets/logo.png')}/>
            <BestlearnForm
                initialValues={{fullname: "", email: "", password: "", passwordConfirmation: ""}}
                onSubmit={values => console.log(values)}
                validationSchema={validationSchema}
            >
                        <BestlearnFormField 
                            placeholder='Fullname'
                            autoCorrect={false}
                            icon="account-circle"
                            name="fullname"
                            placeholderTextColor="royalblue"
                        />

                        <BestlearnFormField
                            placeholder='Email'
                            autoCompleteType="email"
                            autoCorrect={false}
                            keyboardType='email-address'
                            icon="email"
                            name="email"
                            placeholderTextColor="royalblue"
                        />

                        <BestlearnFormField
                            placeholder='Password'
                            autoCorrect={false}
                            icon="onepassword"
                            name="password"
                            placeholderTextColor="royalblue"
                            secureTextEntry
                        />

                        <BestlearnFormField
                            placeholder='Repeat Password'
                            autoCorrect={false}
                            icon="onepassword"
                            name="passwordConfirmation"
                            placeholderTextColor="royalblue"
                            secureTextEntry
                        />
                        
                        <View style={{width: "60%"}}>
                            <SubmitButton 
                                title="Register"
                            />
                        </View>
            </BestlearnForm>
        </View>
     );
};
 
export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    alignItems: "center",
    backgroundColor: "#fff"
  },
  logo: {
    width: 300,
    height: 200,
    marginTop: 20, 
    marginBottom: 20
  }
})



