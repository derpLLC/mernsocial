import React from 'react'
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux' //Provider is gonna keep track of the store (Global State) which allows us to access the store anywhere in the App
import {createStore, applyMiddleware, compose} from 'redux'; 
import thunk from 'redux-thunk';
import App from './App'
import reducers from './reducers'
import './index.css';
const store =  createStore(reducers , compose(applyMiddleware(thunk)))

ReactDOM.render(

<Provider store={store} >
<App/></Provider>,document.getElementById('root'));
