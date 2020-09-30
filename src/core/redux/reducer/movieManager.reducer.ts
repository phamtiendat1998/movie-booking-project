import {
  ADD_MOVIE,
  DELETE_MOVIE,
  EDIT_MOVIE,
} from "./../types/movieManager.types";

let payload = "";
const initialState = {
  movie: payload,
};

const movieManagerReducer = (state = initialState, action: any = {}) => {
  switch (action.type) {
    case ADD_MOVIE: {
      state.movie = action.payload;
      return { ...state };
    }
    case DELETE_MOVIE: {
      state.movie = action.payload;
      return { ...state };
    }
    case EDIT_MOVIE: {
      state.movie = action.payload;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
export default movieManagerReducer;
