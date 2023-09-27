import React from 'react'
import {RFPercentage} from 'react-native-responsive-fontsize'
import {Text} from 'react-native'


const BestLearnText = ({size, children, styles, color="#000"}) => {
    return ( 
        <Text style={[{fontSize: RFPercentage(size), color}, styles]}>
            {children}
        </Text>
     );
}
 
export default BestLearnText;