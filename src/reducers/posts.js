//What are Reducers? Reducers are functions that accepts the state and action . Similar to useState hooks. Returns the state used by the action

import { FETCH_ALL, FETCH_BY_SEARCH, CREATE, FETCH_POST, DELETE, UPDATE, START_LOADING, END_LOADING,COMMENT } from '../constants/actionTypes';

export default (state = { isLoading: true, posts: [] }, action) => {

    switch (action.type) {

        case START_LOADING:
            return { ...state, isLoading: true }

        case END_LOADING:
            return { ...state, isLoading: false }


        case UPDATE:
            return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };

        case DELETE:
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };

        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            }


        case FETCH_BY_SEARCH:
            return { ...state, posts: action.payload.data };

        case FETCH_POST:
            return { ...state, post: action.payload };

        case COMMENT:
            return{
                ...state,posts:state.posts.map((post) => {
                    //change the post which received a comment
                    if(post._id ===action.payload._id){
                        return action.payload;
                    }
                    //return all the other posts normally..
                    return post;
                })
            }

        case CREATE:
            return { ...state, posts: [...state.posts, action.payload] };

        default:
            return state;
    }


}