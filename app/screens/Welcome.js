import React, {useEffect} from 'react'
import {Alert, View, ImageBackground, StyleSheet, BackHandler} from 'react-native'
import {NetInfo} from '@react-native-community/netinfo';
import {StackActions, useNavigationState} from '@react-navigation/native'
import CustomButton from '../components/shared/CostomButton';
import BestlearnText from '../components/shared/BestlearnText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decodeToken } from './../utils/jwt';
import { costumToast } from '../utils/toast';


const confirmationAlert = () => {
  return Alert.alert('Server Connection', `Connet to internet is necessary`, 
  [
      {
          text: "Ok",
          onPress: BackHandler.exitApp

      }
  ], 
  {cancelable: false}
  )};

const Welcome = ({navigation}) => {

    const screenIndex = useNavigationState(state => state.index);

    useEffect(() => {
      let currentCount = 0;
      console.log(screenIndex);

      if (screenIndex <= 0) {
        BackHandler.addEventListener("hardwareBackPress", () => {
          if (currentCount === 1) {
            BackHandler.exitApp;
            return true;
          }

          currentCount += 1;
          costumToast("Touch again back button to exit");

          setTimeout(() => {
            currentCount === 0;

          }, 1000);

          return true;
        });
      }

    }, []);

    useEffect(() => {
        const checkForNet = async () => {
        const state = await NetInfo.fetch();
        // console.log('Connection Type:', state.type);
        // console.log('Is Connected:', state.isConnected);
        if (!state.isConnected) confirmationAlert();
        else {
          const token = await AsyncStorage.getItem("token");
          const userId = JSON.parse(await AsyncStorage.getItem("userId"));

          if (token !== null && userId !== null)  {
            const decodedToken = decodeToken(token);
            

            if (decodedToken.user.userId === userId) {
              navigation.dispatch(StackActions.replace("Home"));
            } else {
              await AsyncStorage.removeItem("token");
              await AsyncStorage.removeItem("userId");
              navigation.navigate("Login");
            }
          }
        }
      };
      checkForNet();
    }, []);

    return (
        <ImageBackground 
            source={require('../assets/bg1.jpg')}
            style={styles.background}
            blurRadius={3}
        >
            <View style={styles.textContainer}>
              <BestlearnText size="3.5" styles={styles.firstText}>
                Self learning, Experience, Enter job market
              </BestlearnText>
            </View>
            <View style={styles.buttonContainer} >
              <CustomButton title="Login" color="royalblue" onPress={()=> navigation.navigate('Login')}/>
              <CustomButton title="Register" onPress={()=> navigation.navigate('Register')} />
            </View>
        </ImageBackground>
    );
};

export default Welcome;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  buttonContainer: {
    width: "100%",
    padding: 20
  },
  textContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center"
  },
  firstText: {
    fontWeight: "bold",
    top: 25,
    color: "tomato",
    textAlign: "center"
  }
})
