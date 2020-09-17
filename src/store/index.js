import Vue from "vue";
import Vuex from "vuex";
import popupModule from "./module/popup";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    popup: popupModule
  }
});
