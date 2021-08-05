<template>
  <v-app>
    <!-- <main-page></main-page> -->
    <!-- <deal-page></deal-page> -->
    <history-page></history-page>
  </v-app>
</template>

<script>
import mainPage from "./views/main.vue";
import dealPage from "./views/deal.vue";
import historyPage from "./views/history.vue";
export default {
  name: "App",
  components: { mainPage, dealPage, historyPage },
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
