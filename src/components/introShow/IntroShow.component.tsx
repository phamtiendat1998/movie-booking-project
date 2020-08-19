import * as React from 'react';
// Scss
import './IntroShow.component.scss';

export interface IntroShowComponentProps {
    trailerUrl: string;
}

export function IntroShowComponent(props: IntroShowComponentProps) {
    return (
        <div className="video-background" >
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

    );
}
