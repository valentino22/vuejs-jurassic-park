import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    dinos: [
      {
        id: 0,
        name: "Velociraptor",
        count: 2,
        isLarge: false,
        isDangerous: true,
        dinoColor: "#ffca00"
      },
      {
        id: 1,
        name: "T-rex",
        count: 1,
        isLarge: true,
        isDangerous: true,
        dinoColor: "#ff6e0a"
      },
      {
        id: 2,
        name: "Diplodocus",
        count: 3,
        isLarge: true,
        isDangerous: false,
        dinoColor: "#ff6e0a"
      }
    ],
    nextDinoId: 3
  },

  getters: {
    nextDinoId: state => {
      return state.nextDinoId;
    },
    allDinos: state => {
      return state.dinos;
    },
    totalSpecies: state => {
      return state.dinos.length;
    },
    totalDinos: state => {
      return state.dinos.reduce(function(total, dino) {
        return total + dino.count;
      }, 0);
    }
  },

  mutations: {
    DECREASE_DINO_COUNT(state, dinoIndex) {
      const dino = state.dinos.find(dino => dino.id === dinoIndex);
      dino.count--;
    },
    INCREASE_DINO_COUNT(state, dinoIndex) {
      const dino = state.dinos.find(dino => dino.id === dinoIndex);
      dino.count++;
    },
    DELETE_DINO(state, dinoIndex) {
      state.dinos = state.dinos.filter(dino => dino.id != dinoIndex);
    },
    ADD_DINO(state, dino) {
      state.dinos.push({
        id: state.nextDinoId,
        name: dino.name,
        count: 1,
        isLarge: dino.isLarge,
        isDangerous: dino.isDangerous,
        dinoColor: dino.dinoColor
      });
    },
    INCREASE_NEXT_DINO_ID(state) {
      state.nextDinoId++;
    }
  },

  actions: {
    decreaseDinoCount({ commit }, dinoIndex) {
      commit("DECREASE_DINO_COUNT", dinoIndex);
    },
    increaseDinoCount({ commit }, dinoIndex) {
      commit("INCREASE_DINO_COUNT", dinoIndex);
    },
    deleteDino({ commit }, dinoIndex) {
      commit("DELETE_DINO", dinoIndex);
    },
    addDino({ commit }, dino) {
      commit("ADD_DINO", dino);
      commit("INCREASE_NEXT_DINO_ID");
    },
    increateNextDinoId({ commit }) {
      commit("INCREASE_NEXT_DINO_ID");
    }
  }
});
