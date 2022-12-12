import axios from "axios";
const API = "http://localhost:8080";

let token = localStorage.getItem("tokenUser")
let userId = localStorage.getItem("userId")

export const postUser = async (email, password) => {
    const rest = await axios ({
        method: "POST",
        url: API + "/login",
        data: {
            email: email,
            password: password
        }
    })

    localStorage.setItem('tokenUser', rest.data.accessToken)
    token = rest.data.accessToken
    localStorage.setItem('userId', rest.data.user.id)
    userId = rest.data.user.id
    localStorage.setItem('userRole', rest.data.user.role)
    localStorage.setItem('userEmail', rest.data.user.email)
    return rest
}

export const getProducts = async () => {
    const res = await axios({
        method: "GET",
        url: API + "/products",
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + token, 
        },
    });
    return res.data
};





/* //Autenticación de usuario
const postUser = (userEmail, userPassword) => {
    return axios.post(API + "login", { email: userEmail, password: userPassword})
};

//Guarda el usuario logueado en SessionStorage
const userId = (user) => {
    sessionStorage.setItem("user", JSON.stringify(user))
};

const getUserData = () => {
    return JSON.parse(sessionStorage.getItem("user"))
};

const getToken = () => {
    return JSON.parse(sessionStorage.getItem("user"))
};

const getId = () => {
    return getUserData().user.id
};

//Petición para crear usuarios
const getUser = (user) => {
    return axios.post(API + "users", user)
};

//Petición para obtener la info de los usuarios
const infoUser = async() => {
    console.log(getToken().accessToken)
    return await axios({
      method: "GET", 
      url:API+'users', 
      headers: {
        'content-type': 'application/json',
        authorization: 'Bearer ' + getToken().accessToken,
      },         
    })     
  }

/* const getProducts = (token) => {
    return axios.get(API + "products")
};

export { postUser, userId, getUserData, getUser, getId, getToken, infoUser } */