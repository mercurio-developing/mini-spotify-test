import { GET_TRACKS, GET_CURRENT_TRACK, TRACK_LOADING } from "../actions/types";

const initialState = {
  tracks: [],
  track: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TRACKS:
      return {
        ...state,
        tracks: action.payload,
        loading: false
      };
    case GET_CURRENT_TRACK:
      return {
        ...state,
        track: action.payload,
        loading: false
      };
    case TRACK_LOADING:
      return {
        ...state,
        loading: true
      };

    default:
      return state;
  }
}
