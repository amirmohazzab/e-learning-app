import React from 'react'
import {View, StyleSheet, Image} from 'react-native'
import * as Yup from 'yup'
import Constants from 'expo-constants'
import {BestlearnForm, BestlearnFormField, SubmitButton} from '../components/forms'

const validationSchema = Yup.object().shape({
    email: Yup.string().required('This field is required').email('Email is not valid'),
    password: Yup.string().required('This field is required').min(4)
});

const Login = () => {
    
    return ( 
        <View style={styles.container} >
            <Image style={styles.logo} source={require('../assets/logo.png')}/>
            <BestlearnForm
                initialValues={{email: "", password: ""}}
                onSubmit={values => console.log(values)}
                validationSchema={validationSchema}
            >
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
                            autoCompleteType="password"
                            autoCorrect={false}
                            icon="onepassword"
                            name="password"
                            placeholderTextColor="royalblue"
                            secureTextEntry
                        />

                        <View style={{width: "60%"}}>
                            <SubmitButton 
                                title="Enter"
                            />
                        </View>
            </BestlearnForm>
        </View>
     );
};
 
export default Login;

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



