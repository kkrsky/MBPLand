//内部jsライブラリ読み込み
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import checkAuthBeforeRoute from "./router/checkAuthBeforeRoute.js";

//for test
// import virtualCordova from "./virtualCordova.js";
import tes from "./mixins/tes";
// virtualCordova.start();

//外部jsライブラリ読み込み
// let script = document.createElement("script");
// script.src =
//   "https://maps.googleapis.com/maps/api/js?key=" +
//   process.env.APIKEY_GOOGLE_ANDROID;
// document.head.appendChild(script);
// checkAuthBeforeRoute.init(router);

//cssライブラリ読み込み
import "vuetify/dist/vuetify.min.css";
// import "../node_modules/leaflet/dist/leaflet.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";

//ライブラリ宣言
Vue.config.productionTip = false;
// Vue.mixin(tes);

window.gasFunc = (key) => {
  let result = {};
  switch (key) {
    case "getSheetUserList": {
      result = {
        sheetName: "user",
        dataLabelArry: [
          "id",
          "createAt",
          "deleteAt",
          "name",
          "userId",
          "Status",
          "Icon",
          "undef",
        ],
        sheetDataArry: [
          [
            1,
            "2021-07-31T12:54:12.107Z",
            "",
            "紅林 亮平",
            "U908d37a8e2f8d8ccf51edcf44ddbffd1",
            "Guest",
            "https://drive.google.com/uc?id=1lM0CcoR__FzewvQ6kuH-mrksZRuSsOoG&export=download&access_token=ya29.a0ARrdaM8yU1OcVmrafNPEkFbPmjeTwGqe4yjx63UrUQIxytKycqpAlcC6MfBgDBzWOWIrrw3We_oJWtxP7tgUbD6eUwwsICk_EIvOzBGe2en7Dp8S--bVfy6zPvgHiB__3_RZAFWQ7hoMm0Mn_-2bKxqrbj-jlQE",
            0,
          ],
          [
            2,
            "2021-07-31T12:54:12.107Z",
            "",
            "a",
            "a",
            "Guest",
            "https://drive.google.com/uc?id=1lM0CcoR__FzewvQ6kuH-mrksZRuSsOoG&export=download&access_token=ya29.a0ARrdaM8yU1OcVmrafNPEkFbPmjeTwGqe4yjx63UrUQIxytKycqpAlcC6MfBgDBzWOWIrrw3We_oJWtxP7tgUbD6eUwwsICk_EIvOzBGe2en7Dp8S--bVfy6zPvgHiB__3_RZAFWQ7hoMm0Mn_-2bKxqrbj-jlQE",
            0,
          ],
          [
            3,
            "2021-07-31T12:54:12.107Z",
            "",
            "b",
            "c",
            "Guest",
            "https://drive.google.com/uc?id=1lM0CcoR__FzewvQ6kuH-mrksZRuSsOoG&export=download&access_token=ya29.a0ARrdaM8yU1OcVmrafNPEkFbPmjeTwGqe4yjx63UrUQIxytKycqpAlcC6MfBgDBzWOWIrrw3We_oJWtxP7tgUbD6eUwwsICk_EIvOzBGe2en7Dp8S--bVfy6zPvgHiB__3_RZAFWQ7hoMm0Mn_-2bKxqrbj-jlQE",
            0,
          ],
        ],
      };
      break;
    }
    case "getSubscribeList": {
      result = {
        dataLabelArry: ["itemList", "totalPrice", "totalBuy"],
        sheetDataArry: [
          ["米", "", ""],
          ["卵", "", ""],
          ["牛乳", "", ""],
        ],
        sheetName: "subscribe",
      };

      break;
    }
  }
  console.log("gasFunc", key, result);

  return JSON.stringify(result);
};

//Vue初期化
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
