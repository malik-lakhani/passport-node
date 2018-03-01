import React from 'react';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.actions.logout();
  }

  render () {
     return (
      // eslint-disable-next-line react/jsx-filename-extension
      <nav className="navbar">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">Brand</a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right">
              { this.props.status.isLogin ? <li><a href="#">{this.props.status.user.username || this.props.status.user.email}</a></li> : undefined }
              { this.props.status.isLogin || this.props.url.pathname === '/login' ? undefined : <li><a href="/login">Login</a></li>}
              { this.props.status.isLogin ? <li onClick={this.logout}><a href="#">Logout</a></li> : <li><a href="#">Register</a></li> }
            </ul>
          </div>
        </div>
      </nav>
    );
  }
};
