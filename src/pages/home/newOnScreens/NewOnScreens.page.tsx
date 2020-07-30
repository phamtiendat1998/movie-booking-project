import * as React from 'react';
// Scss
import './NewOnScreens.page.scss';
// Data
import { introFilmData } from '../../../core/interface/film/introFirm.data';
// Interface
import { IntroFilm } from '../../../core/interface/film/introFilm.interface';
// Mat
import Icon from '@material-ui/core/Icon';
// Component
import FullSliderComponent from '../../../components/fullSlider/FullSlider.component';
import { TrailerDialogComponent } from '../../../components/trailerDialog/TrailerDialog.component';

export interface NewOnScreensPageProps {
}

export interface NewOnScreensPageState {
    properties: IntroFilm[];
    property: IntroFilm;
    openTrailer: boolean;
}

export default class NewOnScreensPage extends React.Component<NewOnScreensPageProps, NewOnScreensPageState> {
    constructor(props: NewOnScreensPageProps) {
        super(props);
        this.state = {
            properties: introFilmData,
            property: introFilmData[0],
            openTrailer: false
        }
    }

    nextProperty = () => {
        const newIndex = this.state.property.index === this.state.properties.length - 1 ? 0 : this.state.property.index + 1;
        this.setState({ property: this.state.properties[newIndex] });
    }

    prevProperty = () => {
        const newIndex = this.state.property.index === 0 ? this.state.properties.length - 1 : this.state.property.index - 1;
        this.setState({ property: this.state.properties[newIndex] });
    }

    selectProperty = (index: number) => {
        this.setState({ property: this.state.properties[index] });
    }

    handleOpenTrailer = () => {
        this.setState({ openTrailer: true });
    };

    handleCloseTrailer = () => {
        this.setState({ openTrailer: false });
    };

    render() {
        const { properties, property, openTrailer } = this.state;
        return (
            <div className="new-on-screens">
                <div className="new-on-screens__slider"
                    style={{
                        'transform': `translateY(-${property.index * (100 / properties.length)}%)`
                    }}
                >
                    {
                        properties.map(property => <FullSliderComponent key={property._id} slider={property} onOpenTrailer={this.handleOpenTrailer}></FullSliderComponent>)
                    }
                </div>
                <div className="new-on-screens__control">
                    <div>
                        <button onClick={this.prevProperty}>
                            <Icon fontSize="small">skip_previous</Icon>
                        </button>
                        <p>Prev</p>
                    </div>
                    <div>
                        <button onClick={this.nextProperty}>
                            <Icon fontSize="small">skip_next</Icon>
                        </button>
                        <p>Next</p>
                    </div>
                </div>
                <div className="new-on-screens__dot">
                    {
                        [...Array(properties.length)].map((i, index) => <div className={index === property.index ? 'active' : ''} key={index} onClick={() => this.selectProperty(index)}></div>)
                    }
                </div>
                <TrailerDialogComponent open={openTrailer} trailerUrl={property.trailerLink} onClose={this.handleCloseTrailer}></TrailerDialogComponent>
            </div>
        );
    }
}
