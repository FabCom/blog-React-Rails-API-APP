import { Avatar, Card, CardContent, CardHeader, CardActions, Tooltip, Typography, Button } from "@mui/material"
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';


const Post = ({post}) => {
  const user = useSelector((state) => state.userReducer)

  return (
    <Card sx={{ minWidth: 275, marginBottom: 5 }}>
      {user != null ? <CardHeader avatar={<Tooltip title={post.user.username} ><Avatar>{post.user.username.substr(0, 2)}</Avatar></Tooltip>}/> : null}
      <CardContent>
        <Typography> {user != null ? post.content : post.content.substr(0, 60) + '...' } </Typography>
      </CardContent>
      { user == null &&
        <CardActions>
          <Button to='/login' component={Link} size="small">Se connecter</Button>
        </CardActions>
      }
    </Card>
  )
}

export default Post

