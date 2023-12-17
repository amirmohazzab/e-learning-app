import React, {useState} from 'react'
import {StyleSheet} from 'react-native'
import {RFPercentage} from 'react-native-responsive-fontsize'
import {isEmpty} from "lodash";
import {useSelector, useDispatch} from "react-redux";
import Screen from '../components/shared/Screen';
import Card from '../components/shared/Card';
import { addToBasket } from '../features/cartSlice';


const CourseDetails = ({navigation, route}) => {

    if (!route.params.course) return null;

    navigation.setOptions({
      headerShown: true, 
      title: `${route.params.course.title} course`,
      headerTitleStyle: {
        fontSize: RFPercentage(3),
        color: "white"
      },
      headerStyle: {
        backgroundColor: "tomato"
      }
    });

    const user = useSelector(state => state.user);
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const [isClicked, setIsClicked] = useState(false);
    
    
    const handleSubmited = (item) => {
        if (!isEmpty(user)) {
            dispatch(addToBasket(item._id));
        }else{
            navigate.navigate("login");
        }
    };

    const {_id, title, price, imageUrl} = route.params.course;

    const courseInfo = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi cursus eu orci sit amet ullamcorper. Nulla at dignissim sem, eu ullamcorper tellus. Vestibulum vel lobortis lorem, quis congue dolor. Aliquam aliquam turpis nec lectus imperdiet pharetra. Aliquam felis tortor, convallis vestibulum ligula nec, pellentesque porttitor enim. Morbi vitae justo in mi pretium aliquet. Aliquam erat volutpat.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi cursus eu orci sit amet ullamcorper. Nulla at dignissim sem, eu ullamcorper tellus. Vestibulum vel lobortis lorem, quis congue dolor. Aliquam aliquam turpis nec lectus imperdiet pharetra. Aliquam felis tortor, convallis vestibulum ligula nec, pellentesque porttitor enim. Morbi vitae justo in mi pretium aliquet. Aliquam erat volutpat. 
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi cursus eu orci sit amet ullamcorper. Nulla at dignissim sem, eu ullamcorper tellus. Vestibulum vel lobortis lorem, quis congue dolor. Aliquam aliquam turpis nec lectus imperdiet pharetra. Aliquam felis tortor, convallis vestibulum ligula nec, pellentesque porttitor enim. Morbi vitae justo in mi pretium aliquet. Aliquam erat volutpat.`

    return ( 
        <Screen style={styles.container}>
            <Card
              _id={_id}
              title={title}
              price={price}
              image={imageUrl} 
              courseInfo={courseInfo}
              handleSubmited={() => handleSubmited(route.params.course)}
              isClicked={!isEmpty(user) && cart?.cartItems && cart?.cartItems.some(cp => cp.productId?._id === _id)} 
            />
        </Screen>
     );
};
 
export default CourseDetails;


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: "#f8f4f4"
  }
})
