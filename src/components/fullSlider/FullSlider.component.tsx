import * as React from 'react';
// Scss
import './FullSlider.component.scss';
// Interface
import { IntroFilm } from '../../core/interface/film/introFilm.interface';
// Mat
import Icon from '@material-ui/core/Icon';

export interface FullSliderProps {
    key: string;
    slider: IntroFilm;
    onOpenTrailer: (value: boolean) => void;
}

export default function FullSliderComponent(props: FullSliderProps) {
    const { slider, onOpenTrailer } = props;

    const handleOpenTrailer = () => {
        onOpenTrailer(true);
    };

    return (
        <div className="full-slider">
            <img src={slider.image} alt="" />
            <div className="full-slider__content">
                <h3>
                    {
                        slider.types.join(' / ')
                    }
                </h3>
                <div>
                    <div className="full-slider__trailer-btn" onClick={handleOpenTrailer}>
                        <Icon color="primary">play_arrow</Icon>
                        <p>Trailer</p>
                    </div>
                    <h1>{slider.name}</h1>
                </div>
                <div>
                    <h3>Buy ticket</h3>
                    <div className="full-slider__ticket-wrapper">
                        {
                            slider.timeTickets.map((item, index) =>
                                <div className="full-slider__ticket-btn" key={index}>
                                    <h3>{item}</h3>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
