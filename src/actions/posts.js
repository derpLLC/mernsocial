import {FETCH_ALL ,FETCH_BY_SEARCH, CREATE , DELETE, UPDATE , START_LOADING,END_LOADING, FETCH_POST,COMMENT} from '../constants/actionTypes';
import * as Api from '../Api/index'


//Action Creators -> Functions which return actions

export const getPosts = (page) => async (dispatch) => { //Double arrow function due to redux thunk. Allows us to pass a function as a parameter
    
    try {

        dispatch({type:START_LOADING})

        const {data} = await Api.fetchPosts(page);

//       console.log(data);

        //Using redux to accomplish loading states


        dispatch({type:FETCH_ALL, payload:data})
        
        dispatch({type:END_LOADING})
    }
    catch(error){
        console.log(error)
    }
    

    
}

export const getPost = (id) => async(dispatch) => { 
    try {

        dispatch({type:START_LOADING})

        const {data} = await Api.fetchPost(id);


        //Using redux to accomplish loading states


        dispatch({type:FETCH_POST, payload:data})
        
        dispatch({type:END_LOADING})
    }
    catch(error){
        console.log(error)
    }
    

}


export const getPostsBySearch = (searchQuery) =>  async(dispatch) => {
    try {

        
        dispatch({type:START_LOADING})

        const { data: { data } } = await Api.fetchPostsBySearch(searchQuery);
        dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
        dispatch({type:END_LOADING})

        //console.log(data);


    } catch (error) {
        console.log(error);
    }
    
}


export const createPost = (post,history) => async(dispatch) => {

    try {
        dispatch({type:START_LOADING})

        const {data} = await Api.createPost(post);
        
        dispatch({type:CREATE, payload:data})

        history.push(`/posts/${data._id}`);

        dispatch({type:END_LOADING})

    } catch (error) {
        
        console.log(error)
    }
}


export const updatePost = (id,post) => async(dispatch) => {

    try{

        const {data} = await Api.updatePost(id,post);

        dispatch({type:UPDATE, payload:data})
    }
    catch(error)
    {
        console.log(error)
    }
}


export const deletePost = (id, post) => async(dispatch) => {

    try{

        await Api.deletePost(id);
       dispatch({type:DELETE ,payload:id}); 


    }
    catch(error)
    {
        console.log(error);
    }
}

export const likePost = (id) => async(dispatch) => {

    try{

        const {data} = await Api.likePost(id);

        dispatch({type:UPDATE, payload:data})
    }
    catch(error)
    {
        console.log(error)
    }



}


export const commentPost = (value, id) => async(dispatch) => {
    try {
    const {data} = await Api.comment(value,id)

    dispatch({type:COMMENT,payload:data}) 
    
    return data.comments

    } catch (error) {
        
    }
}

