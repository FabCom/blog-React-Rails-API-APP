import React, { useContext } from "react";
import { ThemeContext } from "../../ThemeContext.jsx";
import { Button } from "@mui/material";

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

export function ButtonSwitchTheme () {

  const DarkTheme = {palette: { mode: 'dark', }}

  const LightTheme = {palette: { mode: 'light', }}

  const [theme, setTheme] = useContext(ThemeContext)
    // console.log(theme)
  function ChangeTheme(){
    if (theme.palette.mode === 'light') {
      setTheme(DarkTheme)
    } else {
      setTheme(LightTheme)
    }
  }



  return (
    <Button onClick={ChangeTheme}> {theme.palette.mode === 'light' ? <Brightness4Icon sx={{color: 'text.primary'}}/> : <Brightness7Icon sx={{color: 'text.primary'}}/>}</Button>
  )
}