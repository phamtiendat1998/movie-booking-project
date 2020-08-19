import * as React from 'react';
// Scss
import './NewOnScreens.page.scss';
// Data
import { introFilmData } from '../../../core/interface/film/introFirm.data';
// Interface
import { IntroMovie } from '../../../core/interface/film/introFilm.class';

// Mat
import Icon from '@material-ui/core/Icon';
// Component
import FullSliderComponent from '../../../components/fullSlider/FullSlider.component';
import { TrailerDialogComponent } from '../../../components/trailerDialog/TrailerDialog.component';

import { getShowTimeMovieList } from '../../../core/services/movieManager.service';

export interface NewOnScreensPageProps {
}

export interface NewOnScreensPageState {
    properties: IntroMovie[];
    property: IntroMovie | null;
    openTrailer: boolean;
}

export default class NewOnScreensPage extends React.Component<NewOnScreensPageProps, NewOnScreensPageState> {
    constructor(props: NewOnScreensPageProps) {
        super(props);

        this.state = {
            properties: [],
            property: null,
            openTrailer: false
        }
    }

    componentDidMount = () => {
        this.doGetShowTimeMovieList();
    }

    nextProperty = () => {
        if (this.state.property === null) { return; };
        const newIndex = this.state.property.index === this.state.properties.length - 1 ? 0 : this.state.property.index + 1;
        this.setState({ property: this.state.properties[newIndex] });
    }

    prevProperty = () => {
        if (this.state.property === null) { return; };
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

    doGetShowTimeMovieList = () => {
        getShowTimeMovieList()
            .then((result) => {
                const newIntroMovies: IntroMovie[] = result.data.map((item: any, index: number) => {
                    const newIntroMovie = new IntroMovie(
                        item.maPhim,
                        item.tenPhim,
                        item.biDanh,
                        item.trailer,
                        item.hinhAnh,
                        item.moTa,
                        item.ngayKhoiChieu,
                        item.danhGia,
                        item.maNhom,
                        index
                    );
                    return newIntroMovie;
                });
                console.log(newIntroMovies);
                this.setState(
                    {
                        properties: newIntroMovies,
                        property: newIntroMovies[0]
                    }
                )
            })
            .catch((errors) => {
                console.log({ ...errors });
            });

    };

    render() {
        const { properties, property, openTrailer } = this.state;
        return (
            property !== null &&
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
