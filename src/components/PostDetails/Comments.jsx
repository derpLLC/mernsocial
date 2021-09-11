import React, {useState,useRef} from "react";
import { Typography,TextField,Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import useStyles from './styles'
import {commentPost} from '../../actions/posts'
import toast, { Toaster } from 'react-hot-toast';


const Comments = ({post}) => {

    //console.log(post);
    const [comments,setComments] = useState(post?.comments);
    const [comment,setComment] = useState('')

    const classes = useStyles();
     const dispatch = useDispatch()
     const user = JSON.parse(localStorage.getItem('profile'));
     
     const commentsRef = useRef();


    
     const handleComment = async () => {
        //console.log('Woo woo')
        if (!comment.trim()) {
            return toast.error("Comment cannot be empty!")
       }
        
        const finalComment = `${user.result.name}:${comment}`
        const newComments = await dispatch(commentPost(finalComment,post._id));
        
        setComments(newComments)
        toast.success('Comment made successfully!', {
         duration: 3000,
        position: 'top-right',
        })
        setComment('');

        //Scroll down to the latest comment
        commentsRef.current.scrollIntoView({behavior:"smooth"})
    }
   
    return (
        <div>
                    <Toaster  containerStyle={{
          top: 20,
          left: 20,
          bottom: 20,
          right: 20,
        }} />

            <div className={classes.commentsOuterContainer}>

                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant="h6" >Comments</Typography>
                    {comments.map((c,i) => (
                        <Typography key={i} gutterBottom variant="subtitle1">
                        <strong>{c.split(':')[0] + ' ' }</strong>
                        {c.split(':')[1]}
                        </Typography>
                    ))}
                    <div ref={commentsRef}/>
                </div>
                {user?.result?.name && (              
                <div style={{width:'70%'}}>
                  <Typography gutterBottom variant="h6">Write a Comment</Typography>
                  <TextField  fullWidth rows={4} variant="outlined" label="Comment.." value={comment} onChange={(e) => (setComment(e.target.value))} />
                  <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment.length}  variant="contained" color="primary"  onClick={handleComment}>
            Comment
          </Button>

              </div>
            )}

            </div>
        </div>
    )
}

export default Comments
