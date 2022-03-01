import React, { useState } from "react";
import { TextField, FormGroup, Button, Typography, Alert } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "../../actions/user.action";
import Cookies from 'js-cookie'

  
const RegisterForm = () => {

  // const [errorsForm, setErrorsForm] = useState(null)
  let navigate = useNavigate()
  const dispatch = useDispatch()
  const [errorsForm, setErrorsForm] = useState([])


  const handleSubmit = (event) => {
    event.preventDefault();
    const dataForm = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console

    const dataUserConnexion = {
      username: dataForm.get('username'),
      email: dataForm.get('email'),
      password: dataForm.get('password')
    };

    // console.log(dataUserConnexion)
    
    fetch('http://localhost:1337/auth/local/register', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataUserConnexion)
    })
    .then((response) => response.json())
    .then((response) => {
      if (response.jwt) {
        Cookies.set('user', JSON.stringify(response),{ sameSite: 'strict', expires: 365 })
        dispatch(getUser())
        navigate('/') 
      } else {
        response.message.map(messages => messages.messages.map(message => setErrorsForm([message.message])))
      }
      // console.log(response)
    })
    .catch(error => {
      console.log(error)
    });
    
    
  };


  return (
    <Box sx={{width: '100%', height:'600px', display: 'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}} component="form" onSubmit={handleSubmit}>
      <FormGroup sx={{width: '50%', display:'flex', flexDirection: 'column'}}  >
        <Typography variant='h3'>Register</Typography>
        { (errorsForm != null) ? errorsForm.map((error, index) => <Alert severity="error" key={index} >{error}</Alert>) : "" }
        <TextField sx={{marginTop: 2}} name="username" id="username" label="Name"/>
        <TextField sx={{marginTop: 2}} name ="email" id="email" label="Email"/>
        <TextField sx={{marginTop: 2}} name="password" id="password" label="Password" type="password"/>
        <Button variant="contained" color="primary" type="submit" sx={{marginTop: 2}}>Submit</Button>
      </FormGroup>
    </Box>
  )
}

export default RegisterForm