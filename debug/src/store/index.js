import Vue from "vue";
import Vuex from "vuex";
import cds from "./checkDeviceState.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    snackbarState: {
      namespaced: true,
      state: () => ({
        isSnackbar: false,
        message: "tes",
        timeout: 3000,
      }),
      getters: {
        getSnackbarObj(state) {
          let obj = {
            isSnackbar: state.isSnackbar,
            message: state.message,
            timeout: state.timeout,
          };
          return obj;
        },
        getIsSnackbar(state) {
          return state.isSnackbar;
        },
        getMessage(state) {
          return state.message;
        },
      },
      mutations: {},
      actions: {
        //APIs
        fire({ state, dispatch }, { message, timeout }) {
          message ? dispatch("setMessage", message) : null;
          timeout ? (state.timeout = timeout) : null;
          dispatch("setIsSnackbar", true);
        },
        //setter
        setIsSnackbar({ state }, bool) {
          state.isSnackbar = bool;
        },
        setMessage({ state }, msg) {
          state.message = msg;
        },
      },
    },
  },
});

// const tes = {
//   state: () => ({
//     tes2: "tes2",
//     meth() {
//       console.log("meth", this);
//     },
//   }),
// };
