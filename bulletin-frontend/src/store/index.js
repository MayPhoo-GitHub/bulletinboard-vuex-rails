import { createStore } from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate';
const getDefaultState = () => {
  return {
    token: '',
    user: [],
    posts: [],
    users: [],
  };
};

export default createStore({
  strict: true,
  plugins: [createPersistedState()],
  state: getDefaultState(),
  getters: {
    posts: state => {
        return state.posts;
    },
    users: state => {
      return state.users;
    },
    isLoggedIn: state => {
      return state.token;
    },
    getUser: state => {
      return state.user;
    },
   
  },

  mutations: {
    // set posts
    SET_ITEMS_POST (state, posts) {
        state.posts = posts
    },
    // set users
    SET_ITEMS_USER (state, users) {
      state.users = users
    }, 
    
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USER: (state, user) => {
      state.user = user;
    },
    RESET: state => {
      Object.assign(state, getDefaultState());
    },
  },

  actions: {
    // load posts
    async loadPosts ({ commit }) {
      axios.get("http://localhost:3000/posts") 
      .then(response => {
        commit('SET_ITEMS_POST', response.data)
      })
      .catch(e => {
        this.error.push(e)
        })
    },
    // load posts
    async search ({ commit },keyword) {
      axios.get("http://localhost:3000/posts",{params: {keyword}}) 
      .then(response => {
        commit('SET_ITEMS_POST', response.data)
      })
      .catch(e => {
        this.error.push(e)
        })
    },
      // load users
    async loadUsers ({ commit }) {
      axios.get("http://localhost:3000/users") 
      .then(response => {
        commit('SET_ITEMS_USER', response.data)
      })
      .catch(e => {
        this.error.push(e)
        })
    },
    login: ({ commit, dispatch }, { token, user }) => {
      commit('SET_TOKEN', token);
      commit('SET_USER', user);
      // set auth header
      Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
    },
    logout: ({ commit }) => {
      commit('RESET', '');
    }
  },
  
  modules: {

  }
})
