import React ,{useState, useEffect }from 'react';
import useStyles from './styles';
import {TextField, Button, Typography, Paper} from '@material-ui/core'
import FileBase from  'react-file-base64'
import { useHistory } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux'
import { createPost } from '../../actions/posts';
import { updatePost } from '../../actions/posts';
import toast, { Toaster } from 'react-hot-toast';


//GET THE CURRENT ID OF THE POST WE ARE ON 

const Form = ({currentId, setCurrentId}) => {

  const [postData, setPostData] = useState({  title: '', message: '', tags: [], selectedFile: '' });
  const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();


    useEffect(() => {
      if (!post?.title) clear();

      if(post)
      setPostData(post);
    }, [post]);



    const handleSubmit =  async (e) => {
        e.preventDefault();
        if (
          postData.title === "" ||
          postData.message === "" ||
          postData.tags === "" ||
          postData.selectedFile === ""
        ) {
         return toast.error("All Fields are required.");
        }


        
        if(currentId){
          dispatch(updatePost(currentId,{...postData, name:user?.result?.name})).then(() => {
            toast.success("Post Updated Successfully!")
            console.log('Post successfully updated!');
  
          });

        }
        else{
         dispatch(createPost({...postData, name:user?.result?.name},history));
 
        }
        clear();

        

    }
    //Clearing the data on the form 
    const clear = () => {

      setCurrentId(null);
      setPostData({ title: '' , message: '',  tags: [], selectedFile: ''});


    };

    if(!user?.result?.name){
      return(
        <Paper className={classes.paper} >
          <Typography variant="h6" align="center" >

            Please Sign In to create your own memories and like other's memories

          </Typography>

        </Paper>
      )
    }


    const handleAddChip = (tag) => {

     // console.log('Tags on Chip add : ', tag);
      setPostData({ ...postData, tags: [...postData.tags, tag] });
    };
  
    const handleDeleteChip = (chipToDelete) => {
      //console.log('Tags on Chip add : ', chipToDelete);

      setPostData({ ...postData, tags: postData.tags.filter((tag) => tag !== chipToDelete) });
    };
  

    //console.log('Post tags : ', postData.tags);


    return (
<Paper className={classes.paper} elevation={6}>
<Toaster  containerStyle={{
          top: 20,
          left: 20,
          bottom: 20,
          right: 20,
        }} />

    <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
      <Typography variant="h6">{currentId? 'Editing' : 'Creating'} a Memory</Typography>
      <TextField name="title" variant="outlined" label="Title" fullWidth  value={postData.title} onChange={(e) => setPostData({...postData, title: e.target.value})}/>
      <TextField name="message" variant="outlined" label="Message" fullWidth multiline  value={postData.message} onChange={(e) => setPostData({...postData, message: e.target.value})}/>
      <div style={{ padding: '5px 0', width: '94%' }}>
          <ChipInput
            name="tags"
            variant="outlined"
            placeholder="Press enter after every tag"
            label="Tags"
            fullWidth
            value={postData.tags}
            onAdd={(chip) => handleAddChip(chip)}
            onDelete={(chip) => handleDeleteChip(chip)}
          />
        </div>



      <div className={classes.fileInput} >
        <FileBase
        type="file"
        multiple={false}
        onDone={({base64}) => setPostData({...postData, selectedFile:base64})}
        />
      </div>
      <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth >Submit</Button>
      <Button  variant="contained" color="secondary" size="small" onClick={clear} fullWidth >Clear</Button>

    </form>
</Paper>    
    );
}

export default Form;

