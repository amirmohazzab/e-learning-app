import React from 'react'
import {View, StyleSheet, Image} from 'react-native'
import Toast from 'react-native-tiny-toast';
import * as Yup from 'yup'
import {BestlearnForm, BestlearnFormField, SubmitButton} from '../components/forms'
import Screen from '../components/shared/Screen'
import { registerUser } from './../services/user';
import { costumToast, loadingToast } from '../utils/toast';


const validationSchema = Yup.object().shape({
    fullname: Yup.string().required('Fullname is required'),
    email: Yup.string().required('This field is required').email('Email is not valid'),
    password: Yup.string().required('This field is required').min(4),
    passwordConfirmation: Yup.string().required('Repeat password is required')
    .oneOf([Yup.ref("password"), null], 'Passwords must be equal')
});

const Register = ({navigation}) => {

    //const [loading, setLoading] = useState(false);

    const handleUserRegistration = async (user) => {
        try {
            loadingToast("Registering...");

            const data = await registerUser(user);

            if (data.data.status === 201) {
                //setLoading(false);
                Toast.hide()
                navigation.navigate('Login', {successRegister: true});
            } else {
                console.log("Server error");
                Toast.hide();
                costumToast("An error was occured");
                //setLoading(false);
            }
        } catch (err) {
            console.log(err);
        }
    }
    
    return ( 
        <Screen style={styles.container} >
            <Image style={styles.logo} source={require('../assets/logo.png')}/>
            <BestlearnForm
                initialValues={{fullname: "", email: "", password: "", passwordConfirmation: ""}}
                onSubmit={(user) => {
                    
                    //setLoading(true);
                    handleUserRegistration(user);
                }}
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
            {/* {loading ? 
                <ActivityIndicator size="large" color="tomato" animating={loading} style={{ flex: 1}}/>
                : null } */}
        </Screen>
     );
};
 
export default Register;

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



