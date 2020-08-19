import axios from "axios";
import { groupID } from "../config/setting";
import { showTimeMovieListAPI } from "../config/api.constant";

export const getShowTimeMovieList = () => {
    return axios({
        url: `${showTimeMovieListAPI}?manhom=${groupID}`,
        method: "GET",
    })
}
