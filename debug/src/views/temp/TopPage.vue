<template>
  <div>
    <v-navigation-drawer app :right="true">
      <!-- -->
      <p>drawer</p>
    </v-navigation-drawer>

    <!-- -->
    <!-- <p>bar</p> -->
    <top-header :title="'standard'"></top-header>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <p>main</p>
      <!-- Provides the application the proper gutter -->
      <v-container>
        <p>container</p>
        <test-gps></test-gps>
      </v-container>
    </v-main>
    <top-footer></top-footer>
  </div>
</template>

<script>
import testGps from "./testGps.vue";
import IconBtnTransition from "../components/IconBtnTransition.vue";
import TopHeader from "../components/TopHeader.vue";
import TopFooter from "@/components/TopFooter.vue";
export default {
  name: "App",

  components: {
    testGps,
    IconBtnTransition,
    TopHeader,
    TopFooter,
  },
  mounted() {
    console.log("top", this.$router);
  },

  data: () => ({
    //
    left: {
      id: 1,
      title: "tes",
      icon: "settings",
      goto: "topHome",
      propItems: "",
      addCss: {},
    },
  }),
};
</script>
<style lang="scss"></style>
