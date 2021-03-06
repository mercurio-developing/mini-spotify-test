import React, { Component } from "react";
import Proptypes from "prop-types";
import { CurrentTrack } from "../../actions/spotifyActions";
import { connect } from "react-redux";
import "./Current.css";
import isEmpty from "../../validation/is-empty";
import Spinner from "../common/Spinner";
class Current extends Component {
  constructor(props) {
    super(props);
    this.state = {
      track: {}
    };
  }

  componentDidMount() {
    this.props.CurrentTrack();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
    if (newProps.track) {
      this.setState({ track: newProps.track });
    }
    if (newProps.track.loading) {
      this.setState({ track: newProps.track.loading });
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const { track } = this.props.track;
    const duration = function msToHMS(ms) {
      // 1- Convert to seconds:
      let seconds = parseInt(ms / 1000);
      // 2- Extract hours:
      // 3- Extract minutes:
      let minutes = parseInt(seconds / 60); // 60 seconds in 1 minute
      let total = minutes + " min";
      return total;
    };

    return (
      <div className="row h-75 mt-5">
        {track.loading === true ? (
          <p>LOADING</p>
        ) : (
          <div className="col-xl-10 col-lg-10 mx-auto my-auto">
            <div className="row">
              <div className="col-xl-6 col-lg-6 mx-auto text-right">
                <img
                  className="img-fluid"
                  src={
                    process.env.PUBLIC_URL +
                    "/assets/Spotify_Logo_RGB_Green.png"
                  }
                  alt=""
                />
                <h1 className="brand-name pr-2 display-4 pt-1 pb-5">Search.</h1>
              </div>
            </div>
            {isEmpty(track) ? (
              <div className="col-xl-12 col-lg-12 text-center">
                <Spinner />
                <h2 className="mt-2 m-5">
                  Are you listening to spotify right now?
                </h2>
              </div>
            ) : (
              <div className="row current-card p-4">
                <div className="col-xl-12 col-lg-12">
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 ">
                      <img
                        className="img-fluid"
                        src={track.item.album.images[0].url}
                        alt=""
                      />
                    </div>
                    <div className="col-lg-6 col-xl-6">
                      <div className="row">
                        <div className="col-lg-12 col-xl-12 text-right">
                          <h1 className="display-3">
                            {track.item.artists[0].name}
                          </h1>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-12 col-xl-12 text-right">
                          <h1>{track.item.name}</h1>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-12 col-xl-12 text-right">
                          <p className="h4">
                            {duration(track.item.duration_ms)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <button
              onClick={() => {
                this.props.history.push("/search");
              }}
              className="btn btn-lg btn-login mt-5"
            >
              BACK
            </button>
          </div>
        )}
      </div>
    );
  }
}

Current.protoTypes = {
  CurrentTrack: Proptypes.func.isRequired,
  errors: Proptypes.object.isRequired,
  track: Proptypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  track: state.spotify
});

export default connect(
  mapStateToProps,
  { CurrentTrack }
)(Current);
