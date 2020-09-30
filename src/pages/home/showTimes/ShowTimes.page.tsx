import * as React from 'react';
// Scss
import './ShowTimes.page.scss';
// Mat
import { Icon } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
// Interface
import { IntroMovie } from '../../../core/interface/film/introFilm.class';
// Component
import { TrailerDialogComponent } from '../../../components/trailerDialog/TrailerDialog.component';
import CardSliderShowTimesComponent from '../../../components/cardSlider_ShowTimes/CardSliderShowTimes.component';
import { FormDialogComponent } from '../../../components/formDialog/FormDialog.component';
// Services
import { getShowTimeMovieList } from '../../../core/services/movieManager.service';

const checkIsAdmin = () => {
    if (JSON.parse(localStorage.getItem("userLogin") || "{}").maLoaiNguoiDung === "QuanTri") {
        return true;
    } else {
        return false;
    }
}

export interface ShowTimesPageProps { }
export interface ShowTimesPageState {
    properties: IntroMovie[];
    property: IntroMovie | null;
    openTrailer: boolean;
    urlTrailer: string;
    openForm: boolean;
    query: string;
    filteredData: IntroMovie[],
}

export default class ShowTimesPage extends React.Component<ShowTimesPageProps, ShowTimesPageState> {
    constructor(props: ShowTimesPageProps) {
        super(props);

        this.state = {
            properties: [],
            property: null,
            openTrailer: false,
            urlTrailer: '',
            openForm: false,
            query: '',
            filteredData: [],
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

    handleOpenForm = () => {
        this.setState({ openForm: true });
    }

    handleCloseForm = () => {
        this.setState({ openForm: false });
    }

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;

        this.setState(prevState => {
            const filteredData = prevState.properties.filter(element => {
                return element.name.toLowerCase().includes(query.toLowerCase());
            })
            return ({ query, filteredData })
        })
    }

    doGetShowTimeMovieList = () => {
        getShowTimeMovieList()
            .then(result => {
                const newIntroMovies: IntroMovie[] = result.data.map((item: any = {}, index: number) => {
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
                        index,
                    );
                    return newIntroMovie;
                });

                this.setState(
                    {
                        properties: newIntroMovies,
                        property: newIntroMovies[0],
                        filteredData: newIntroMovies,
                    }
                )
            })
            .catch((errors) => {
                console.log({ ...errors });
            });
    };
    render = () => {
        const { property, openTrailer, urlTrailer, openForm, filteredData } = this.state;
        return (
            property !== null &&
            <div className="showtimes">
                <div className="showtimes__slider"
                    style={{
                        'transform': `translateX(-${property.index * (100 / filteredData.length)}%)`
                    }}
                >
                    {checkIsAdmin() &&
                        <div className="card-slider-showTimes">
                            <button className="card-add-item" onClick={this.handleOpenForm}>
                                <AddIcon />
                            </button>
                        </div>
                    }
                    {
                        filteredData.map(property => <CardSliderShowTimesComponent key={property.index} slider={property} onOpenTrailer={this.handleOpenTrailer} showTimes={[]} isAdmin={checkIsAdmin()}></CardSliderShowTimesComponent>)
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
                <div className="showtimes__search">
                    <form>
                        <input type="text" name="search" placeholder="Search.." onChange={this.handleInputChange} />
                    </form>
                </div>
                <TrailerDialogComponent open={openTrailer} trailerUrl={urlTrailer} onClose={this.handleCloseTrailer}></TrailerDialogComponent>
                <FormDialogComponent open={openForm} onClose={this.handleCloseForm}></FormDialogComponent>
            </div >
        );
    }
}
