import config from "./../../config";
import decode from "jwt-decode";

export default class AuthService {
  // Initializing important variables
  constructor(domain) {
    this.domain = domain || config.api_domain; // API server domain
    this.fetch = this.fetch.bind(this); // React binding stuff
    this.login = this.login.bind(this);
    this.loggedIn = this.loggedIn.bind(this);
  }

  login(email, password) {
  // Get a token from api server using the fetch api
    return this.fetch(`/auth`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((res) => {
      if (res.ack) {
        this.setGlobalData(res);
        return Promise.resolve(res);
      } else {
        return Promise.reject(res);
      }
    });
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken(); // Getting token from localstorage
    // console.log('token', token)
    return !!token; // handwaiving here
  }

  getAdminType() {
    // Retrieves the admin type from localStorage
    if (this.loggedIn()) 
      return this.getProfile().role;
    else  
      return -1;
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.setItem("drawer_open", 0);
    window.location.replace("/");
  }


  fetch(url, options) {
    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    if (this.loggedIn()) {
      headers["x-auth-token"] = this.getToken();
    }
    return fetch(`${this.domain}${url}`, {
      headers,
      ...options,
    })
      .then(this._checkStatus)
      .then((response) => response.json())
      .catch((e) => {
        console.log("server is not responding");
      });
  }

  post(url, body) {
    let headers = {
      "Accept": "application/json",
      "Content-Type": "application/json",
    };
    if (this.loggedIn()) {
      headers["x-auth-token"] = this.getToken();
    }
    return fetch(`${this.domain}${url}`, {
      headers,
      method: "POST",
      body: new URLSearchParams(body),
    })
      .then(this._checkStatus)
      .then((response) => response.json());
  }

  _checkStatus(response) {
    // console.log('response', response)
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status <= 300) {
      // Success status lies between 200 to 300
      return response;
    } else {
      console.log("ERROR:: ", response);
      if (response.status === 401) {
        localStorage.removeItem("id_token");
        localStorage.setItem("drawer_open", 0);
        window.location.replace("/");
        return response;
      }
    }
  }

  setGlobalData(res) {
    // Saves user token to localStorage
    localStorage.setItem("id_token", res.token);
    localStorage.setItem("drawer_open", 0);
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem("id_token");
  }
  getProfile() {
    // Using jwt-decode npm package to decode the token
    if (this.loggedIn()) return decode(this.getToken());
  }
  getRole() {
    // Using jwt-decode npm package to decode the token
    if (this.loggedIn()) return decode(this.getToken());
  }
}
