<template>
  <div class="editor">
    <h1>Editor</h1>

    <SolidLogin />

    <div class="list-group" v-if="aventure == null">
      <button
        v-for="aventure in aventures"
        v-bind:key="aventure.url"
        v-on:click="choose(aventure.data.url)"
        type="button"
        class="list-group-item list-group-item-action list-group-item-primary"
      >
        {{ aventure.name }}
      </button>
    </div>

    <div v-else>
      {{ aventure }}
      <button class="btn btn-primary" v-on:click="choose(null)">return to list</button>
    </div>
  </div>
</template>
<script>
import SolidLogin from "@/components/SolidLogin.vue";

export default {
  name: "EditorView",
  components: {
    SolidLogin,
  },
  methods: {
    choose(url) {
      this.$store.dispatch("solid_data/chooseAventure", url);
    },
  },
  watch: {
    session() {
      if (this.session != null) {
        if (this.session.isLoggedIn == true) {
          this.$store.dispatch("solid_data/getAventures", this.session);
        }
      }
    },
  },
  computed: {
    config() {
      return this.$store.state.config.config;
    },
    session() {
      return this.$store.state.solid.session;
    },
    aventures() {
      return this.$store.state.solid_data.aventures;
    },
    aventure() {
      return this.$store.state.solid_data.aventure;
    },
  },
};
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
