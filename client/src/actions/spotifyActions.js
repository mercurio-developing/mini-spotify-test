import axios from "axios";

import {
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_TRACKS,
  GET_TRACK,
  TRACK_LOADING
} from "./types";

export const SearchTracks = query => dispatch => {
  dispatch(setTrackLoading());
  axios
    .post("/api/search", { query })
    .then(res => {
      let tracks = res.data.tracks.items;
      dispatch({
        type: GET_TRACKS,
        payload: tracks
      });
    })
    .catch(err => {
      dispatch({
        type: GET_TRACKS,
        payload: null
      });
    });
};

// Set loading state
export const setTrackLoading = () => {
  return {
    type: TRACK_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
