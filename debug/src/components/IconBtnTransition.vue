<template>
  <!-- ボタン遷移用のコンポーネント -->
  <div id="iconBtnTransition" class="btn" @click="gotoPage()">
    <v-icon class="material-icons icon-info" :style="addCss">{{icon}}</v-icon>
  </div>
</template>

<script>
/**
 * 特記
 * goto:'back'の場合は１つ戻る処理を行う
 */
export default {
  props: {
    id: Number,
    title: String,
    icon: String,
    goto: String,
    propItems: Object,
    addCss: Object,
  },
  data() {
    return {};
  },

  methods: {
    gotoPage() {
      if (this.goto.toLowerCase() === "back") {
        this.$router.go(-1);
      } else {
        this.$router.push({ name: this.goto, params: this.propItems });
      }
    },
  },
};
</script>

<style lang='scss' scoped>
#iconBtnTransition {
  .icon-info {
    font-size: $icon-size__square;
  }
}
</style>