import Cookies from 'js-cookie'

export const GET_USER = "GET_USER"

export const getUser = () => {
  return (dispatch) => {
    const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null
    dispatch({type: GET_USER, payload: user})
  }
}