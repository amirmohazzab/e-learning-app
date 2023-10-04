import React, {useContext, useEffect} from 'react'
import { FlatList, StyleSheet, TouchableOpacity} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Screen from '../components/shared/Screen';
import Card from '../components/shared/Card';
import { BestlearnContext } from '../containers/TopTabNavigator';
import { decodeToken } from './../utils/jwt';


const Courses = ({navigation}) => {

    const {courses, loading} = useContext(BestlearnContext);

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
                            title={item.title}
                            price={item.price}
                            image={item.imageUrl}
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

