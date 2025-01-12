<template>
  <div>
    <h1>CrudAventure</h1>

    <!-- TITRE -->
    <div class="mb-3">
      <label for="titre" class="form-label">Titre</label>
      <input
        type="text"
        class="form-control"
        id="titre"
        aria-describedby="titreHelp"
        v-model="tempAventure.name"
      />
      <div id="titreHelp" class="form-text">Le titre de votre aventure.</div>
    </div>
    <!-- DESCRIPTION -->
    <div class="mb-3">
      <label for="description" class="form-label">Description</label>
      <textarea
        type="text"
        class="form-control"
        id="description"
        aria-describedby="descriptionHelp"
        v-model="tempAventure.description"
      />
      <div id="descriptionHelp" class="form-text">La description de votre aventure.</div>
    </div>

    <button v-on:click="enregistrer" class="btn btn-primary">Enregistrer</button>
  </div>
</template>

<script>
export default {
  name: "CrudAventure",
  data() {
    return {
      tempAventure: {
        id: "",
        name: "",
        description: "",
        url: "",
        pages: [],
        style: "",
        start: 0,
        version: 0,
        author: "",
      },
    };
  },
  methods: {
    enregistrer() {
      console.log("enregistrer", this.tempAventure);
      this.$store.dispatch("solid_data/saveAventure", this.aventure);
    },
    // initAventure() {
    //   this.tempAventure = ;
    // },
  },
  // watch: {
  //   aventure() {
  //     console.log("aventure", this.aventure);
  //     if (this.aventure == null) {
  //       this.initAventure();
  //     }
  //   },
  // },
  // computed: {
  //   aventure() {
  //     return this.$store.state.solid_data.aventure;
  //   },
  // },
};
</script>

<style scoped></style>
