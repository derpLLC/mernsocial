import React,{useState} from 'react';
import useStyles from './styles';
import {useDispatch} from 'react-redux';
import {Card , CardActions, CardContent, CardMedia , Button , Typography , ButtonBase} from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment' ; //moment is used for generating timestamps easily
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import { useHistory } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';


import {deletePost, likePost,getPosts} from '../../../actions/posts';

const Post = ({post, setCurrentId}) => {
    
    const classes = useStyles();
    const dispatch = useDispatch();


    const user = JSON.parse(localStorage.getItem('profile'));
    const userID = user?.result.googleId || user?.result?._id;
    const history = useHistory()
    const openPost = () => history.push(`/posts/${post._id}`)


    const [likes,setLikes] = useState(post?.likes);

   
    const hasLikedPost = post.likes.find((like) => like === (userID))


    const handleLike = async() => {
      console.log('Post liked!')
      dispatch(likePost(post._id))
      //Check if the current user has liked the post
      if(hasLikedPost){
        setLikes(post.likes.filter((id) => id!== (userID)))
      }
      else{
        setLikes([...post.likes,userID]);
      }
    
    }
    


    const Likes = () => {
        if(likes.length > 0) {
          return likes.find((like) => like === (userID))
            ? (
              <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
      };


      //console.log('Image url ', post.selectedFile)
    
      return (
        <>

        <Toaster  containerStyle={{
          top: 20,
          left: 20,
          bottom: 20,
          right: 20,
        }} />
        <Card className={classes.card} raised elevation={6}>

          <ButtonBase
            component="span"
            name="test"
            className={classes.cardAction}
            onClick={openPost}
          >
            <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
            
            <div className={classes.overlay}>
              <Typography variant="h6">{post.name}</Typography>
              <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
            <div className={classes.overlay2} name="edit">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentId(post._id);
                }}
                style={{ color: 'white' }}
                size="small"
              >
                <MoreHorizIcon fontSize="medium" />
              </Button>
            </div>
            )}
            <div className={classes.details}>
              <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">{post.message.split(' ').splice(0, 20).join(' ')}...</Typography>
            </CardContent>
          </ButtonBase>
          <CardActions className={classes.cardActions}>
            <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
              <Likes />
            </Button>
            {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
              <Button size="small" color="secondary" onClick={() => {
                toast.success('Deleting Post... It may take some seconds.', { duration: 2000,
                  position: 'top-right'});
                dispatch(deletePost(post._id)).then(() => {
                  toast.success('Post Deleted successfully!',{ duration: 2000,
                    position: 'top-right', icon: '👏',
                    // Change colors of success/error/loading icon
                    iconTheme: {
                      primary: '#09BE53',
                      secondary: '#BE0974',
                    },});

                }) 
    
        
              
              }}>
                <DeleteIcon fontSize="small" /> &nbsp; Delete
              </Button>
            )}
          </CardActions>
        </Card>
        </>
      );
    };
    
export default Post;

