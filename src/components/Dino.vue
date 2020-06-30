<template>
  <div class="dinosaur">
    <div class="row">
      <div class="col-12">
        <span
          class="font-weight-bold align-middle h5"
          v-bind:class="[dino.isLarge ? 'text-uppercase' : '']"
          v-bind:style="getDinoStyle(dino.dinoColor)"
        >
          {{ dino.name }}
          <i v-if="dino.isDangerous" class="fas fa-claw-marks fa-lg mr-2"></i>
        </span>
      </div>
    </div>
    <div class="row">
      <div class="col-12 mt-2">
        Dino count:
        <button
          class="btn btn-sm btn-primary"
          v-on:click="$emit('decrease-dino-count', index)"
          v-bind:disabled="dino.count == 1"
        >
          <i class="fas fa-chevron-down"></i>
        </button>
        <span class="align-middle"> {{ dino.count }} </span>
        <button
          class="btn btn-sm btn-primary"
          v-on:click="$emit('increase-dino-count', index)"
        >
          <i class="fas fa-chevron-up"></i>
        </button>
        <button
          class="btn btn-danger btn-sm float-right"
          v-on:click="$emit('delete-dino', index)"
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
  </div>
</template>

<script>
module.exports = {
  name: "Dino",
  props: ["dino", "index"],
  methods: {
    getDinoStyle: function(dinoColor) {
      return {
        color: dinoColor
      };
    }
  },
  filters: {
    url: link => {
      if (!link) return "";
      link = link.toString();
      return "https://en.wikipedia.org/wiki/" + link;
    },
    undercase: value => {
      if (!value) return "";
      value = value.toString();
      return value.toLowerCase();
    }
  }
};
</script>
