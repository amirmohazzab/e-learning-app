import React, {useState, useEffect} from 'react'
import { FlatList, StyleSheet, TouchableOpacity} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from "react-redux";
import {isEmpty} from "lodash";
import Screen from '../components/shared/Screen';
import Card from '../components/shared/Card';
import { decodeToken } from './../utils/jwt';
import {addToBasket} from '../features/cartSlice';


const Courses = ({navigation}) => {

    const {courses} = useSelector(state => state.courses);
    const user = useSelector(state => state.user);
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
  
    const [isClicked, setIsClicked] = useState(false);
      
      
      const handleSubmited = (item) => {
          if (!isEmpty(user)) {
              dispatch(addToBasket(item._id));
          }else{
              navigate.navigate("login");
          }
      };


    useEffect(()=> {
        const myFunc = async () => {
            const token = await AsyncStorage.getItem("token");
            console.log(decodeToken(token));
        };
        myFunc();
    },[])


    return ( 
        <Screen style={styles.container}>
            <FlatList
                data={courses}
                keyExtractor={course => course._id.toString()}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => navigation.navigate('CourseDetails', {course: item})}> 
                        <Card 
                            _id = {item._id}
                            title={item.title}
                            price={item.price}
                            image={item.imageUrl}
                            handleSubmited={() => handleSubmited(item)}
                            isClicked={!isEmpty(user) && cart?.cartItems && cart?.cartItems.some(cp => cp.productId?._id === item._id)} 
                        />
                    </TouchableOpacity>
                )}
            />
        </Screen>
     );
};
 
export default Courses;


const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "f8f4f4"
  }
})

