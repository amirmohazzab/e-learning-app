import React from 'react'
import {View, ImageBackground, StyleSheet} from 'react-native'
import CustomButton from '../components/shared/CostomButton';
import BestlearnText from '../components/shared/BestlearnText';


const Welcome = ({navigation}) => {
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
