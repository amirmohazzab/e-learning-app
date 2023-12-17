import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './app/containers/StackNavigator';
import AnimatedSplash from 'react-native-animated-splash-screen';
import {Provider} from 'react-redux'
import store from './app/store';


const App = () => {

  const [isReady, setIsReady] = useState(false);

  useEffect(()=>{
    setTimeout(()=>{
      setIsReady(true);
    }, 2000)
  }, []);

  return (
    <AnimatedSplash
      translucent={true}
      isLoaded={isReady}
      logoImage={require("./app/assets/logo.png")}
      backgroundColor={"#262626"}
      logoHeight={250}
      logoWidth={250}
    > 
      <NavigationContainer>
        <Provider store={store}> 
          <StackNavigator />
        </Provider>
      </NavigationContainer>
    </AnimatedSplash>
   
  );
};

export default App;
