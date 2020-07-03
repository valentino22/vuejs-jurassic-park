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
        <form v-on:submit.prevent="addDinosaur">
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
                v-model="dinoName"
                v-bind:class="[isLarge ? 'text-uppercase' : '']"
                v-focus
                id="dinoName"
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
          <Dino
            class="list-group-item my-2"
            v-for="dino in allDinos"
            v-bind:dino="dino"
            v-bind:key="dino.id"
          >
          </Dino>
        </ul>
      </div>
      <div v-else class="card p-4 my-3 stats-item">
        You have no dinosaurs in Jurassic Park.
      </div>
    </div>
  </div>
</template>

<script>
import debounce from "lodash-es/debounce";
import Dino from "../components/Dino.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "JurassicWorld",
  data: () => ({
    title: "Jurassic Park",
    dinoName: "",
    isLarge: false,
    isDangerous: false,
    dinoColor: "#ffb930",
    noMoreDinos: false,
    buttonText: "Add Dino"
  }),
  methods: {
    ...mapActions(["addDino"]),
    addDinosaur() {
      if (this.dinoName != "") {
        this.addDino({
          name: this.dinoName,
          count: 1,
          isLarge: this.isLarge,
          isDangerous: this.isDangerous,
          dinoColor: this.dinoColor
        });
        this.dinoName = "";
        this.isLarge = false;
        this.isDangerous = false;
        this.dinoColor = "#ffb930";
      }
    }
  },
  computed: {
    ...mapGetters(["allDinos", "totalSpecies", "totalDinos"]),
    styles() {
      return {
        color: this.dinoColor
      };
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
    dinoName: debounce(function() {
      this.buttonText =
        this.dinoName !== "" ? "Add " + this.dinoName : "Add Dino";
    }, 250)
  },
  components: {
    Dino
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
