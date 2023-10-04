import http from "./"

export const fetchCourses = async () => {
    try {
        const {data: {courses}} = await http.get(`${http.url}/courses`);
        return courses;
    } catch (error) {
        console.log(error)
    }
}