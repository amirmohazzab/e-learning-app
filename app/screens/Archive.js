import React, {useState, useEffect} from 'react'
import {Text, StyleSheet, Dimensions, View, TextInput, FlatList, TouchableOpacity} from 'react-native'
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import RadioForm from 'react-native-simple-radio-buttons';
import { SegmentedControls } from 'react-native-radio-buttons'
import { orderBy } from "lodash";
//import SelectDropdown from 'react-native-select-dropdown';
import { SelectList } from 'react-native-dropdown-select-list'
import {isEmpty} from "lodash";
import {useSelector, useDispatch} from 'react-redux'
import Screen from '../components/shared/Screen';
import Card from '../components/shared/Card';


const w = Dimensions.get('window').width;

const Archive = ({navigation}) => {

    const {courses} = useSelector(state => state.courses);
    const [courseList, setCourseList] = useState([]);
    const [filteredCourse, setFilteredCourse] = useState([]);
    useEffect(() => setCourseList(courses), [courses]);

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
    
    ///////////////// search ///////////////////////

    const [text, setText] = useState('');
   
    const searchFilter = (text) => {
      const newData = courseList.filter(item => {
        return item.title.toUpperCase().indexOf(text.toString().toUpperCase()) > -1
      });
      setFilteredCourse(newData);
      setText(text);
    }

    ////////////////// All - Buy - Free ///////////////
   
    const [type, setType] = useState("All");

    useEffect(() => {
    
      if (type === "All") {
        setFilteredCourse(courseList);
      }
      if (type === "Buy") {
        setFilteredCourse(courseList.filter((item) => item.price > 0));
      }
      if (type === "Free") {
        setFilteredCourse(courseList.filter((item) => item.price === 0));
      }
    }, [type, courseList]);

    //////// ascending - descending //////////////////////////

    const [selected, setSelected] = useState("");
    const data = [ {key:'1', value:'Ascending'}, {key:'2', value:'Descending'} ]

    const sortedPrice = () => {

      if (selected === "Ascending") {
        setFilteredCourse(orderBy(courseList, "price", "asc"));
      }
      if (selected === "Descending") {
        setFilteredCourse(orderBy(courseList, "price", "desc"));
      }
    };
    
    /////////////////// category ////////////////

    const [category, setCategory] = useState("All");

    useEffect(() => {
    
      if (category !== "All") {
        setFilteredCourse(courseList.filter((course) => course.category === category));
      } else {
        setFilteredCourse(courseList);
      }
    }, [category, courseList]);

////////////////////////////////////////
  
    return ( 
        <Screen style={styles.container}>
          <View style={styles.filter}>
            <Text style={{color: 'dodgerblue', fontSize: 20, fontWeight: "bold" }}>
                <Text style={{color: "red"}}> Programming </Text> Courses
            </Text>
            <View style={{backgroundColor: "#ccc", height: 1, marginTop: 15, marginBottom: 7}}/>
            <View style={{marginTop: 5, borderWidth: 1, borderColor: "white", height: 2*w/3}}>
              
              <TextInput 
                style={styles.input}
                placeholder=" Search ..."
                placeholderTextColor="#ccc"
                value={text}
                onChangeText={text => searchFilter(text)}
              />

              <View style={{ marginVertical: 10, borderWidth: 1, borderColor: "#ccc", height: 55, justifyContent: "center", borderRadius: 10 }}>
                    <RadioButtonGroup
                      containerStyle={{ flexDirection: "row", justifyContent: "space-around" }}
                      selected={type}
                      onSelected={(value) => setType(value)}
                      radioBackground="red"
                      radioStyle={{marginTop: 5, marginHorizontal: 2}}
                    >
                      <RadioButtonItem 
                        value="All" 
                        label={
                          <Text style={{ color: "dodgerblue" }}> All </Text>
                        }
                        />
                      <RadioButtonItem
                        value="Buy"
                        label={
                          <Text style={{ color: "dodgerblue" }}> Buy </Text>
                        }
                      />
                      <RadioButtonItem
                        value="Free"
                        label={
                          <Text style={{ color: "dodgerblue" }}> Free </Text>
                        }
                      />
                    </RadioButtonGroup>
              </View>

              <SelectList 
                onSelect={sortedPrice}
                setSelected={setSelected} 
                data={data} 
                save="value"
                boxStyles={{height: 55, borderColor: "#ccc"}} 
              />

              <View style={{ marginVertical: 10, borderWidth: 1, borderColor: "#ccc", height: 76, justifyContent: "center", borderRadius: 10 }}>
                    <RadioButtonGroup
                      containerStyle={{ flexDirection: "row", flexWrap: "wrap", padding: 10 }}
                      selected={category}
                      onSelected={(value) => setCategory(value)}
                      radioBackground="red"
                      radioStyle={{marginTop: 5, marginHorizontal: 2}}
                    >
                      <RadioButtonItem 
                        value="All" 
                        label={
                          <Text style={{ color: "dodgerblue" }}> All </Text>
                        }
                      />
                      <RadioButtonItem
                        value="Web"
                        label={
                          <Text style={{ color: "dodgerblue" }}> Web </Text>
                        }
                      />
                      <RadioButtonItem
                        value="Mobile"
                        label={
                          <Text style={{ color: "dodgerblue" }}> Mobile </Text>
                        }
                      />
                       <RadioButtonItem
                        value="Desktop"
                        label={
                          <Text style={{ color: "dodgerblue" }}> Desktop </Text>
                        }
                      />
                       <RadioButtonItem
                        value="Design"
                        label={
                          <Text style={{ color: "dodgerblue" }}> Design </Text>
                        }
                      />
                       <RadioButtonItem
                        value="Database"
                        label={
                          <Text style={{ color: "dodgerblue" }}> Database </Text>
                        }
                      />
                    </RadioButtonGroup>
              </View>
            </View>
          </View>


          <View style={{marginTop: 10, padding: 15, flex:1}}>
              <FlatList
                  data={filteredCourse}
                  keyExtractor={course => course._id.toString()}
                  renderItem={({item}) => (
                      <TouchableOpacity onPress={() => navigation.navigate('CourseDetails', {course: item})}> 
                          <Card 
                              _id = {item._id}
                              title={item.title}
                              price={item.price}
                              image={item.imageUrl}
                              handleSubmited={() => handleSubmited(item)}
                              isClicked={!isEmpty(user) && cart?.cartItems && cart?.cartItems.some(cp => cp.productId?._id === item._id)} 
                          />
                      </TouchableOpacity>
                  )}
              />
            </View>
        </Screen>
     );
};
 
export default Archive;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
  },
  filter: {
    padding: 15,
    backgroundColor: "white",
    marginHorizontal: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    height: 0.95*w,
  },
  input: {
    padding: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    height: 55,
    borderRadius: 10
  }
})

