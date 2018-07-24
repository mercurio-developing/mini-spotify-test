import isEmpty from "../validation/is-empty";

import { SET_SPOTIFY_USER } from "../actions/types";

const initialState = {
  isAuthenticated: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SPOTIFY_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload)
      };
    default:
      return state;
  }
}
