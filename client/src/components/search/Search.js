import React, { Component } from "react";
import Proptypes from "prop-types";
import { SearchTracks } from "../../actions/spotifyActions";
import { logoutUser } from "../../actions/authActions";

import { connect } from "react-redux";
import Results from "./Results";
import "./Search.css";
import isEmpty from "../../validation/is-empty";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
    if (newProps.tracks) {
      this.setState({ tracks: newProps.tracks });
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSearch(e) {
    e.preventDefault();
    let query = this.state.query;
    this.props.SearchTracks(query);
  }

  render() {
    const { tracks, errors, logoutUser } = this.props;

    const results =
      tracks === undefined ? (
        <div className="col-xl-6 col-lg-6 mx-auto my-auto">
          <h4 className="empty text-center">
            {" "}
            Please search a album,track or artist...
          </h4>
        </div>
      ) : !isEmpty(this.state.tracks) ? (
        <Results tracks={this.state.tracks} />
      ) : (
        <div className="col-xl-6 col-lg-6 mx-auto my-auto">
          <h4 className="empty text-center">No results...</h4>
        </div>
      );

    return (
      <div className="row h-75 pt-5 ">
        <div className="col-xl-12 col-lg-12 mx-auto my-auto">
          <button
            onClick={() => {
              logoutUser();
            }}
            className="btn btn-danger btn-sm float-right"
          >
            Logout
          </button>
        </div>
        <div className="col-xl-12 col-lg-12 mx-auto my-auto">
          <div className="row">
            <div className="col-xl-6 col-lg-6 mx-auto text-right">
              <img
                className="img-fluid"
                src={
                  process.env.PUBLIC_URL + "/assets/Spotify_Logo_RGB_Green.png"
                }
                alt=""
              />
              <h1 className="brand-name pr-2 display-4 pt-1 pb-5">Search.</h1>
            </div>
          </div>
          <div className="row mt-5 ">
            <div className="col-xl-8 col-lg-8 mx-auto text-center">
              <form onSubmit={this.onSearch}>
                <div className="row">
                  <div className="col-xl-9 col-lg-9">
                    <input
                      name="query"
                      placeholder="Search..."
                      className="search"
                      type="text"
                      value={this.state.query}
                      onChange={this.onChange}
                    />
                    <span />
                    {!isEmpty(this.state.errors) ? (
                      <p className="float-left error">{this.state.errors}</p>
                    ) : (
                      <p className="float-left error" />
                    )}
                  </div>
                  <div className="col-xl-3 col-lg-3">
                    <img
                      className="live-now"
                      onClick={() => {
                        this.props.history.push("/current");
                      }}
                      src={
                        process.env.PUBLIC_URL +
                        "/assets/Spotify_Icon_RGB_White.png"
                      }
                      alt=""
                    />
                    <p className="empty">LIVE NOW!</p>
                  </div>
                </div>
                <input
                  className="btn btn-lg btn-search mt-5"
                  type="submit"
                  value="Search"
                />
              </form>
            </div>
          </div>
          <div className="row search-card mt-5 mb-5">{results}</div>
        </div>
      </div>
    );
  }
}

Search.protoTypes = {
  SearchTracks: Proptypes.func.isRequired,
  logoutUser: Proptypes.func.isRequired,
  errors: Proptypes.object.isRequired,
  loading: Proptypes.bool.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  loading: state.loading,
  tracks: state.spotify.tracks
});

export default connect(
  mapStateToProps,
  { SearchTracks, logoutUser }
)(Search);
