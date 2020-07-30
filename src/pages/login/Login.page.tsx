import * as React from 'react';
import { Route, NavLink } from "react-router-dom";
//library
import { FormControl, InputLabel, Input, FormHelperText, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
//page_scss
import './Login.page.scss';


export function LoginPage() {
    const [checked, setChecked] = React.useState(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    let [stateLogin, setStateLogin] = React.useState({
        values: {
            user: "",
            passWord: "",
        },
        errors: {
            user: "",
            passWord: "",
        }
    })
    const handleChangInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(stateLogin);
        let {value, name} = event.target;
        let stateError:string= "";
        let checkInput = () => {
            switch (name) {
                case "user":
                    if (value === "") { stateError = "(*) Please enter user"; return true;}
                    else if (value.indexOf(' ') !== -1) { stateError = "(*) The user can't have spaces"; return true;}
                    else if (value.length <= 6 || value.length >= 20) { stateError = "(*) The user must not be less than 6 characters and exceed 20 characters"; return true;}
                    return false;
                case "passWord":
                    if (value === "") { stateError = "(*) Please enter password"; return true;}
                    else if (value.indexOf(' ') !== -1) { stateError = "(*) The password  can't have spaces"; return true;}
                    else if(value.length <= 6) { stateError = "(*) The password must not be less than 6 characters"; return true;}
                    return  false;
                default: stateError = "(*) Please enter user and password"; return true;
            }
        }
        let newValues = {
            ...stateLogin.values,
            [name]: value,
        };
        let newErrors = {
            ...stateLogin.errors,
            [name]: checkInput() === true ? stateError : "",
        };
        setStateLogin({ values: newValues, errors: newErrors });
    }

    return (
        <div className="login">
            <img src="/access/images/bg-project.jpg" alt="" />
            <div className="login__content">
                <div className="login__logo">LOGO</div>
                <form action="" className="">
                    <h1>Sign In</h1>
                    <div className="form-user">
                        <TextField id="outlined-basic" label="Email or phone number" variant="outlined" style={{ width: '100%' }} name="user" onChange={handleChangInput} />
                        <span className="text-danger">{stateLogin.errors.user}</span>
                    </div>
                    <div className="form-password">
                        <TextField id="outlined-basic" label="Password" variant="outlined" style={{ width: '100%' }} name="passWord" onChange={handleChangInput} />
                        <span className="text-danger">{stateLogin.errors.passWord}</span>
                    </div>
                    <div className="form-submit">
                        <Button variant="contained" color="primary" style={{ width: '100%', padding: '16px' }}>
                            Sign In
                        </Button>
                    </div>
                    <div className="form-save">
                        <FormControlLabel
                            control={
                                <Checkbox
                                checked={checked}
                                onChange={handleChange}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                            }
                            label="Remember me"
                        />   
                    </div>
                    <div className="form-register" style={{color:'black'}}>
                        New to Cinema?    
                        <NavLink className="nav-link" to="/register">
                            Sign up now.
                        </NavLink>
                    </div>
                </form>
                
            </div>
        </div>
    );
}
