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
        <Dialog style={{ overflowY: 'hidden' }} maxWidth="xl" onClose={handleClose} aria-labelledby="simple-dialog-title" open={props.open}>
            <div className="video-container video-background" >
                <div className="video-foreground">
                    <iframe
                        width="900" height="500"
                        src={props.trailerUrl + '?start=10&autoplay=1;mute=0;controls=0;'}
                        allow='autoplay; encrypted-media'
                        frameBorder="0"
                        allowFullScreen
                    />
                </div>
            </div>

        </Dialog>
    );
}
