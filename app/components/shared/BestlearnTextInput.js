import React from 'react'
import {View, TextInput, StyleSheet } from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'


const BestlearnTextInput = ({icon, ...otherProps}) => {
    return ( 
        <View style={styles.container}>
            <TextInput style={styles.text} {...otherProps} />
            {icon && (
                <MaterialCommunityIcons 
                    name={icon}
                    size={25}
                    color="#6e6969"
                    style={styles.icon}
                />
            )}
        </View>
     );
}
 
export default BestlearnTextInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightgray",
    borderRadius: 20,
    flexDirection: "row",
    width: "90%",
    marginVertical: 10,
    padding: 15
  },
  icon: {
    marginLeft: 10,
    alignSelf: "center"
  },
  text: {
    fontSize: 18,
    color: "#0c0c0c",
    textAlign: "center",
    width: "90%"
  }
})
