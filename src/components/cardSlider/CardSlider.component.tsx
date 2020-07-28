import * as React from 'react';
// Scss
import './CardSlider.component.scss';
// Interface
import { IntroFilm } from '../../core/interface/film/introFilm.interface';
// Mat
import Icon from '@material-ui/core/Icon';

export interface CardSliderProps {
    key: string;
    slider: IntroFilm;
    onOpenTrailer: (url: string) => void;
}

export default function CardSliderComponent(props: CardSliderProps) {
    const { slider, onOpenTrailer } = props;

    const handleOpenTrailer = () => {
        onOpenTrailer(slider.trailerLink);
    };

    return (
        <div className="card-slider">
            <img src={slider.image} alt="" />
            <div className="card-slider__content">
                <h4>
                    {
                        slider.types.join(' / ')
                    }
                </h4>
                <h2>{slider.name}</h2>
                <div className="card-slider__detail">
                    <div className="card-slider__ticket">
                        <h4>Buy ticket</h4>
                        {
                            slider.timeTickets.map((item, index) =>
                                <div className="card-slider__ticket-btn" key={index}>
                                    <h5>{item}</h5>
                                </div>
                            )
                        }
                        <div className="clear"></div>
                    </div>
                    <div className="card-slider__btn-wrapper">
                        <div className="card-slider__btn" onClick={handleOpenTrailer}>
                            <div><Icon>play_arrow</Icon></div>
                            <p>View trailer</p>
                        </div>
                        <div className="card-slider__btn">
                            <div><Icon>play_arrow</Icon></div>
                            <p>More detail</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
