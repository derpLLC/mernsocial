import React, { useState } from 'react'
import { Container, AppBar, Typography, Grow, Grid, Paper, TextField, Button, } from '@material-ui/core'
import { useHistory, useLocation } from 'react-router-dom';
import Posts from '../Posts/Posts';
import Form from '../Form/Form'
import { useEffect } from 'react'
import { getPosts, getPostsBySearch } from '../../actions/posts'
import toast, { Toaster } from 'react-hot-toast';


import { useDispatch } from 'react-redux'
import Pagination from '../Posts/Pagination/Pagination'
import ChipInput from 'material-ui-chip-input'
import useStyles from './styles'

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {

    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();

    const query = useQuery();
    const history = useHistory();

    const page = query.get('page') || 1
    const searchQuery = query.get('searchQuery')
    const classes = useStyles();

    const [search, setSearch] = useState('')
    const [tags, setTags] = useState([])


    // useEffect(() => {
    //     dispatch(getPosts());

    // }, [currentId, dispatch]);



    const searchPosts = () => {
        if(!search.trim() && tags.length===0){
            return toast.error("All Fields are required.");
        }
        if (search.trim() || tags) {
            //dispatch -> fetch search post
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        } else {
            history.push('/')
        }
    }

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            //search for posts
            searchPosts();
        }
    }

    const handleAdd = (tag) => {

        setTags([...tags, tag]);
    }

    const handleDelete = (tagToDelete) => {
        setTags(tags.filter((tag) => tag !== tagToDelete))
    }

    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField name="search" variant="outlined" label="Search Memories" onKeyPress={handleKeyPress} fullWidth value={search} onChange={(e) => { setSearch(e.target.value) }} />
                            <ChipInput style={{ margin: '10px 0px' }} value={tags} onAdd={handleAdd} onDelete={handleDelete} label="Search Tags" variant="outlined" />
                            <Button onClick={searchPosts} className={classes.searchButton} color="primary" variant="contained">Search</Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        {(!searchQuery && !tags.length) && (
                            <Paper elevation={6} className={classes.pagination}>
                                <Pagination page={page} />
                            </Paper>

                        )}
                    </Grid>

                </Grid>
            </Container>
        </Grow>)
}

export default Home
