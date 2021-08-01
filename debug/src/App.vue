<template>
  <v-app>
    <!-- <main-page></main-page> -->
    <deal-page></deal-page>
  </v-app>
</template>

<script>
import mainPage from "./views/main.vue";
import dealPage from "./views/deal.vue";
export default {
  name: "App",
  components: { mainPage, dealPage },
  data: () => {
    return {};
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {},
};
</script>
<style lang="scss"></style>
