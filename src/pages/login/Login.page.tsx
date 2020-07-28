import * as React from 'react';
//library
import { FormControl, InputLabel, Input, FormHelperText, TextField, Button, FormControlLabel } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';

//page
import './Login.page.scss';


export function LoginPage() {

    const [state, setState] = React.useState({
        checkedA: true,
    });

    const [checked, setChecked] = React.useState(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    return (
        <div className="login">
            <img src="/access/images/bg-project.jpg" alt="" />
            <div className="login__content">
                <div className="login__logo">LOGO</div>
                <form action="" className="">
                    <h1>Sign In</h1>
                    <div className="form-user">
                        <TextField id="outlined-basic" label="Email or phone number" variant="outlined" style={{ width: '100%' }} />
                    </div>
                    <div className="form-password">
                        <TextField id="outlined-basic" label="Password" variant="outlined" style={{ width: '100%' }} />
                    </div>
                    <div className="form-submit">
                        <Button variant="contained" color="primary" style={{ width: '100%', padding: '16px' }}>
                            Sign In
                        </Button>
                    </div>

                    <div className="form-save">
                        <FormControlLabel
                            control={<Checkbox checked={state.checkedA} onChange={handleChange} name="checkedA" />}
                            label="Remember me"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
