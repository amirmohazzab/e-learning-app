import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {Welcome, Register, Login, CourseDetails} from '../screens';
import BottomTabsNavigator from './BottomTabsNavigator';


const Stack = createStackNavigator();

const StackNavigator = () => {

    return ( 
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Welcome" component={Welcome}/>
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="Register" component={Register}/>
            <Stack.Screen name="Home" component={BottomTabsNavigator}/>
            <Stack.Screen name="CourseDetails" component={CourseDetails}/>
        </Stack.Navigator>
     );
}
 
export default StackNavigator;