import * as React from 'react';
// Scss
import './ShowTimes.page.scss';
// Mat
import { Icon } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
// Interface
import { IntroMovie } from '../../../core/interface/film/introFilm.class';
// Services
import { getShowTimeMovieList } from '../../../core/services/movieManager.service';
// Component
import CardSliderShowTimesComponent from '../../../components/cardSlider/showTimes/CardSliderShowTimes.component';
import { TrailerDialogComponent } from '../../../components/trailerDialog/TrailerDialog.component';
import { AddFormDialogComponent } from '../../../components/formDialog/AddFormDialog.component';
import { UpdateFormDialogComponent } from '../../../components/formDialog/UpdateFormDialog.component';
import { AlertSnackbarComponent } from '../../../components/alert/AlertSnackbar.component';

const isAdmin = () => {
    if (JSON.parse(localStorage.getItem("userLogin") || "{}").maLoaiNguoiDung === "QuanTri") {
        return true;
    }
    return false;
}

export interface ShowTimesPageProps {
}
export interface ShowTimesPageState {
    properties: IntroMovie[];
    property: IntroMovie | null;
    openTrailer: boolean;
    urlTrailer: string;
    openAddForm: boolean;
    openUpdateForm: boolean;
    itemUpdate: IntroMovie | null;
    query: string;
    filteredData: IntroMovie[];
    openAlert: boolean;
}

class ShowTimesPage extends React.Component<ShowTimesPageProps, ShowTimesPageState> {
    constructor(props: ShowTimesPageProps) {
        super(props);

        this.state = {
            properties: [],
            property: null,
            openTrailer: false,
            urlTrailer: '',
            openAddForm: false,
            openUpdateForm: false,
            itemUpdate: null,
            query: '',
            filteredData: [],
            openAlert: false,
        }
    }

    componentDidMount = () => {
        this.doGetShowTimeMovieList();
    }

    nextProperty = () => {
        if (this.state.property === null) { return };
        const newIndex = this.state.property.index === this.state.properties.length - 1 - 3 ? 0 : this.state.property.index + 1;
        this.setState({ property: this.state.properties[newIndex] });
    }

    prevProperty = () => {
        if (this.state.property === null) { return };
        const newIndex = this.state.property.index === 0 ? this.state.properties.length - 1 - 3 : this.state.property.index - 1;
        this.setState({ property: this.state.properties[newIndex] });
    }

    handleOpenTrailer = (trailerUrl: string) => {
        this.setState({ openTrailer: true, urlTrailer: trailerUrl });
    };

    handleCloseTrailer = () => {
        this.setState({ openTrailer: false, urlTrailer: '' });
    };

    handleOpenAddForm = () => {
        this.setState({ openAddForm: true });
    }

    handleOpenUpdateForm = (item: IntroMovie) => {
        this.setState({ openUpdateForm: true, itemUpdate: item });
    }

    handleCloseForm = () => {
        this.setState({ openAddForm: false, openUpdateForm: false });
    }

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        this.setState(prevState => {
            const filteredData = prevState.properties
                .filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
            return ({ query, filteredData });
        })
    }

    handleOpenAlert = () => {
        this.setState({ openAlert: true });
    }

    handleCloseAlert = () => {
        this.setState({ openAlert: false });
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
        const { property, openTrailer, urlTrailer, openAddForm, openUpdateForm, filteredData, openAlert, itemUpdate } = this.state;
        return (
            property !== null &&
            <div className="showtimes">
                {isAdmin() &&
                    <button className="card-add-item" onClick={this.handleOpenAddForm}>
                        <AddIcon />
                    </button>
                }
                <div className="showtimes__slider"
                    style={{
                        'transform': `translateX(-${property.index * (100 / (filteredData.length))}%)`
                    }}>

                    {
                        filteredData.map(property => <CardSliderShowTimesComponent key={property.index} slider={property} onOpenTrailer={this.handleOpenTrailer} onOpenForm={this.handleOpenUpdateForm} onOpenAlert={this.handleOpenAlert} isAdmin={isAdmin()}></CardSliderShowTimesComponent>)
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
                <AddFormDialogComponent open={openAddForm} onClose={this.handleCloseForm} onOpenAlert={this.handleOpenAlert}></AddFormDialogComponent>
                <UpdateFormDialogComponent open={openUpdateForm} onClose={this.handleCloseForm} onOpenAlert={this.handleOpenAlert} slider={itemUpdate}></UpdateFormDialogComponent>
                <AlertSnackbarComponent open={openAlert} onClose={this.handleCloseAlert}></AlertSnackbarComponent>
            </div >
        );
    }
}
export default ShowTimesPage;
