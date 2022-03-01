import React from "react";
import {Box, Container} from "@mui/material"
import { PageTitle } from "../../components/titles/PageTitle";
import { useSelector } from "react-redux";
import Post from "../../components/post/index"
import AddPost from "../../components/post/addPost";


const Home = (props) => {

  const posts = useSelector((state) => state.postReducer)
  const user = useSelector((state) => state.userReducer)
  // console.log(posts)



    return (
      <Box>
      <PageTitle title='Bienvenue sur Pwipper'/>
      {user && <AddPost/>}
      <Container>
        {posts.map((post, index) => <Post post={post} key={index}/>)}
      </Container>
      </Box>
    );
}

export default Home;