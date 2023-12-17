
import { configureStore } from '@reduxjs/toolkit';

import cartReducer from './features/cartSlice';
import coursesReducer from './features/coursesSlice';
import userReducer from './features/userSlice';

import { getAllCourses } from './features/coursesSlice';


const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    courses: coursesReducer
  }
});


store.dispatch(getAllCourses());

store.subscribe(() => console.log(store.getState()));


export default store;