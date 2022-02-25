<template>
  <div class="Edit">
    <div class="wrapper">

     <div class="form-inline">
       <h5><i class="fas fa-edit"></i>Edit Post</h5>
      <form>
        <input type="text" name="title" v-model="post.title" placeholder="Title" class="form-control shadow-none" autocomplete="off">
        <textarea name="details" v-model="post.details" placeholder="Details" class="form-control shadow-none" autocomplete="off"></textarea><br>
        <button type="submit" @click="updatePost(post)" class="btn btn-primary"><i class="fas fa-save"></i>Save</button>
        <router-link :to=" {name: 'Posts'} " class="btn btn-success"><i class="fas fa-back"></i>Back
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
          post: {}
      }
  },
  created() {
    if (!this.$store.getters.isLoggedIn) {
        this.$router.push('/login');
      }
      axios.get(`http://localhost:3000/posts/${this.$route.params.id}`)
        .then((result)=>{
          this.post = result.data
        })
  },
  methods: {
      updatePost(post) {
        axios.put(`http://localhost:3000/posts/${this.$route.params.id}`, post)
          .then((result)=>{
            this.$router.push({ name: 'Posts' })
          })
      }
  }
}
</script>

<style scoped>

</style>
