<template>
 <div id="users">
   <div class="wrapper">
    
     <div class="form-inline">
       <h5>Add User</h5>
      <form @submit="addUser(user)">
        <input type="text" name="name" v-model="user.name" placeholder="Name" class="form-control shadow-none" autocomplete="off">
        <input type="password" name="password" v-model="user.password" placeholder="Password" class="form-control shadow-none" autocomplete="off">
        <input type="email" name="email" v-model="user.email" placeholder="Email" class="form-control shadow-none" autocomplete="off">
        <input type="phone" name="phone" v-model="user.phone" placeholder="Phone" class="form-control shadow-none" autocomplete="off"><br>
        <button type="submit" class="btn add"><i class="fas fa-plus"></i>Add</button>
      </form>
     </div>
    <h5>Users</h5>
    <table class="table" id="users">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Operation</th>
        </tr>
      </thead>
      <tbody class="table-hover">
        <tr v-for="(user) in users" :key="user.id">
          <td>{{user.id}}</td>
          <td>{{user.name}}</td>
          <td>{{user.email}}</td>
          <td>{{user.phone}}</td>
          <td>
            <button v-on:click="deleteUser(user)" class="btn btn-danger operation"><i class="fas fa-trash"></i></button>
            <router-link :to=" {name: 'EditUser', params: {id: user.id}} " class="btn btn-info operation"><i class="fas fa-pencil"></i>
            </router-link>
            <router-link :to=" {name: 'ShowUser', params: {id: user.id}} " class="btn btn-success operation"><i class="fas fa-eye"></i>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>

   </div>
 </div>
</template>

<script>
import {mapActions} from 'vuex';
import axios from 'axios'

export default {

  name: 'users',

  data() {
    return {
      user: {
        name: null,
        password: null,
        email: null,
        phone: null,
        
      },
      
    }
  }, 
  computed: {
    users() {
         return this.$store.getters.users;
      },
  },

  created() {
    if (!this.$store.getters.isLoggedIn) {
        this.$router.push('/login');
      }
    this.$store.dispatch('loadUsers');
    },
   updated() {
    if (!this.$store.getters.isLoggedIn) {
        this.$router.push('/login');
      }
    this.$store.dispatch('loadUsers');
   },
  methods: {
    addUser(user){
      if(user.name && user.password && user.email)
      {
        axios.post("http://localhost:3000/users", user)
          .then((result)=>{
            console.warn(result)
            this.$store.dispatch('loadUsers');
          })
        this.user.name = ''
        this.user.password = ''
        this.user.email = ''
        this.user.phone = ''
      }
    },
    deleteUser(user){
      axios.delete("http://localhost:3000/users/"+user.id, user)
        .then((result)=>{
          console.warn(result)
          this.$store.dispatch('loadUsers');
        })

    }
  },
  logout() {
    this.$store.dispatch('logout');
    this.$router.push('/login');
  },
  
}
</script>

<style>
.btn{
  padding: 5px 20px;
  margin: 20px 0px;
}
.add:hover {
 opacity: .6;
}
.add {
  background-color: #de6e66;
  color: aliceblue;
}
.table{
  text-align: center;
}
h5{
  font-weight: bold;
  margin: 20px 0;
}
i{
  padding-right: 10px;
}
.operation{
  padding: 5px 10px;
  margin: 0;
}
.operation i{
  padding-right: 0px;
}
.ml-5{
  margin-left: 5px;
}

.table thead>tr>th {
   vertical-align: bottom;
   border-bottom: 2px solid #de6e66;
}
.table tbody>tr {
  margin: 20px;
}
td{
  line-height: 60px;
}
.form-group{
  text-align: left;
  margin: 0 auto;
}
.form-control{
  color: #cf837e;
  padding: 10px;
  border-color: #de6e66;
  border-radius: 5px;
}

.res-td{
  color: #de6e66;
}
</style>