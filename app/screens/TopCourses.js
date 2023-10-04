import React, {useContext} from 'react'
import { FlatList, StyleSheet, TouchableOpacity} from 'react-native'
import Screen from '../components/shared/Screen';
import Card from '../components/shared/Card';
import { BestlearnContext } from '../containers/TopTabNavigator';


const TopCourses = ({navigation}) => {

    const {courses} = useContext(BestlearnContext);

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
 
export default TopCourses;


const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "f8f4f4"
  }
})

