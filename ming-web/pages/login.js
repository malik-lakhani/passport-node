import React from 'react';
import request from 'superagent';
import { Provider } from 'react-redux';

import Head from '../components/commonComponents/Head'
import initStore from '../store';
import common_reducer from '../reducers/common_reducer';
import Login from '../components/connectors/Login';

export default class extends React.Component {
  // eslint-disable-next-line no-unused-vars
  static async getInitialProps({ pathname, query, req, res, jsonPageRes, err }) {
    const isServer = !!req;
    const headers = (req && req.headers) || {};

    let API_URL;
    if (isServer) {
      API_URL = process.env.API_URL;
    } else {
      API_URL = '';
    }

    const data = await Promise.all([
      request.get(`${API_URL}/api/auth/status`)
        .set(headers)
        .then((success) => {
          return { status: JSON.parse(success.text) };
        })
    ]).then(([{ status }]) => {
      const store = initStore(common_reducer, { status }, isServer);
      if (!isServer) {
        store.dispatch({ type: 'STATUS', status });
      }
      return { initialState: store.getState(), isServer };
    })
    .catch((error) => {
      if (isServer) {
         // eslint-disable-next-line no-console
        console.log(error);
      }
      const store = initStore(common_reducer, { error }, isServer);
      return { initialState: store.getState(), isServer };
    });

    return data;
  }

  constructor(props) {
    super(props);
    const initialState = props.initialState;
    initialState.url = props.url;
    this.store = initStore(common_reducer, initialState, props.isServer);
  }

  componentWillMount() {
    console.log(this.props)
    if (this.props.initialState.status.isLogin) {
      this.props.url.push('/dashboard')
    }
  }

  render() {
    return (
      // eslint-disable-next-line react/jsx-filename-extension
      <Provider store={this.store}>
        <Login />
      </Provider>
    );
  }
}
