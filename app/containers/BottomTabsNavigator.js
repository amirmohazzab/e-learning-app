import React, {useEffect} from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { useSelector, useDispatch } from 'react-redux';
import Account from '../screens/Account';
import MyCourses from '../screens/MyCourses';
import TopTabNavigator from './TopTabNavigator';
import { getBasket } from '../features/cartSlice';



const Tab = createBottomTabNavigator();

const BottomTabsNavigator = () => {

  const cart = useSelector(state => state.cart);
  const amount = cart.totalQTY;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBasket());
  }, []);

    return ( 
      <Tab.Navigator 
        initialRouteName="Courses"
        screenOptions={({route}) => ({
          tabBarIcon : ({focused, color, size}) => {
            let iconName;

            if (route.name === "Courses") {
              iconName = "school";
            } else if (route.name === "Account") {
              iconName = focused ? "account-circle" : "account-circle-outline";
            } else if (route.name === "MyCourses") {
              iconName = "message-video"
            }

            return (
              <MaterialCommunityIcons 
                name={iconName}
                size={size}
                color={color}
              />
            );
          },
          headerShown: false,
         
        })}
        tabBarOptions= {{
          activeTintColor: "tomato",
          inactiveTintColor: "grey",
          activeBackgroundColor: "lightcyan",
          tabBarLabel: {
            fontSize: 16
          }
        }}     
      >
        <Tab.Screen name="Account" component={Account} />
        <Tab.Screen name="Courses" component={TopTabNavigator} />
        <Tab.Screen name="MyCourses" component={MyCourses} 
          options={{
            tabBarLabel: "My Courses",
            tabBarBadge: amount,
          }}
        />
      </Tab.Navigator>
    );
  };

  export default BottomTabsNavigator;