import * as React from 'react';
// Scss
import './ComingSoon.page.scss';
// Interface
import { IntroMovie } from '../../../core/interface/film/introFilm.class';
//Mat
import { Icon } from '@material-ui/core';
// Component
import { TrailerDialogComponent } from '../../../components/trailerDialog/TrailerDialog.component';
import CardSliderComingSoonComponent from '../../../components/cardSlider_ComingSoon/CardSliderComingSoon.component';
// Services
import { getComingSoonMovieList } from '../../../core/services/movieManager.service';

export interface ComingSoonPagerops { }
export interface ComingSoonPageState {
    properties: IntroMovie[];
    property: IntroMovie | null;
    openTrailer: boolean;
    urlTrailer: string;
}

export default class ComingSoonPage extends React.Component<ComingSoonPagerops, ComingSoonPageState> {
    constructor(props: ComingSoonPagerops) {
        super(props);

        this.state = {
            properties: [],
            property: null,
            openTrailer: false,
            urlTrailer: '',
        }
    }

    componentDidMount = () => {
        this.doGetComingSoonMovieList();
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

    doGetComingSoonMovieList = () => {
        getComingSoonMovieList()
            .then(result => {
                const newIntroMovies: IntroMovie[] = result.data.map((item: any = {}, index: number) => {
                    const newIntroMovie: IntroMovie = new IntroMovie(
                        item.maPhim,
                        item.tenPhim,
                        item.biDanh,
                        item.trailer,
                        item.hinhAnh,
                        item.moTa,
                        item.ngayKhoiChieu,
                        item.danhGia,
                        item.maNhom,
                        index,
                    );
                    return newIntroMovie;
                });

                if (newIntroMovies.length >= 15) {
                    newIntroMovies.length = 5;
                }
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

    render = () => {
        const { properties, property, openTrailer, urlTrailer } = this.state;
        console.log(this.state);

        return (
            property !== null &&
            <div className="comingsoon">
                <div className="comingsoon__slider"
                    style={{
                        'transform': `translateX(-${property.index * (100 / properties.length)}%)`
                    }}
                >
                    {
                        properties.map(property => <CardSliderComingSoonComponent key={property.index} slider={property} onOpenTrailer={this.handleOpenTrailer}></CardSliderComingSoonComponent>)
                    }
                </div>
                <div className="comingsoon__control">
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