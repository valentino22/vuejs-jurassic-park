/**
 * Mocking client-server processing
 */
const _dinos = [
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
];

export default {
  getDinos(cb) {
    setTimeout(() => cb(_dinos), 500);
  }
};
