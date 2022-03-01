import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { ThemeContextProvider } from "./ThemeContext.jsx";

import { Provider } from "react-redux"
import { applyMiddleware, createStore } from "redux"
import {composeWithDevTools} from "redux-devtools-extension"
import thunk from "redux-thunk"
import rootReducer from "./reducers"
import { getPosts } from './actions/post.action';
import { getUser } from './actions/user.action';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

store.dispatch(getPosts())
store.dispatch(getUser())


ReactDOM.render(
  <React.StrictMode>      
    <Provider store={store}>
      <ThemeContextProvider>
        <App sx={{backgroundColor: "background.paper"}}/>      
      </ThemeContextProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)