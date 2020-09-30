import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import * as React from 'react';
import { postAddMovie } from '../../core/services/movieManager.service';

export interface FormDialogComponentProps {
    open: boolean;
    onClose: () => void;
}

export function FormDialogComponent(props: FormDialogComponentProps) {

    let [dataSubmit, setDataLogin] = React.useState({
        values: {
            _id: 0,
            name: "",
            penName: "",
            trailerLink: "",
            image: "",
            description: "",
            dateRelease: "",
            rate: 0,
        }
    })
    const handleClose = () => {
        props.onClose();
    };

    const handleChangInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        let { value, name } = event.target;
        let newValues = {
            ...dataSubmit.values,
            [name]: value,
        };
        setDataLogin({ values: newValues });
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        postAddMovie(dataSubmit.values)
            .then(res => {
                alert("Add movie successful");
                window.location.reload();
            })
            .catch(err => console.log({ ...err }))
    }

    return (
        <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add movie</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="_id"
                    label="ID"
                    fullWidth
                    onChange={handleChangInput}
                />
                <TextField
                    margin="dense"
                    name="name"
                    label="Name"
                    fullWidth
                    onChange={handleChangInput}
                />
                <TextField
                    margin="dense"
                    name="penName"
                    label="Penname"
                    fullWidth
                    onChange={handleChangInput}
                />
                <TextField
                    margin="dense"
                    name="trailerLink"
                    label="Trailer"
                    fullWidth
                    onChange={handleChangInput}
                />
                <TextField
                    margin="dense"
                    name="image"
                    label="Image"
                    fullWidth
                    onChange={handleChangInput}
                />
                <TextField
                    margin="dense"
                    name="description"
                    label="Describe"
                    fullWidth
                    onChange={handleChangInput}
                />
                <TextField
                    margin="dense"
                    name="dateRelease"
                    label="DateRelease"
                    fullWidth
                    onChange={handleChangInput}
                />
                <TextField
                    margin="dense"
                    name="rate"
                    label="Rate"
                    fullWidth
                    onChange={handleChangInput}
                />

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
          </Button>
                <Button onClick={handleSubmit} color="primary">
                    Submit
          </Button>
            </DialogActions>
        </Dialog>
    );
}