<template>
  <!-- 共通ヘッダーコンポーネント -->
  <v-app-bar>
    <v-container id="topHeader">
      <v-row no-gutters>
        <!-- <v-col class="col-container" v-for="n in 3" :key="n" :cols="initHeaderContainerSize(n)"></v-col> -->
        <v-col cols="3" class="col-container leftBtn-container">
          <icon-btn-transition v-bind="leftBtn"></icon-btn-transition>
        </v-col>
        <v-col cols class="col-container">
          <h3 class="centerTitle">{{ title }}</h3>
        </v-col>
        <v-col cols="3" class="col-container rightBtn-container">
          <div
            class="btn rightBtn"
            v-for="rightBtn in rightBtnList"
            :key="rightBtn.id"
          >
            <icon-btn-transition v-bind="rightBtn"></icon-btn-transition>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
import IconBtnTransition from "@/components/IconBtnTransition.vue";
export default {
  props: {
    left: {
      id: 1,
      title: "back",
      icon: "arrow_back_ios",
      goto: "back",
      propItems: "",
      addCss: "",
    },
    right: [
      //表示的に２個までが限界（iPhoneX)
      //アイコンサイズをレスポンシブにすれば解決するが面倒
      {
        id: 1,
        title: "notify",
        icon: "notifications",
        goto: "notifications",
        propItems: {},
        addCss: {},
      },
      {
        id: 2,
        title: "setting",
        icon: "settings",
        goto: "topSetting",
        propItems: {},
        addCss: {},
      },
    ],

    id: Number,
    title: String,
    addCss: Object,
  },
  computed: {},
  data() {
    return {
      leftBtn: this.left,
      rightBtnList: this.right[0] ? this.right : [this.right],
    };
  },

  beforeCreate() {},
  methods: {
    // initHeaderContainerSize(index) {
    //   let colWidth = undefined; //undefined is auto resize
    //   if (index === 1) return (colWidth = 2);
    //   //戻るボタン
    //   else if (index === 2) return colWidth;
    //   //title表示部分
    //   else if (index === 3) return (colWidth = 4);
    //   //便利なボタン遷移部分
    //   return colWidth;
    // },
  },
  components: {
    IconBtnTransition,
  },
};
</script>

<style lang="scss" scoped>
#topHeader {
  padding: 0px;

  .col-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .leftBtn-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .centerTitle {
    text-overflow: hidden;
  }
  .rightBtn-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .rightBtn {
    padding: 0.25rem;
  }
}
</style>
