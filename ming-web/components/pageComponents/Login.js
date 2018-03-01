import React from 'react';
import Head from '../commonComponents/Head';
import Navbar from '../commonComponents/Navbar';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    if (event.target['id'] === 'email') {
      this.setState({ email: event.target.value });
    } else {
      this.setState({ password: event.target.value });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    this.props.actions.login(this.state.email, this.state.password);
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
          <div className="container">
            <div className="row marginTop">
              <div className="login-head">
                <h1>Log in</h1>
              </div>

              <div className="form-wrapper">
                <div className="col-xs-12 col-md-4 login-form">
                  <div className="wrapper">
                    <form onSubmit={this.handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="email">Email address:</label>
                        <input type="email" className="form-control" id="email" onChange={this.handleChange} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="pwd">Password:</label>
                        <input type="password" className="form-control" id="pwd" onChange={this.handleChange} />
                      </div>
                     
                      <div className="login-button">
                        <button type="submit" className="" style={{ width: '100%', height: '100%' }}>Login</button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-xs-12 col-md-4 social-login">
                  <div className="social-wrapper">
                    <a href="/api/auth/facebook" style={{ textDecoration: 'none'}} >
                      <div className="facebook">
                        <div>
                          <img src="../static/images/facebook.png" alt="facebook" className="facebook-image" />
                        </div>
                        <div className="login-text">Continue with Facebook</div>
                      </div>
                    </a>
                    <a href="/api/auth/google" style={{ textDecoration: 'none'}} >
                      <div className="google">
                        <div>
                          <img src="../static/images/gplus.png" alt="google" className="gplus-image" />
                        </div>
                        <div className="login-text">Continue with google</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>            
          </div>
        </div>
      </div>
    );
  }
}
