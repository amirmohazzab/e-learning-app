import React, {createContext, useState, useEffect} from 'react'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import {RFPercentage} from 'react-native-responsive-fontsize'
import Toast from 'react-native-tiny-toast';
import { Courses, NewCourses, TopCourses } from '../screens';
import Screen from '../components/shared/Screen';
import { fetchCourses } from './../services/courses';
import { loadingToast } from '../utils/toast';


export const BestlearnContext = createContext({
    courses: [],
    //loading: true
});


const TopTab = createMaterialTopTabNavigator();

const TopTabNavigator = () => {

    //const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
       try {
            const fetchData = async () => {
            loadingToast("Loading...");
            const courses = await fetchCourses();
            setCourses(courses);
            //setLoading(false);
            Toast.hide();
        };
        fetchData();
        
       } catch (err) {
        console.log(err);
        Toast.hide();
       }
    }, []);

    return ( 
        <BestlearnContext.Provider value={{courses}}>
            <Screen> 
                <TopTab.Navigator 
                    initialRouteName="AllCourses"
                    backBehavior="none"
                    screenOptions={{
                        activeTintColor: "tomato",
                        inactiveTintColor: "gray",
                        labelStyle: {
                            fontSize: RFPercentage(1.7)
                        },
                        style: {
                            backgroundColor: "#f8f4f4"
                        }
                    }}
                >
                    <TopTab.Screen name="AllCourses" component={Courses} options={{tabBarLabel: "All Courses"}} />
                    <TopTab.Screen name="NewCourses" component={NewCourses} options={{tabBarLabel: "New Courses"}} />
                    <TopTab.Screen name="TopCourses" component={TopCourses} options={{tabBarLabel: "Top Courses"}} />
                </TopTab.Navigator>
                {/* {loading ? 
                <ActivityIndicator size="large" color="tomato" animating={loading} style={{ flex: 1}}/>
                : null } */}
            </Screen>
        </BestlearnContext.Provider>
        
     );
}
 
export default TopTabNavigator;