import React, { useState } from "react";
import { Button, Card, CardContent, CardHeader, FormGroup, TextareaAutosize, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUser } from "../../actions/user.action";
import Cookies from 'js-cookie'

const MyProfile = () => {

  const user = useSelector((state) => state.userReducer)
  
  const dispatch = useDispatch()
  const [errorsForm, setErrorsForm] = useState([])


   let username = ''
   let email = ''
   let description = ''
   let jwt = ''
   let id = null


  if (user) {
    username = user.user.username
    email = user.user.email
    description = user.user.description
    jwt = user.jwt
    id = user.user.id
  } 

  const handleSubmit = (event) => {
    event.preventDefault();
    const dataForm = new FormData(event.currentTarget);
    const dataUserConnexion = {
      username: dataForm.get('username'),
      email: dataForm.get('email'),
      description: dataForm.get('description'),
    
    };
    // console.log(dataUserConnexion)
    const url = 'http://localhost:1337/users/' + id

    fetch( url, {
      method: 'put',
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataUserConnexion)
    })
    .then((response) => response.json())
    .then((response) => {
      if (response.jwt) {
        Cookies.set('user', JSON.stringify(response),{ sameSite: 'strict', expires: 365 })
        dispatch(getUser())
      } else {
        response.message.map(messages => messages.messages.map(message => setErrorsForm([message.message])))
      }
      // console.log(response)
    })
    .catch(error => {
      console.log(error)
    });
  }

  return(
    <Box sx={{width:'100%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', marginTop:10}}>
      <Card sx={{width:'80%'}}>
        <CardHeader title={user.user.username} subheader={user.user.email}/>
        <CardContent>{user.user.description}</CardContent>
      </Card>
      <Box sx={{width: '100%', marginTop:10, display: 'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}} component="form" onSubmit={handleSubmit}>
        <FormGroup sx={{width: '50%', display:'flex', flexDirection: 'column'}}  >
          <Typography variant='h3'>Change my profile</Typography>
          <TextField sx={{marginTop: 2}} name="username" id="username" label="Name" defaultValue={username} />
          <TextField sx={{marginTop: 2}} name ="email" id="email" label="Email" defaultValue={email}/>
          <p>Description</p>
          <TextareaAutosize
            name = 'description'
            minRows={3}
            style={{ width: '100%' }}
            defaultValue={description}
          />
          <Button variant="contained" color="primary" type="submit" sx={{marginTop: 2}}>Submit</Button>
        </FormGroup>
      </Box>
    </Box>
  )
}

export default MyProfile