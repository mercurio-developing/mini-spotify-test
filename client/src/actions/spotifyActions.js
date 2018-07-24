import axios from "axios";

import {
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_TRACKS,
  TRACK_LOADING,
  GET_CURRENT_TRACK
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

export const CurrentTrack = query => dispatch => {
  // dispatch(setTrackLoading());
  console.log("getCURRENT");
  axios
    .post("/api/current")
    .then(res => {
      let track = res.data;
      console.log(track);
      dispatch({
        type: GET_CURRENT_TRACK,
        payload: track
      });
    })
    .catch(err => {
      dispatch({
        type: GET_CURRENT_TRACK,
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
