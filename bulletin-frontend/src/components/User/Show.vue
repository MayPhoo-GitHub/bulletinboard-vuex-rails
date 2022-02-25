<template>
  <div class="Edit">
    <div class="wrapper">

     <div class="form-inline">
       <h5><i class="fas fa-eye"></i>User Details</h5>
      <form>
        <input type="text" name="name" v-model="user.name" placeholder="Name" class="form-control shadow-none" autocomplete="off">
        <input type="password" name="password" v-model="user.password" placeholder="Password" class="form-control shadow-none" autocomplete="off">
        <input type="email" name="email" v-model="user.email" placeholder="Email" class="form-control shadow-none" autocomplete="off">
        <input type="phone" name="phone" v-model="user.phone" placeholder="Phone" class="form-control shadow-none" autocomplete="off"><br>
        <router-link :to=" {name: 'Users'} " class="btn btn-success"><i class="fas fa-back"></i>Back
        </router-link>
      </form>
     </div>

    </div>
  </div>
</template>

<script>

import axios from 'axios'
export default {
  name: 'Edit',
  data() {
      return {
          user: {}
      }
  },
  created() {
    if (!this.$store.getters.isLoggedIn) {
        this.$router.push('/login');
    }
    axios.get(`http://localhost:3000/users/${this.$route.params.id}`)
      .then((result)=>{
        this.user = result.data
      })
  },
  methods: {
      showUser(user) {
        axios.get(`http://localhost:3000/users/${this.$route.params.id}`)
          .then((result)=>{
            this.user = result.data
          })
      }
  }
}
</script>

<style>
.form-group{
  text-align: left;
  margin: 0 auto;
}
.form-control{
  width: 50%;
  margin-bottom: 10px;
  display: inline-block;
}

</style>
