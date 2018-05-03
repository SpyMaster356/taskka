import React, { Component } from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {Link} from 'react-router-dom';

import {login} from '../actions/user.actions';

import TaskkaApiClient from '../lib/taskka-api-client';

const mapStateToProps = (state) => ({
});

class VerifyPage extends Component {
  constructor() {
    super();

    this.initState = {
      error: null,
      fetching: false,
    };

    this.state = this.initState;
  }

  componentDidMount() {
    this.verifyLogin();
  }

  render() {
    return (
      <div>
        {
          !this.state.error
          ? <div>Summoning the bards</div>
          : <div>{this.errorMessage()}</div>
        }
      </div>
    )
  }

  errorMessage() {
    return (
      <div>
        Hmmmm, something went wrong. <Link to={'/login'}>Try again?</Link>
      </div>
    )
  }

  verifyLogin() {
    let provider = this.props.match.params.provider;

    let code = null;
    switch (provider) {
      case 'google':
        code = this.getGoogleAccessCode();
        break;
      default:
        let error = new Error("Unknown Provider");
        error.name = "OAuthError";
        throw error;
    }

    this.setState({ fetching: true });
    TaskkaApiClient
      .post(`/auth/${provider}/verify`, {
        code,
        redirect_uri: window.location.origin + window.location.pathname,
      })
      .then((body) => {
        this.props.dispatch(login(body.user));
        this.props.dispatch(push(body.new_user ? '/user/new' : '/tasks'));
      })
      .catch((error) => {
        this.setState({
          fetching: false,
          error: error.message,
        })
      });
  }

  getGoogleAccessCode() {
    let data = {};

    window.location.search
      .substr(1)
      .split('&')
      .forEach((pair) => {
        let [key, value] = pair.split('=');
        data[key] = value;
      });

    if (data.error) {
      let error = new Error(data.error);
      error.name = "OAuthError";
      throw error;
    }

    return data.code;
  }
}

export default connect(
  mapStateToProps,
)(VerifyPage);

