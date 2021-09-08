import React from 'react'
import {TextField, Grid , InputAdornment, IconButton } from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

//We want some input fields to take half the width since we are generalizing the entire form input structure hence we need to pass a prop lets say half
const Input = ({half,name, label, type,handleChange ,handleShowPassword, autoFocus}) => {
    return (
        <Grid item xs={12} sm={half? 6 : 12}>
            <TextField 
                name={name}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                label={label}
                autoFocus={autoFocus}
                type={type}
                InputProps={name==='password'? {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword}>
                                {type === "password" ? <Visibility />: <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    )
                }: null}
            
            
            
            />

        </Grid>




    )
}

export default Input
