import { GET_MOVIES } from "./../types/movieManager.types";

const initialState = {
  movies: [],
};
const movieManagerReducer = (state = initialState, action: any = {}) => {
  switch (action.type) {
    case GET_MOVIES: {
      state.movies = action.payload;
      return { ...state };
    }
    default:
      return state;
  }
};
export default movieManagerReducer;
