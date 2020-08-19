import * as React from 'react';
// Scss
import './ShowTimes.page.scss';
// Mat
import { Icon } from '@material-ui/core';
// Class
import { IntroMovie } from '../../../core/interface/film/introFilm.class';
// Component
import { TrailerDialogComponent } from '../../../components/trailerDialog/TrailerDialog.component';
import CardSliderComponent from '../../../components/cardSlider/CardSlider.component';
import { getShowTimeMovieList } from '../../../core/services/movieManager.service';

export interface ShowTimesPageProps {
}

export interface ShowTimesPageState {
    properties: IntroMovie[];
    property: IntroMovie | null;
    openTrailer: boolean;
    urlTrailer: string;
}

export default class ShowTimesPage extends React.Component<ShowTimesPageProps, ShowTimesPageState> {

    constructor(props: ShowTimesPageProps) {
        super(props);

        this.state = {
            properties: [],
            property: null,
            openTrailer: false,
            urlTrailer: '',
        }
    }

    componentDidMount = () => {
        this.doGetShowTimeMovieList();
    }

    nextProperty = () => {
        if (this.state.property === null) { return; };
        const newIndex = this.state.property.index === this.state.properties.length - 1 - 3 ? 0 : this.state.property.index + 1;
        this.setState({ property: this.state.properties[newIndex] });
    }

    prevProperty = () => {
        if (this.state.property === null) { return; };
        const newIndex = this.state.property.index === 0 ? this.state.properties.length - 1 - 3 : this.state.property.index - 1;
        this.setState({ property: this.state.properties[newIndex] });
    }

    handleOpenTrailer = (trailerUrl: string) => {
        this.setState({ openTrailer: true, urlTrailer: trailerUrl });
    };

    handleCloseTrailer = () => {
        this.setState({ openTrailer: false, urlTrailer: '' });
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
        const { properties, property, openTrailer, urlTrailer } = this.state;
        return (
            property !== null &&
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
