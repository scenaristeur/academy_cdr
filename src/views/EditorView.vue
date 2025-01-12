<template>
  <div class="editor">
    <h1>Editor</h1>

    <SolidLogin />

    <div class="list-group" v-if="aventure_url == null">
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
      <!-- {{ aventure_url }} -->
      <button class="btn btn-primary" v-on:click="choose(null)">return to list</button>

      <RouterLink to="/crudaventure">CRUD Aventure</RouterLink>
      <!-- <EditorAventureView v-if="aventure_url != null" /> -->
    </div>
  </div>
</template>
<script>
import SolidLogin from "@/components/SolidLogin.vue";

// import EditorAventureView from "@/views/EditorAventureView.vue";

export default {
  name: "EditorView",
  components: {
    SolidLogin,
    // EditorAventureView,
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
    aventure_url() {
      return this.$store.state.solid_data.aventure_url;
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
