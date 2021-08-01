<template>
  <div class="about">
    <h1>This is an about page</h1>
    <v-btn @click="goback()">go back (goto top)</v-btn>
    <a @click="$router.go(-1)">back</a>
  </div>
</template>
<script>
export default {
  data() {
    return { name: "" };
  },
  mounted() {
    console.log("home", this.$router);
  },
  methods: {
    goback() {
      console.log("goback", this.$router.path);
      this.$router.push("/");
    },
  },

  beforeRouteLeave(to, from, next) {
    const answer = window.confirm(
      "Do you really want to leave? you have unsaved changes!"
    );
    if (answer) {
      next();
    } else {
      next(false);
    }
  },
};
</script>
