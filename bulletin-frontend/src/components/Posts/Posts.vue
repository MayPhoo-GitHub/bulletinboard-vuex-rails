<template>
 <div id="posts">
   <div class="wrapper">
    <div class="form-inline">
      <h5>Add Post</h5>
      <form @submit="addPost(post)">
        <input type="text" name="title" v-model="post.title" placeholder="Title" class="form-control shadow-none" autocomplete="off">
        <textarea name="details" v-model="post.details" placeholder="Details" class="form-control shadow-none" autocomplete="off"></textarea><br>
        <button type="submit" class="btn add"><i class="fas fa-plus"></i>Add</button>
      </form>
    </div>
    <h5>Posts</h5>
    <form >
      <div class="search-box">
       <input class="form-control shadow-none " name="keyword" v-model='keyword'  placeholder="Search Post">
       <input type="button" class="btn add" @click="search(keyword)" value="search" />
      </div>
    </form>
      <input type="file" class="form-control shadow-none" accept= 'text/csv' id="file" ref="file" @change="handleFileUpload( $event )"/>
      <button class="btn add" v-on:click="submitFile()">Import Csv</button>
      <download-csv
            :data="posts"
            :name="dataFile"
            :labels="labels"
            :fields="fields"
            v-on:export-finished="exported">
          <button class="btn export"><i class="fas fa-print"></i>Export to csv</button>
    </download-csv> 
      <br>
    <div v-for="(post) in posts" :key="post.id">
      <h2 class="header">{{post.title}}</h2>
      <div class="content">{{post.details}} <br>
        <button v-on:click="deletePost(post)" class="btn btn-danger operation"><i class="fas fa-trash"></i></button>
        <router-link :to=" {name: 'EditPost', params: {id: post.id}} " class="btn btn-info operation"><i class="fas fa-pencil"></i>
        </router-link>
        <router-link :to=" {name: 'ShowPost', params: {id: post.id}} " class="btn btn-success operation"><i class="fas fa-eye"></i>
        </router-link>
      </div>
    </div>
    <VueTailwindPagination
      :current="currentPage"
      :total="total"
      :per-page="perPage"
      @page-changed="onPageClick($event)"
    />
  </div>
 </div>
</template>

<script>
import JsonCSV from '/src/JsonCSV.vue'
import JwPagination from '/src/JwPagination';
import "@ocrv/vue-tailwind-pagination/dist/style.css";
import VueTailwindPagination from "@ocrv/vue-tailwind-pagination";
import {mapActions} from 'vuex';
import axios from 'axios'
export default {

  name: 'Posts',
  components: {
    'download-csv': JsonCSV,
    JwPagination,
    VueTailwindPagination
  },
  data() {
    return {
      post: {
        title: null,
        details: null,
      },
      currentPage: 0,
      perPage: 0,
      total: 0,
      data: [],
      csv: null,
      keyword: "",
      file: '',
      dataFile: 'post_list.csv',
      labels: {
        id: 'Post Id',
        title: 'Title',
        details: 'Details'
      },
      fields: ['id', 'title', 'details', 'created_at'],
      isExported: false

    }
  },
  computed: {
    posts() {
         return this.$store.getters.posts;
      },
  },
mounted() {
    this.currentPage = 2;
    this.getData(this.currentPage);
},
  created() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push('/login');
    }  
    this.$store.dispatch('loadPosts');
    },


  methods: {
      ...mapActions([
          'search'
      ]),
      handleFileUpload(){
       this.file = this.$refs.file.files[0];
      },
    submitFile(){
      let formData = new FormData();
      formData.append('file', this.file);
      axios.post( 'http://localhost:3000/posts/import',formData,{headers: {'Content-Type': 'multipart/form-data'}})
      .then(function(){
        console.log('SUCCESS!!');
      })
      .catch(function(){
        console.log('FAILURE!!');
      });
    },
   onPageClick(event) {
      this.currentPage = event;
      this.getData(this.currentPage);
    },
    async getData(pageNumber) {
      console.warn(pageNumber)
      var response = await axios.get(
        "http://localhost:3000/posts/?page=" +pageNumber
      );
      var responseData = response.data;
      this.currentPage = responseData.page;
      this.perPage = responseData.per_page;
      this.total = responseData.total;
      this.data = response.data.data;
    },
    addPost(post){
      if(post.title && post.details)
      {
        axios.post("http://localhost:3000/posts", post)
          .then((result)=>{
            console.warn(result)
            this.$store.dispatch('loadPosts');
          })
        this.post.title = ''
        this.post.details = ''
      }
    },
    deletePost(post){
      axios.delete("http://localhost:3000/posts/"+post.id, post)
        .then((result)=>{
          console.warn(result)
          this.$store.dispatch('loadPosts');
        })

    },
  },
  
}

</script>

<style>
.btn{
  padding: 5px 20px;
  margin: 20px 0px;
  margin-left: 10px;
}

h5{
  font-weight: bold;
  margin: 20px 0;
}
i{
  padding-right: 10px;
}
.header {
  border-style:solid transparent;
  background-color: #de6e66;
  border-color: #de6e66;
  padding: 10px;
  margin: 0 auto;
  color: #fff;
  border-radius: 10px 10px 0 0;
}
.content {
  border:solid 1px;
  border-color: #de6e66;
  font-size: 16px;
  color: #de6e66;
  padding: 30px;
  margin: 0 auto;
  margin-bottom: 20px;
  border-radius: 0 0 10px 10px;
}

.form-group{
  text-align: left;
  margin: 0 auto;
}
.form-control-search {
  width: 10%;
  display: inline-block;
}
.form-control{
  width: 50%;
  margin-right: 10px;
  display: inline-block;
  border-color: #de6e66;
}
.search-box {
  width: 40%;
}
.export {
  background-color:aliceblue;
  color:  #de6e66;
  border-color: #de6e66;
}

</style>