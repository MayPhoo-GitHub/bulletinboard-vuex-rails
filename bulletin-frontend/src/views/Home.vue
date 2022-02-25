// src/views/Home.vue

<template>
  <div>
    <h1 class="text-center">Hi {{ user }}</h1>

  </div>
 
</template>

<script>

export default {
  data() {
    return {
      token: '',
      user: []
    };
  },
  async created() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push('/login');
    }

    this.user = this.$store.getters.getUser.name;
  },
};
</script>