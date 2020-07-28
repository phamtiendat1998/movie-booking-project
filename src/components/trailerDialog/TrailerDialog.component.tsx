import * as React from 'react';
// Scss
import './TrailerDialog.component.scss';
// Mat
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

export interface TrailerDialogComponentProps {
    open: boolean;
    trailerUrl: string;
    onClose: () => void;
}

export function TrailerDialogComponent(props: TrailerDialogComponentProps) {
    const handleClose = () => {
        props.onClose();
    };

    return (
        <Dialog maxWidth="xl" onClose={handleClose} aria-labelledby="simple-dialog-title" open={props.open}>
            <iframe width="900" height="500" src={props.trailerUrl}>
            </iframe>
        </Dialog>
    );
}
