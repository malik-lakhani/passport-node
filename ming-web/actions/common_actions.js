import request from 'superagent';

export function apiGet(url) {
  return new Promise((resolve, reject) => {
    return request
      .get(url)
      .withCredentials()
      .end((error, response) => {
        if (!error) {
          resolve(response);
        } else {
          reject(response);
        }
      });
  });
}

export function apiPost(url, data) {
  return new Promise((resolve, reject) => {
    return request
      .post(url)
      .withCredentials()
      .send(data)
      .end((error, response) => {
        if (!error) {
          resolve(response);
        } else {
          reject(response);
        }
      });
  });
}

export function apiDelete(url) {
  return new Promise((resolve, reject) => {
    return request
      .delete(url)
      .withCredentials()
      .end((error, response) => {
        if (!error) {
          resolve(response);
        } else {
          reject(response);
        }
      });
  });
}

export function apiPut(url, data) {
  return new Promise((resolve, reject) => {
    return request
      .put(url)
      .withCredentials()
      .send(data)
      .end((error, response) => {
        if (!error) {
          resolve(response);
        } else {
          reject(response);
        }
      });
  });
}

export function login(email, password) {
  return ((dispatch) => {
    apiPost(`/api/auth/local`, {email: email, password: password })
    .then((response) => {
      if (response.body.isLogin) {
        // this.props.url.push('/dashboard')
        window.location = '/dashboard';
      }
    })
    .catch((err) => {
      alert("Invalid Credentials")
    });
  })
}

export function logout() {
  return ((dispatch) => {
    apiGet(`/api/logout`)
    .then((response) => {
      if (!response.body.isLogin) {
        window.location = '/login';
      }
    })
    .catch((err) => {
      console.log("error", err)
    });
  })
}