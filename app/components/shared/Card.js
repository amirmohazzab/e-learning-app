import React from 'react'
import {View, StyleSheet, Image, ScrollView, TouchableHighlight} from 'react-native';
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons'; 
import {isEmpty} from "lodash";
import {useSelector} from 'react-redux'
import BestlearnText from './BestlearnText';


const Card = ({_id, title, price, image, handleSubmited, isClicked, courseInfo=null}) => {

    const user = useSelector(state => state.user);

    return ( 
        <View style={styles.card}>
            <Image resizeMode="contain" source={{uri: `https://elearnappapi.ahmohazzab.com/${image}`}} style={styles.courseImage} />
            <BestlearnText size="2" styles={styles.title}> {title} </BestlearnText>
            <View style={styles.courseDetails}>
                <BestlearnText size="2" styles={styles.title}> {price === 0 ? "Free" : price} </BestlearnText>
                <TouchableHighlight 
                  id={_id}
                  onPress={handleSubmited}
                  style={{backgroundColor: "royalblue", width: 30, height: 28}}
                > 
                  <View style={{alignSelf: "center"}}> 
                      {!isEmpty(user) && isClicked ? (
                        <Entypo name="check" size={26} color="white" />
                      ) : (
                        <MaterialCommunityIcons name="cart-variant" size={26} color="white" />
                      )}
                  </View>
                </TouchableHighlight>
            </View>
            {courseInfo ? (
              <View style={{flex: 1}}>
                <BestlearnText size="2.5">
                  Course info :
                </BestlearnText>
                <ScrollView>
                  <BestlearnText size="2" styles={styles.courseInformation}>
                    {courseInfo}
                  </BestlearnText>
                </ScrollView>
              </View>
            ) : null}
        </View>
     );
};
 
export default Card;


const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 15,
    backgroundColor: "white",
    marginBottom: 20,
  },
  courseImage: {
    width: "100%",
    height: 220
  },
  courseDetails: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  courseInformation: {
    textAlign: "justify",
    marginVertical: 10,
    lineHeight: 25,
},
  title: {
    marginBottom: 7,
    alignSelf: "center"
}
})
