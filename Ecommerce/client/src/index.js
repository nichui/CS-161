import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "./assets/css/paper-kit.min.css";
import "./assets/css/paper-kit.css";
import "./assets/demo/demo.css";
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import 'antd/dist/antd.css';

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from "./reducers";
import Footer from "./footer"


//store
const store = createStore(rootReducer, composeWithDevTools());


ReactDOM.render(
  /*<React.StrictMode>*/
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
        <Footer />
    </Provider>,

  /*</React.StrictMode>,*/
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
