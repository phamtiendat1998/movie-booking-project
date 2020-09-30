import axios from "axios";
import { groupID, token } from "../config/setting";
import {
  showTimeMovieListAPI,
  movieDetailAPI,
  addMovieAPI,
  deleteMovieAPI,
} from "../config/api.constant";
import { bookSeatAPI } from "./../config/api.constant";

export const getShowTimeMovieList = () =>
  axios.get(`${showTimeMovieListAPI}?maNhom=${groupID}`);
export const getComingSoonMovieList = () =>
  axios.get(`${showTimeMovieListAPI}?maNhom=GP10`);
export const getMovieDetail = (id: number) =>
  axios.get(`${movieDetailAPI}?MaPhim=${id}`);
export const getMovieTicketList = (id: number) =>
  axios.get(`${bookSeatAPI}?MaLichChieu=${id}`);
export const postAddMovie = (data: any = {}) => {
  return axios.post(
    `${addMovieAPI}`,
    {
      maPhim: data._id,
      tenPhim: data.name,
      biDanh: data.penName,
      trailer: data.trailerLink,
      hinhAnh: data.image,
      moTa: data.descriptiones,
      maNhom: `${groupID}`,
      ngayKhoiChieu: data.dateRelease,
      danhGia: data.rate,
    },
    {
      headers: { Authorization: "Bearer " + localStorage.getItem(token) },
    }
  );
};
export const deleteMovie = (_id: number) => {
  return axios.delete(`${deleteMovieAPI}?MaPhim=${_id}`, {
    headers: { Authorization: "Bearer " + localStorage.getItem(token) },
  });
};
