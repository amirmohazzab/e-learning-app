import React, {useEffect} from 'react'
import {View, StyleSheet, Image} from 'react-native';
import * as Yup from 'yup'
import {BestlearnForm, BestlearnFormField, SubmitButton} from '../components/forms'
import Screen from '../components/shared/Screen'
import { costumToast, loadingToast, successToast } from '../utils/toast';
import { loginUser } from '../services/user';
import Toast from 'react-native-tiny-toast';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux'
import { decodeToken } from './../utils/jwt';
import { addUser } from '../features/userSlice';
import { getBasket } from './../features/cartSlice';


const validationSchema = Yup.object().shape({
    email: Yup.string().required('This field is required').email('Email is not valid'),
    password: Yup.string().required('This field is required').min(4)
});


const Login = ({navigation, route}) => {

    const dispatch = useDispatch();
    
    useEffect(() => {
        if (route.params.successRegister) 
            successToast("Register was successful");
    }, []);


    const handleUserLogin = async (user) => {
        try {
            loadingToast("Connection...");
            const data = await loginUser(user);
            
            
            if (data.data.status === 200) {

                Toast.hide();
                successToast("Login was successful"); 
                
                await AsyncStorage.setItem("token", JSON.stringify(data.data.data.token));
                await AsyncStorage.setItem("userId", JSON.stringify(data.data.data.userId));


                axios.defaults.headers.common["Authorization"] = `Bearer ${data.data.data.token}`;

                const decodedToken = decodeToken(data.data.data.token);
                dispatch(addUser(decodedToken?.user));
                dispatch(getBasket());

                navigation.reset({
                    index: 0,
                    routes: [{name: "Home"}]
                });
            } else {
                Toast.hide();
                costumToast("Email or Password is not correct");
            }
        } catch (err) {
            Toast.hide();
            //console.log(err)
        }
    }
    
    return ( 
        <Screen style={styles.container} >
            <Image style={styles.logo} source={require('../assets/logo.png')}/>
            <BestlearnForm
                initialValues={{email: "", password: ""}}
                onSubmit={(user) => {
                    handleUserLogin(user)
                    
                }}
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
        </Screen>
     );
};
 
export default Login;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff"
  },
  logo: {
    width: 270,
    height: 200,
    marginTop: 20, 
    marginBottom: 40
  }
})



