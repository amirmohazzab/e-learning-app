import React from 'react'
import { View, StyleSheet } from 'react-native'
import {Ionicons} from '@expo/vector-icons'


const Icon = ({name, size=40, backgroundColor="#fff", iconColor="fff"}) => {
    return ( 
        <View style={{width: size, height: size, 
                      borderRadius: size/2, backgroundColor,
                      justifyContent: "center", alignItems: "center"        
        }}>
            <Ionicons 
                name={name}
                color={iconColor}
                size={size}
            />
        </View>
     );
}
 
export default Icon;