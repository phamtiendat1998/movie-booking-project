import {
  ADD_MOVIE,
  DELETE_MOVIE,
  EDIT_MOVIE,
} from "./../types/movieManager.types";

export const addMovieAction = (payload: any = {}) => {
  return {
    type: ADD_MOVIE,
    payload,
  };
};
export const deleteMovieAction = (payload: any = {}) => {
  return {
    type: DELETE_MOVIE,
    payload,
  };
};
export const editMovieAction = (payload: any = {}) => {
  return {
    type: EDIT_MOVIE,
    payload,
  };
};
