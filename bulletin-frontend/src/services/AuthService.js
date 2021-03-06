// src/services/AuthService.js

import axios from 'axios';

const url = 'http://localhost:3000/';

export default {
  login(credentials) {
    return axios
      .post(url + 'login', credentials)
      .then(response => response.data);
  },
  getSecretContent() {
    return axios.get(url).then(response => response.data);
  }
};