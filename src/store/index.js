import Vue from "vue";
import Vuex from "vuex";
import dinos from "./modules/dinos";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    dinos
  }
});
