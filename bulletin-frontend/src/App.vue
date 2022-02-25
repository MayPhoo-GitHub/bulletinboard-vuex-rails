<template>
  <div id="app">
    <div id="nav">
      <router-link to="/users">
        <i class="fas fa-person"> Users  | </i>
      </router-link>
      <router-link to="/posts" >
        <i class="fas fa-pencil">  Posts </i>
      </router-link>

      <div v-if="isAuthenticated" class="dropdown">
        <button class="dropbtn">{{user}}</button>
          <div class="dropdown-content">
            <a @click="logout" >Logout</a>
          </div>
        </div>
    </div>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>
<script>

export default {
   data() {
    return {
      token: '',
      user: [],
      csv: null
    };
  },
  async created() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push('/login');
    }
    this.user = this.$store.getters.getUser.name;
  },
computed: { 
  isAuthenticated() {
    return this.$store.getters.isLoggedIn
  },
  
},
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/login');
    },
     exported(event) {
      console.log(event)
      this.isExported = true
      setTimeout(() => {
        this.isExported = false
      }, 3 * 1000)
     }
  }
};
</script>
<style>
#app {
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
  max-width: 1920px;
  margin: 0 auto;
}
#nav {
  padding: 20px;
  color: gainsboro;
  text-align: center;
}
.wrapper{
  width: 80%;
  margin: 0 auto;
}

#nav a {
  font-size: 22px;
  padding: 20px;
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  color: gainsboro;
  transition: .2s;

}
#nav a.router-link-exact-active {
  color: #de6e66;

}
#nav a.router-link {
  margin: 0 auto;
}
.dropbtn {
  color: #de6e66;
  padding: 16px;
  background-color: white;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

.dropdown {
  position: relative;
  display: inline-block;
  text-align: right

}

.dropdown-content {
  display: none;
  position: absolute;
  float: right;
  background-color: #de6e66;
  font-size: 12px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 12px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #de6e66;
  color: white;
}

.dropdown:hover .dropdown-content {
  display: block;
  color: white;
}



</style>