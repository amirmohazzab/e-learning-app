import React from 'react'
import { FlatList, StyleSheet, TouchableOpacity} from 'react-native'
import Screen from '../components/shared/Screen';
import Card from '../components/shared/Card';


const courses = [
    {
        id: 1,
        title: "NodeJs",
        price: "300",
        image: require("../assets/courses/nodejs.png"),
    },
    {
        id: 2,
        title: "ReactJs",
        price: "200",
        image: require("../assets/courses/reactjs.png"),
    },
    {
        id: 3,
        title: "ElectronJs",
        price: "100",
        image: require("../assets/courses/electronjs.jpg"),
    },
    {
        id: 4,
        title: "React Native",
        price: "150",
        image: require("../assets/courses/reactnative.png"),
    },
];

const Courses = ({navigation}) => {
    return ( 
        <Screen style={styles.container}>
            <FlatList
                data={courses}
                keyExtractor={course => course.id.toString()}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => navigation.navigate('CourseDetails', {course: item})}> 
                        <Card 
                            title={item.title}
                            price={item.price}
                            image={item.image}
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

