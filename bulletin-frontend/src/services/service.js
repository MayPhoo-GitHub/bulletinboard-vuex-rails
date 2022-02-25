// src/services/AuthService.js

import axios from 'axios';

const url = 'http://localhost:3000/';

export default {
    searchPost(keyword) {
    return axios
    .get("/posts/search", keyword)
      .then(response => response.data);
  },
};
