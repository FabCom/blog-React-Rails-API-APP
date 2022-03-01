import { GET_USER } from "../actions/user.action"

const initialState = null

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload

    default:
      return state
  }
}