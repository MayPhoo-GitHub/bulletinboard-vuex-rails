<template>
  <div class="Edit">
    <div class="wrapper">

     <div class="form-inline">
       <h5><i class="fas fa-edit"></i>Edit User</h5>
      <form>
        <input type="text" name="name" v-model="user.name" placeholder="Name" class="form-control shadow-none" autocomplete="off">
        <input type="password" name="password" v-model="user.password" placeholder="Password" class="form-control shadow-none" autocomplete="off">
        <input type="email" name="email" v-model="user.email" placeholder="Email" class="form-control shadow-none" autocomplete="off">
        <input type="phone" name="phone" v-model="user.phone" placeholder="Phone" class="form-control shadow-none" autocomplete="off"><br>
        <button type="submit" @click="updateUser(user)" class="btn btn-primary"><i class="fas fa-save"></i>Save</button>
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
      axios.get(`http://localhost:3000/users/${this.$route.params.id}`)
        .then((result)=>{
          this.user = result.data
        })
  },
  methods: {
      updateUser(user) {
        axios.put(`http://localhost:3000/users/${this.$route.params.id}`, user)
          .then((result)=>{
            this.$router.push({ name: 'Users' })
          })
      }
  }
}
</script>

<style scoped>

</style>
