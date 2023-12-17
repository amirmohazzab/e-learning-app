import React, {createContext, useEffect} from 'react'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import { useIsFocused } from "@react-navigation/native"; 
import {RFPercentage} from 'react-native-responsive-fontsize'
import {useNavigationState} from '@react-navigation/native'
import Toast from 'react-native-tiny-toast';
import {useDispatch} from "react-redux";
import { Courses, Archive} from '../screens';
import Screen from '../components/shared/Screen';
import { loadingToast } from '../utils/toast';
import { getAllCourses } from './../features/coursesSlice';


export const BestlearnContext = createContext({
    courses: [],
});


const TopTab = createMaterialTopTabNavigator();

const TopTabNavigator = ({navigation}) => {

    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    

    useEffect(() => {
       try {
            const fetchData = async () => {
            loadingToast("Loading...");
            dispatch(getAllCourses());
            Toast.hide();
        };
        fetchData();
        
       } catch (err) {
        console.log(err);
        Toast.hide();
       }
    }, []);

    return ( 
            <Screen> 
                <TopTab.Navigator 
                    initialRouteName="Courses"
                    backBehavior="none"
                    screenOptions={{
                        tabBarActiveTintColor: "red",
                        tabBarInactiveTintColor: "grey",
                        tabBarIndicatorStyle: {backgroundColor: 'red'},
                        tabBarLabelStyle: {
                            fontSize: RFPercentage(1.7),
                        },
                        tabBarPressColor: isFocused ? 'lightcyan' : 'white',
                        tabBarStyle: { backgroundColor: isFocused ? 'lightcyan' : 'white' },
                    }
                } 
                >
                    <TopTab.Screen name="Courses" component={Courses}  />
                    <TopTab.Screen name="Archive" component={Archive}  />
                </TopTab.Navigator>
                {/* {loading ? 
                <ActivityIndicator size="large" color="tomato" animating={loading} style={{ flex: 1}}/>
                : null } */}
            </Screen>    
     );
}
 
export default TopTabNavigator;