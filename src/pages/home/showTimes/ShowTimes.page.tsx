import * as React from 'react';
// Scss
import './ShowTimes.page.scss';
// Mat
import { Icon } from '@material-ui/core';

// Interface
import { IntroFilm } from '../../../core/interface/film/introFilm.interface';
// Data
import { introFilmData } from '../../../core/interface/film/introFirm.data';
// Component
import { TrailerDialogComponent } from '../../../components/trailerDialog/TrailerDialog.component';
import CardSliderComponent from '../../../components/cardSlider/CardSlider.component';

export interface ShowTimesPageProps {
}

export interface ShowTimesPageState {
    properties: IntroFilm[];
    property: IntroFilm;
    openTrailer: boolean;
    urlTrailer: string;
}

export default class ShowTimesPage extends React.Component<ShowTimesPageProps, ShowTimesPageState> {

    constructor(props: ShowTimesPageProps) {
        super(props);

        this.state = {
            properties: introFilmData,
            property: introFilmData[0],
            openTrailer: false,
            urlTrailer: ''
        }
    }

    nextProperty = () => {
        const newIndex = this.state.property.index === this.state.properties.length - 1 - 3 ? 0 : this.state.property.index + 1;
        this.setState({ property: this.state.properties[newIndex] });
    }

    prevProperty = () => {
        const newIndex = this.state.property.index === 0 ? this.state.properties.length - 1 - 3 : this.state.property.index - 1;
        this.setState({ property: this.state.properties[newIndex] });
    }

    handleOpenTrailer = (trailerUrl: string) => {
        this.setState({ openTrailer: true, urlTrailer: trailerUrl });
    };

    handleCloseTrailer = () => {
        this.setState({ openTrailer: false, urlTrailer: '' });
    };

    render() {
        const { properties, property, openTrailer, urlTrailer } = this.state;
        return (
            <div className="showtimes">
                <div className="showtimes__slider"
                    style={{
                        'transform': `translateX(-${property.index * (100 / properties.length)}%)`
                    }}
                >
                    {
                        properties.map(property => <CardSliderComponent key={property._id} slider={property} onOpenTrailer={this.handleOpenTrailer}></CardSliderComponent>)
                    }
                </div>
                <div className="showtimes__control">
                    <div>
                        <button onClick={this.prevProperty}>
                            <Icon fontSize="small">skip_previous</Icon>
                        </button>
                    </div>
                    <div>
                        <button onClick={this.nextProperty}>
                            <Icon fontSize="small">skip_next</Icon>
                        </button>
                    </div>
                </div>
                <TrailerDialogComponent open={openTrailer} trailerUrl={urlTrailer} onClose={this.handleCloseTrailer}></TrailerDialogComponent>
            </div>
        );
    }
}
