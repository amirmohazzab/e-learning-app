import React from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, TouchableHighlight } from 'react-native'
import {StackActions} from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Screen from '../components/shared/Screen';
import Icon from '../components/shared/Icon'
import ItemSeparator from '../components/shared/ItemSeparator';



const Account = ({navigation}) => {

    const handleLogout = async () => {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("userId");
      navigation.dispatch(StackActions.replace("Welcome"));
    };

    return ( 
        <Screen style={styles.screen}>
            <View style={styles.container}> 
                <Image style={styles.image} source={require('../assets/photo.jpg')}/>
                <View style={styles.details}>
                    <Text style={styles.title}> Amir Mohazzab </Text>
                    <Text style={styles.subTitle}> ahm.mohazzab@gmail.com </Text>
                </View>
                <TouchableOpacity onPress={()=> {}} style={{alignSelf: "center", marginLeft: 15}}>
                    <Icon name="settings" iconColor="tomato" />
                </TouchableOpacity>
            </View>
            <ItemSeparator height={3} />
            <TouchableHighlight underlayColor="#f8f4f4" onPress={handleLogout}>
                <View style={[styles.container, {flexDirection: "row-reverse"}]}>
                    <Icon name="exit-outline" iconColor="tomato" size={32} />  
                    <View style={styles.subTitle}>
                        <Text style={styles.title}> Logout </Text>
                    </View>
                </View>
            </TouchableHighlight>
        </Screen>
     );
};
 
export default Account;


const styles = StyleSheet.create({
  container:{
    flexDirection: "row",
    marginVertical: 20,
    padding: 15
  },
  screen: {
    backgroundColor: "#f8f4f4"
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 40
  },
  details: {
    marginLeft: 10,
    justifyContent: "center"
  }, 
  title: {
    fontWeight: "bold",
    fontSize: 20
  },
  subTitle: {
    color: "#6e6969"
  }
})
