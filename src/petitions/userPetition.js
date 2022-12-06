import axios from "axios";

const API = "http://localhost:8080/";

//Autenticación de usuario
const postUser = (userEmail, userPassword) => {
    return axios.post(API + "login", { email: userEmail, password: userPassword})
}

//Usuario alojado en el session storage
const getUser = () => {
    return JSON.parse(sessionStorage.getItem("user"))
}

//Token de cada usuario
const token = () => {
    return getUser().accessToken
}

//Petición para traer lista de productos
const getProduct = () => {
    return axios.get(API + "products", { Authorization: "Bearer" + token()})
}

export { postUser, getUser, token, getProduct }
