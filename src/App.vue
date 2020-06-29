<template>
  <div id="app">
    <JurassicWorld msg="Welcome to Jurassic World" />
  </div>
</template>

<script>
import JurassicWorld from "./components/JurassicWorld.vue";

export default {
  name: "App",
  components: {
    JurassicWorld
  }
};
</script>

<style>
#app {
  background-image: url("assets/extinction.jpg");
  min-height: 100vh;
  background-size: cover;
  background-blend-mode: lighten;
  background-repeat: no-repeat;
  background-color: rgba(255, 255, 255, 0.7) !important;
}
</style>
