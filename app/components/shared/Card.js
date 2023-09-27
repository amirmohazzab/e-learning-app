import React from 'react'
import {View, StyleSheet, Image, ScrollView} from 'react-native'
import BestlearnText from './BestlearnText';


const Card = ({title, price, image, courseInfo=null}) => {
    return ( 
        <View style={styles.card}>
            <Image resizeMode="contain" source={image} style={styles.courseImage} />
            <View style={styles.courseDetails}>
                <BestlearnText size="2" styles={styles.title}> {title} </BestlearnText>
                <BestlearnText size="2" styles={styles.title}> {price} </BestlearnText>
            </View>
            {courseInfo ? (
              <View>
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
    borderRadius: 15,
    backgroundColor: "white",
    marginBottom: 20,
    overflow: "hidden",
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
