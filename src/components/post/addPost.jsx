import { Button, FormGroup, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/post.action";

const AddPost = () => {

  const user = useSelector((state) => state.userReducer)
  const [text, setText] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault();
    const dataForm = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console

    const jwt = user.jwt
    const dataPost = {
      text: dataForm.get('text'),
      user: user.user.id
    };

    // console.log(dataUserConnexion)
    
    fetch('http://localhost:1337/posts', {
      method: 'post',
      headers: {
        'Authorization': `Bearer ${jwt}`, 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataPost)
    })
    .then((response) => response.json())
    .then((response) => {
      if (response) {
        dispatch(getPosts())
      }
      // console.log(response)
    })
    .catch(error => {
      console.log(error)
    });
    
    setText('')
  };

  const onTextChange = (event) => {
    setText(event.target.value)

  }

  return (
    <Box sx={{width: '100%', display: 'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', marginBottom: 10}} component="form" onSubmit={handleSubmit}>
      <FormGroup sx={{width: '50%', display:'flex', flexDirection: 'column'}}  >
        <Typography variant='h5'>Nouveau message</Typography>
        <TextField sx={{marginTop: 2}} name="text" id="text" label="text" value={text} onChange={onTextChange}/>
        <Button variant="contained" color="primary" type="submit" sx={{marginTop: 2}}>Submit</Button>
      </FormGroup>
    </Box>
  )
}

export default AddPost