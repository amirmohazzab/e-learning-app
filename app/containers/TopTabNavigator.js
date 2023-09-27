import React from 'react'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import {RFPercentage} from 'react-native-responsive-fontsize'
import { Courses } from '../screens';
import Screen from '../components/shared/Screen';
import NewCourses from '../screens/NewCourses';
import TopCourses from '../screens/TopCourses';


const TopTab = createMaterialTopTabNavigator();



const TopTabNavigator = () => {
    return ( 
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
        </Screen>
     );
}
 
export default TopTabNavigator;