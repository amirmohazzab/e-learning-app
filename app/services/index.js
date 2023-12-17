import axios from 'axios'

const url = "https://elearnappapi.ahmohazzab.com";

axios.defaults.headers.post["Content-Type"] = "application/json";

export default {
    get: axios.get,
    post: axios.post,
    delete: axios.delete,
    put: axios.put,
    url,
}
 
