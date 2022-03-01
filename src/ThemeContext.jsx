import React, {createContext, useEffect, useState} from 'react'

const defaultTheme = localStorage.getItem("theme") ? JSON.parse(localStorage.getItem('theme'))[0] : {palette: { mode: 'light' }}
// localStorage.removeItem('theme')


const ThemeContext = createContext({
  Theme: {},
  setTheme: () => {}
})

const ThemeContextProvider = ({ children }) => {

  
  const theme = useState(defaultTheme)

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));

  }) 

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  )

  
}


export {ThemeContext, ThemeContextProvider}