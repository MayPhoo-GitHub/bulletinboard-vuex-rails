// src/views/Login.vue

<template>

    <div class="container text-center">
      <h2 class="text-center">Login Form</h2>
      <input type="text" placeholder="Username" v-model="name" class="form-control shadow-none"/>
      <input type="password" placeholder="Password" v-model="password" class="form-control shadow-none" /> <br>
      <input type="button" class="btn add" @click="login" value="Login" />
      <p v-if="msg">{{ msg }}</p>
    </div>
</template>
<script>
import AuthService from '@/services/AuthService.js';

export default {
  data() {
    return {
      name: '',
      password: '',
      msg: ''
    };
  },
  methods: {
    async login() {
      try {
        const credentials = {
          name: this.name,
          password: this.password
        };
        const response = await AuthService.login(credentials);
        this.msg = response.msg;
        const token = response.token;
        const user = response.user;
        this.$router.push('/posts');
        this.$store.dispatch('login', { token, user });
      } catch (error) {
        this.msg = error.response;
      }
    }
  }
};
</script>
<style >
.container {
  width: 60%;
  margin: 0 auto;
  margin-top: 50px;
}
</style>