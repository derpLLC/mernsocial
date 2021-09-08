import {AUTH} from '../constants/actionTypes';
import * as Api from '../Api/index'

//REDUX  



export const signin = (formData,history) => async (dispatch) => {
    
    try {

        //Log in the user
        const {data} = await Api.signIn(formData)
        
        dispatch({type:AUTH, data});
        history.push('/');
        
    } catch (error) {
        console.error(error)
    }

}




export const signup = (formData,history) => async (dispatch) => {
    
    try {

        //Sign up the user
        const {data} = await Api.signUp(formData)
        
        dispatch({type:AUTH, data});

        
        history.push('/');
        
    } catch (error) {
        console.error(error)
    }

}
