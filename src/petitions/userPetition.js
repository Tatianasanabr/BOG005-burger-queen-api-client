import axios from "axios";

const API = "http://localhost:8080/";

//Autenticación de usuario
const postUser = (userEmail, userPassword) => {
    return axios.post(API + "login", { email: userEmail, password: userPassword})
};

const getProducts = (productName, productPrice) => {
    return axios.post(API + "products", { name: productName, price: productPrice })
}

//Usuario en el sesionStorage
/* const getUser = () => {
    return JSON.parse(sessionStorage.getItem("user"))
}; */

//Token del usuario
/* const getToken = () => {
    return getUser().accessToken
}; */

//Listado de productos
/* const getProducts = () => {
    return axios.get(API + "products", { headers: {authorization: "Bearer" + getToken() }})
}; */

export { postUser, getProducts }
