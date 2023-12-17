import React, {useState} from 'react'
import { View, StyleSheet, TouchableOpacity, FlatList, Alert, Button, ScrollView} from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import {useDispatch, useSelector} from 'react-redux';
import Screen from '../components/shared/Screen';
import BestlearnText from '../components/shared/BestlearnText'
import ItemSeparator from '../components/shared/ItemSeparator';
import {addToBasket, deleteFromBasket, deleteFromBasketMulti, clearBasket} from '../features/cartSlice';
import { Text } from 'react-native';


const confirmationAlert = (course, onPress) => {
    return Alert.alert(course.productId.title, `Are sure to delete ${course.productId.title}?`, [
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
    )
};


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



const quantityAction = (course, onPressa, onPressb) => {
    return (
        <View style={{backgroundColor: "tomato", width: 50}}>
            <View style={{height: "40%", justifyContent: "center", alignItems: "center"}}>
                <TouchableOpacity onPress={() => onPressa(course)}>
                    <MaterialCommunityIcons 
                        name="plus"
                        size={30}
                        color="#fff"
                    />
                </TouchableOpacity>    
            </View>
            <View style={{height: "20%", justifyContent: "center", alignItems: "center"}}>
                <Text style={{color: "white", fontWeight: "bold", fontSize: 20}}> {course.cartQuantity} </Text>
            </View>
            <View style={{height: "40%", justifyContent: "center", alignItems: "center"}}>
                <TouchableOpacity onPress={() => onPressb(course)}>
                    <MaterialCommunityIcons 
                        name="minus"
                        size={30}
                        color="#fff"
                    />
                </TouchableOpacity>    
            </View>
        </View>
    );
};




const MyCourses = () => {

    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    
    const addition = (acc, currentvalue) => {
        return acc + currentvalue.productId?.price * currentvalue.cartQuantity;
      }
    
    const total = cart.cartItems.reduce(addition, 0);


    const handleDelete = (course) => {
        dispatch(deleteFromBasketMulti(course.productId._id));
    };

    const handleIncrease = (course) => {
        dispatch(addToBasket(course.productId._id));  
    };

    const handleDecrease = (course) => {
       dispatch(deleteFromBasket(course.productId._id));
    };
       

    return ( 
        <Screen style={{alignItems: "center"}}>
            <View style={styles.title}>
                <BestlearnText size="3" color="#fff" > My Courses List </BestlearnText>
            </View>
            <ItemSeparator height={3} />
            <ScrollView>
                <View style={{width: "100%"}}>
                    <FlatList 
                        data={cart.cartItems}
                        keyExtractor={course => course.productId._id}
                        renderItem={({item}) => (
                            <View style={{marginVertical: 7}}>
                                <ItemSeparator height={3}/>
                                    <Swipeable 
                                    renderLeftActions={() => deleteAction(item, () => handleDelete(item))}
                                    renderRightActions={() => quantityAction(item, () => handleIncrease(item), () => handleDecrease(item))}
                                    >
                                        <View style={styles.container}>
                                            <View style={styles.details}>
                                                <BestlearnText size="2.5">
                                                    {item.productId.title}
                                                </BestlearnText>
                                                <BestlearnText size="2.5">
                                                    {`${item.productId.price} Euro`}
                                                </BestlearnText>
                                            </View>
                                        </View>
                                    </Swipeable>
                                <ItemSeparator height={3}/>
                            </View>
                        )}
                    />
                </View>
                <View style={{alignItems: "center", marginVertical: 20}}>
                    {
                        total > 0 
                        ? 
                        (
                            <>
                                <View >
                                    <Text style={{fontSize: 20 }}> Sum : {total} </Text>
                                </View>
                                <TouchableOpacity 
                                    onPress={() => dispatch(clearBasket())}
                                    style={{backgroundColor: "tomato", width: "90%", padding: 15, alignItems: "center", marginTop: 5}}
                                >
                                    <Text style={{fontSize: 25, color: "white"}}> Remove Basket </Text>
                                </TouchableOpacity> 
                            </>
                        ) 
                        : 
                        (
                            <Text style={{fontWeight: "bold", fontSize: 20, color: "dodgerblue"}}> Your Basket is Empty </Text>
                        )
                    }
                </View>
            </ScrollView>
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
    padding: 20,
    backgroundColor: "dodgerblue",
    justifyContent: "center"
   },
   details: {
    marginLeft: 10,
    backgroundColor: "#f8f4f4",
    width: "100%",
    padding: 15,
    borderRadius: 14,
    alignItems: "center"
   }
})
