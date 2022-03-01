import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import { ButtonSwitchTheme } from "./btn_changeThemeContext";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar } from "@mui/material";
import { Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import Cookies from 'js-cookie'
import { useDispatch } from "react-redux";
import { getUser } from "../../actions/user.action";
import LoginIcon from '@mui/icons-material/Login';
import LanguageIcon from '@mui/icons-material/Language';


export const Navbar = (props) => {

    const user = useSelector((state) => state.userReducer)
    const dispatch = useDispatch()
    
    const items = [{id: 1, path:'/', text:'Accueil'}]

    const [settings, setSettings] = useState([{id: 1, path:'/login', text:'se connecter'}, {id: 2, path:'/register', text:"s'enregistrer"}])

    const [anchorElNav, setAnchorElNav] = React.useState(null)
    const [anchorElUser, setAnchorElUser] = React.useState(null)

    const settingsForUserConnected = () => setSettings([{id: 1, path:'/myprofile', text:'profile'}])
    const settingsForNonUser = () => setSettings([{id: 1, path:'/login', text:'se connecter'}, {id: 2, path:'/register', text:"s'enregistrer"}])
    
    useEffect(() => {    
      if (user != null ){
        settingsForUserConnected()
      } else {
        settingsForNonUser()
      }
     }, [user]);


    function DisconnectUser () {
      Cookies.remove('user');handleCloseUserMenu()
      dispatch(getUser())
    }
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };

  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };

    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    return (


      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" >
          <Toolbar disableGutters>
            <LanguageIcon sx={{marginLeft:5}}/>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {items.map(item => (
                    <Button to={item.path} key={item.id} component={Link} variant="h6" sx={{ m: 2, display: 'block', underline: 'none' }} onClick={handleCloseNavMenu} > 
                      {item.text} 
                    </Button>
                ))}          
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
              PWIPPER
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {items.map((item) => (
                <Button to={item.path} key={item.id} component={Link} variant="h6" sx={{ m: 2, display: 'block', underline: 'none' }} onClick={handleCloseNavMenu} > 
                  {item.text} 
                </Button>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Connexion">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar>{(user!= null) ? user.user.username.substr(0, 2) : <LoginIcon/> }</Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <Button to={setting.path} key={setting.id} component={Link} variant="h6" sx={{ m: 2, display: 'block', underline: 'none' }} onClick={handleCloseUserMenu} > 
                   {setting.text} 
                  </Button>
                ))}
                {(user != null) ? 
                <Button variant="h6" sx={{ m: 2, display: 'block', underline: 'none' }} onClick={() => DisconnectUser()} > 
                   Se déconnecter
                </Button>
                :
                null
                }
              </Menu>
            </Box>
            <ButtonSwitchTheme/>
           </Toolbar>
        </AppBar>
      </Box>
    );
}