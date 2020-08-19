import { DANG_NHAP } from "../types/userMagerTypes";

let user = "";

const initialState = {
  user: user,
};

// if(localStorage.getItem("userLogin")) {
//     user = JSON.parse(localStorage.getItem("userLogin")).user;
// }

export default (state = initialState, action: any) => {
  switch (action.type) {
    case DANG_NHAP: {
      state.user = action.user;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
