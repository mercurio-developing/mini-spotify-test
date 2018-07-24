import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_token from "jwt-decode";
import { GET_ERRORS, SET_SPOTIFY_USER } from "./types";

//Request to Spotify

export const RequestToken = () => dispatch => {
  axios
    .post("/api/login")
    .then(res => {
      window.location.assign(res.data);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Login in APP
export const LoginUser = token => dispatch => {
  if (token) {
    localStorage.setItem("jwtToken", token);
  }
  let decoded = jwt_token(token);
  dispatch(setSpotifyUser(decoded));
};

// Set logged in user
export const setSpotifyUser = decoded => {
  return {
    type: SET_SPOTIFY_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setSpotifyUser({}));
};
