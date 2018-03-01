import React from 'react';

export default class Error extends React.Component {
  static getInitialProps({ res, jsonPageRes }) {
    const jsonRes = jsonPageRes ? jsonPageRes.status : null;
    const statusCode = res ? res.statusCode : jsonRes;
    return { statusCode };
  }

  render() {
    return (
      <p>{
        this.props.statusCode
        ? `An error ${this.props.statusCode} occurred on server`
        : 'An error occurred on client'
      }</p>
    );
  }
}
