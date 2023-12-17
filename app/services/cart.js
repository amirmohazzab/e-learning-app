import http from './';


export const getCart = () => {
    return http.get(`${http.url}/customer/cart`);
};

export const addToCart = (courseId) => {
    return http.post(`${http.url}/customer/cart/${courseId}`);
};


export const deleteFromCart = (courseId) => {
    return http.delete(`${http.url}/customer/cart/${courseId}`);
};

export const deleteFromCartMulti = (courseId) => {
    return http.delete(`${http.url}/customer/cart/multi/${courseId}`);
};

export const clearCart = () => {
    return http.delete(`${http.url}/customer/cart`);
};


