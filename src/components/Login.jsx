import "./App.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { postUser } from "../petitions/userPetition";

const Login = () => {

  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("")
  const [userPassword, setUserPassword] = useState("")

  const handleChangeEmail = (event) => {
    setUserEmail(event.target.value)
  }

  const handleChangePassword = (event) => {
    setUserPassword(event.target.value)
  }

  const userAuth = (event) => {
    event.preventDefault()

    console.log(userEmail);
    console.log(userPassword);

    postUser(userEmail, userPassword)
      .then((response) => {
        console.log(response)

        const errorMessage = document.getElementById("errorMessage")
        errorMessage.innerHTML = "";

        if (response.post.user.role === "mesero") {
        console.log('Tienes acceso', 35)
        navigate('/');
        }
      })
      .catch((error) => {
        //console.log(error)
        if (error.response.post === 'Incorrect password') {
          //console.log('Contraseña incorrecta')
          //errorMessage.innerHTML = 'Contraseña incorrecta';
        }
        else {
          //console.log('Usuario no encontrado')
          //errorMessage.innerHTML = 'Usuario no encontrado';
        }
      })
  } 




  /*const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
  };*/

  return (
    <form onClick={userAuth} className='login'>
      <div className='form-container'>
        <input
          type='email'
          placeholder='Correo'
          name='username'
          value={userEmail}
          onChange={handleChangeEmail}
        />
        <input
          type='password'
          placeholder='Contraseña'
          name='pass'
          value={userPassword}
          onChange={handleChangePassword}
        />
        <p id="errorMessage"></p>
        <div className='buttons-container'>
        <button className='btn-start' onClick={() => navigate("/")}>REGRESAR</button> 
        <button className='btn-return' onClick={() => navigate("/Admin")}>INGRESAR</button>
        </div>
      </div>
    </form>
  );
};

export default Login;
