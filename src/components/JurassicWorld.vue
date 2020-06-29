<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-3">
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item active text-white">
          {{ title }}
        </li>
      </ul>
    </nav>
    <div id="content">
      <div class="card pt-4 px-4 content-item">
        <h5 class="card-title">Add new dino species</h5>
        <form v-on:submit.prevent="addDino">
          <fieldset v-bind:disabled="noMoreDinos" class="my-2">
            <label
              for="large"
              class="mr-3 pl-0 btn form-check-label user-select-none "
              >Large <input type="checkbox" v-model="isLarge" id="large"
            /></label>
            <label
              for="dangerous"
              class="mr-3 pl-0 btn form-check-label user-select-none "
              >Dangerous
              <input type="checkbox" v-model="isDangerous" id="dangerous"
            /></label>
            <label
              for="dinoColor"
              class="mr-3 pl-0 btn form-check-label user-select-none "
              >Color
              <input
                type="color"
                v-model="dinoColor"
                id="dinoColor"
                name="dinoColor"
            /></label>
          </fieldset>
          <fieldset class="row" v-bind:disabled="noMoreDinos">
            <div class="input-group col-12">
              <input
                placeholder="Dino name..."
                v-model="dinoForm"
                v-bind:class="[isLarge ? 'text-uppercase' : '']"
                v-focus
                id="dinoForm"
                v-bind:style="styles"
              />
              <div class="input-group-append">
                <span class="input-group-text">
                  <i v-show="isDangerous" class="fas fa-claw-marks fa-lg"></i>
                  <i v-show="!isDangerous" class="claw-paceholder"></i>
                </span>
                <button class="btn btn-primary btn-sm ml-2">
                  {{ buttonText }}
                </button>
              </div>
            </div>
          </fieldset>
          <fieldset class="my-2">
            <div class="form-check form-check-inline">
              <label
                for="noMore"
                class="form-check-label pl-0 pr-1 btn user-select-none"
                >Meteor impact</label
              >
              <input
                type="checkbox"
                class="form-check-input"
                v-model="noMoreDinos"
                id="noMore"
              />
            </div>
          </fieldset>
        </form>
      </div>
      <div v-if="totalSpecies > 0" class="card p-4 my-3 stats-item">
        <h5 class="card-title">Stats</h5>
        <div class="mb-2">
          <span class="my-2">Total Species: {{ totalSpecies }}</span>
          <span class="my-2 ml-4">Total Dinos: {{ totalDinos }}</span>
        </div>
        <ul class="list-group list-group-flush">
          <li
            class="list-group-item my-2"
            v-bind:key="(dino, index)"
            v-for="(dino, index) in dinos"
          >
            <div class="row">
              <div class="col-12">
                <span
                  class="font-weight-bold align-middle h5"
                  v-bind:class="[dino.isLarge ? 'text-uppercase' : '']"
                  v-bind:style="getDinoStyle(dino.dinoColor)"
                >
                  {{ dino.name }}
                  <i
                    v-if="dino.isDangerous"
                    class="fas fa-claw-marks fa-lg mr-2"
                  ></i>
                </span>
              </div>
              <div class="col-12 mt-2">
                Dino count:
                <button
                  class="btn btn-sm btn-primary"
                  v-on:click="decreaseDinoCount(index)"
                  v-bind:disabled="dino.count == 1"
                >
                  <i class="fas fa-chevron-down"></i>
                </button>
                <span class="align-middle"> {{ dino.count }} </span>
                <button
                  class="btn btn-sm btn-primary"
                  v-on:click="increaseDinoCount(index)"
                >
                  <i class="fas fa-chevron-up"></i>
                </button>
                <button
                  class="btn btn-danger btn-sm float-right"
                  v-on:click="deleteDino(index)"
                >
                  Make extinct
                  <i class="fas fa-meteor fa-lg"></i>
                </button>
              </div>
            </div>
            <div class="row my-2">
              <span class="col-12"
                >URL:
                <a :href="dino.name | undercase | url" target="_blank"
                  >{{ dino.name | undercase | url }}
                </a>
              </span>
            </div>
          </li>
        </ul>
      </div>
      <div v-else class="card p-4 my-3 stats-item">
        You have no dinosaurs in Jurassic Park.
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: "JurassicWorld",
  data: () => ({
    title: "Jurassic Park",
    buttonText: "Add Dino",
    isLarge: false,
    noMoreDinos: false,
    dinoForm: "",
    isDangerous: false,
    dinoColor: "#ffb930",
    dinos: [
      {
        name: "Velociraptor",
        count: 2,
        isLarge: false,
        isDangerous: true,
        dinoColor: "#ffca00"
      },
      {
        name: "T-rex",
        count: 1,
        isLarge: true,
        isDangerous: true,
        dinoColor: "#ff6e0a"
      },
      {
        name: "Diplodocus",
        count: 3,
        isLarge: true,
        isDangerous: false,
        dinoColor: "#ff6e0a"
      }
    ]
  }),
  methods: {
    addDino: function() {
      if (this.dinoForm != "") {
        this.dinos.push({
          name: this.dinoForm,
          count: 1,
          isLarge: this.isLarge,
          isDangerous: this.isDangerous,
          dinoColor: this.dinoColor
        });
        this.dinoForm = "";
        this.isLarge = false;
        this.isDangerous = false;
        this.dinoColor = "#ffb930";
      }
    },
    deleteDino: function(index) {
      this.dinos.splice(index, 1);
    },
    increaseDinoCount: function(idx) {
      this.dinos[idx].count++;
    },
    decreaseDinoCount: function(idx) {
      this.dinos[idx].count--;
    },
    getDinoStyle: function(dinoColor) {
      return {
        color: dinoColor
      };
    }
  },
  computed: {
    totalSpecies: function() {
      return this.dinos.length;
    },
    totalDinos: function() {
      return this.dinos.reduce(function(total, dino) {
        return total + dino.count;
      }, 0);
    },
    styles: function() {
      return {
        color: this.dinoColor
      };
    }
  },
  filters: {
    undercase: value => {
      if (!value) return "";
      value = value.toString();
      return value.toLowerCase();
    },
    url: link => {
      if (!link) return "";
      link = link.toString();
      return "https://en.wikipedia.org/wiki/" + link;
    }
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  },
  watch: {
    dinoForm: _.debounce(function() {
      this.buttonText =
        this.dinoForm !== "" ? "Add " + this.dinoForm : "Add Dino";
    }, 250)
  }
};
</script>

<style scoped>
#content {
  display: grid;
  grid-template-columns: 1fr 500px 1fr;
  grid-template-areas:
    ". content ."
    ". stats .";
}
.content-item {
  grid-area: content;
}
.stats-item {
  grid-area: stats;
}
.claw-paceholder {
  width: 21px;
}
.card {
  box-shadow: 0px 6px 20px rgb(0, 0, 0);
}
</style>
