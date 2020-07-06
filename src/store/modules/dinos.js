import dinos from "../../api/dinosAPI";

export default {
  strict: true,
  namespaced: true,
  state: {
    all: [], // initial state, it's empty first
    nextDinoId: 3
  },

  getters: {
    nextDinoId: state => {
      return state.nextDinoId;
    },
    allDinos: state => {
      return state.all;
    },
    totalSpecies: state => {
      return state.all.length;
    },
    totalDinos: state => {
      return state.all.reduce(function(total, dino) {
        return total + dino.count;
      }, 0);
    }
  },

  mutations: {
    SET_DINOS(state, dinos) {
      state.all = dinos;
    },
    DECREASE_DINO_COUNT(state, dinoIndex) {
      const dino = state.all.find(dino => dino.id === dinoIndex);
      dino.count--;
    },
    INCREASE_DINO_COUNT(state, dinoIndex) {
      const dino = state.all.find(dino => dino.id === dinoIndex);
      dino.count++;
    },
    DELETE_DINO(state, dinoIndex) {
      state.all = state.all.filter(dino => dino.id != dinoIndex);
    },
    ADD_DINO(state, dino) {
      state.all.push({
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
    getAllDinos({ commit }) {
      dinos.getDinos(dinos => {
        commit("SET_DINOS", dinos);
      });
    },
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
};
