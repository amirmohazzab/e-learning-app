import http from "./"

export const fetchCourses = async () => {
    try {
        return http.get(`${http.url}/courses`)
        
    } catch (error) {
        console.log(error)
    }
    
}