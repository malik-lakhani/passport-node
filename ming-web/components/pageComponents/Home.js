import React from 'react';
import Head from '../commonComponents/Head';
import Navbar from '../commonComponents/Navbar';

export default class extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    let marginTop = {
      marginTop: "100px"
    }

    console.log(this.props)
    return (
      <div>
        <Head {...this.props} />
        <Navbar {...this.props} />
      </div>
    );
  }
}
