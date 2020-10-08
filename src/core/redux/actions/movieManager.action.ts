//Services
import { getShowTimeMovieList } from "./../../services/movieManager.service";
//Interface
import { IntroMovie } from "./../../interface/film/introFilm.class";
//Type
import { GET_MOVIES } from "./../types/movieManager.types";

export const getMoviesAction = () => {
  return (dispatch: any) =>
    getShowTimeMovieList()
      .then((res) => {
        const newIntroMovies: IntroMovie[] = res.data.map(
          (item: any = {}, index: number) => {
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
          }
        );
        dispatch({
          type: GET_MOVIES,
          payload: newIntroMovies,
        });
      })
      .catch((err) => {
        console.log({ ...err });
      });
};
