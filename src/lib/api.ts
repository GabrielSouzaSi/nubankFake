import axios from "axios";
export const API = axios.create({
    baseURL: "https://nodepixapi.onrender.com"
});
// export const API = axios.create({
//     baseURL: "http://192.168.100.169:3333",
//     timeout: 10000,
// });