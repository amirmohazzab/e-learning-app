import http from "./"

export const registerUser = async (user) => {
    try {
        return http.post(`${http.url}/auth/register`, JSON.stringify(user));
        
    } catch (err) {
        console.log(err);
    }
}


export const loginUser = async (user) => {
    try {
        return http.post(`${http.url}/auth/login`, JSON.stringify(user));

    } catch (err) {
        console.log(err);
    }
}