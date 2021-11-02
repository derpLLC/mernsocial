import React, { useEffect, useState } from 'react'
import {Link, useLocation } from 'react-router-dom'
import { AppBar, Avatar, Typography, Button, Toolbar} from '@material-ui/core'
import useStyles from './styles';
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import mernSocialLogo from '../../images/MernSocial.png'
import decode from 'jwt-decode'

const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));  //Getting the user from the localStorage
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation();

    const logout = () => {
        dispatch({type:'LOGOUT'});

        history.push('/');

        setUser(null);
    };

    //console.log(user)

    useEffect(() => {
        const token = user?.token; //If token exists,store it in a variable

        //JWT....
        if(token){
            const decodedToken = decode(token);
            //Check if jwt token has expired, if so log the user out immediately
            if(decodedToken.exp * 1000 < new Date().getTime()) logout()
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
        
    }, [location])


    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        {/* <img component={Link} to="/" src={mernsocialCustomLogo} alt="icon" height="45px" /> */}
        <img component={Link} to="/"  className={classes.image} src={mernSocialLogo} alt="icon" height="60px"  />
      </Link>
        <Toolbar className={classes.toolbar}>
        {user ? (   
            <div className={classes.profile}>
                <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl} >{user?.result.name.charAt(0)}</Avatar>
                <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
                <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
            </div>
        ): (
            <Button component={Link} to="/auth" variant="contained"  color="primary">Sign In</Button>

        )}
        </Toolbar>
    </AppBar>    )
}

export default Navbar
