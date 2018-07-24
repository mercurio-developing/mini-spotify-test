import React, { Component } from "react";
import { RequestToken, LoginUser } from "../../actions/authActions";
import "./Login.css";
import Proptypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToken: false
    };
    this.onLogin = this.onLogin.bind(this);
  }
  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    let token = query.get("token");
    if (this.props.auth.isAuthenticated) {
      this.props.history.push(`/search`);
    } else if (token) {
      this.setState({ isToken: true });
      this.props.LoginUser(token);
      window.location.reload();
    }
  }
  onLogin(e) {
    e.preventDefault();
    this.props.RequestToken();
  }
  render() {
    return this.state.isToken ? (
      <div className="row h-75">
        <div className="col-xl-6 col-lg-6 mx-auto my-auto">
          <Spinner />
        </div>
      </div>
    ) : (
      <div className="row h-75">
        <div className="col-xl-6 col-lg-6 mx-auto my-auto">
          <div className="row">
            <div className="col-xl-10 col-lg-10 mx-auto text-right">
              <img
                className="img-fluid"
                src={
                  process.env.PUBLIC_URL + "/assets/Spotify_Logo_RGB_Green.png"
                }
                alt=""
              />
              <h1 className="brand-name pr-2 display-4 pt-1">Search.</h1>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-xl-10 col-lg-10 mx-auto login-card text-center">
              <label className="label-title">Please login with Spotify</label>
              <div className="row">
                <div className="col-xl-10 col-lg-10 mx-auto text-center">
                  <button
                    onClick={this.onLogin}
                    className="btn btn-lg btn-login mt-4"
                  >
                    LOGIN
                  </button>
                </div>
              </div>
              <div className="row" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.protoTypes = {
  RequestToken: Proptypes.func.isRequired,
  LoginUser: Proptypes.func.isRequired,
  errors: Proptypes.object.isRequired,
  isAuthenticated: Proptypes.bool.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { RequestToken, LoginUser }
)(Login);
