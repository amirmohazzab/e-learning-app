import React, {useState} from 'react'
import { View, StyleSheet, TouchableOpacity, FlatList, Alert} from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import Screen from '../components/shared/Screen';
import BestlearnText from '../components/shared/BestlearnText'
import ItemSeparator from '../components/shared/ItemSeparator';


const confirmationAlert = (course, onPress) => {
    return Alert.alert(course.title, `Are sure to delete ${course.title}?`, [
        {
            text: "Cancel",
            onPress: ()=>{},
            style: "cancel"
        },
        {
            text: "Ok",
            onPress: onPress,

        }
    ], 
    {cancelable: false}
    )};


const deleteAction = (course, onPress) => {
    return (
        <TouchableOpacity onPress={() => confirmationAlert(course, onPress)}>
            <View style={{
                backgroundColor: "tomato",
                width: 50,
                height: "100%",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <MaterialCommunityIcons 
                    name="trash-can"
                    size={35}
                    color="#fff"
                />
            </View>
        </TouchableOpacity>
    );
};


const MyCourses = () => {

    const [myCourses, setMyCourses] = useState([
        { id: 1, title:  "Nodejs", price: 200 },
        { id: 2, title: "React Native", price: 300},
        { id: 3, title: "Reactjs", price: 400 },
        { id: 4, title: "Electronjs", price: 250 },
        { id: 5, title: "Javascript", price: 350 },
    ]);


    const handleDelete = (course) => {
        setMyCourses(myCourses.filter(c => c.id !== course.id))
    };

    return ( 
        <Screen style={{alignItems: "center"}}>
            <View style={styles.title}>
                <BestlearnText size="3" color="#fff" > My Courses List </BestlearnText>
            </View>
            <ItemSeparator height={3} />
            <View style={{width: "100%"}}>
                <FlatList 
                    data={myCourses}
                    keyExtractor={course => course.id.toString()}
                    renderItem={({item}) => (
                        <View style={{marginVertical: 7}}>
                            <ItemSeparator height={3}/>
                            <Swipeable renderLeftActions={() => deleteAction(item, () => handleDelete(item))}>
                                <View style={styles.container}>
                                    <View style={styles.details}>
                                        <BestlearnText size="2.5">
                                            {item.title}
                                        </BestlearnText>
                                        <BestlearnText size="2.5">
                                            {`${item.price} Euro`}
                                        </BestlearnText>
                                    </View>
                                </View>
                            </Swipeable>
                            <ItemSeparator height={3}/>
                        </View>
                    )}
                />
            </View>
        </Screen>
     );
};
 
export default MyCourses;


const styles = StyleSheet.create({
  title: {
    marginVertical: 20,
    backgroundColor: "tomato",
    padding: 10,
    borderRadius: 10,
    width: "90%",
    alignItems: "center"
  },
  container:{
    flexDirection: "row",
    padding: 15,
    backgroundColor: "dodgerblue",
    justifyContent: "center"
   },
   details: {
    marginLeft: 10,
    backgroundColor: "#f8f4f4",
    width: "100%",
    padding: 10,
    borderRadius: 14,
    alignItems: "center"
   }
})
