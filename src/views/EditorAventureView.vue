<template>
  <div v-if="aventure_url != null && aventure != null">
    <div class="form-group">
      <label for="Titre">Titre</label>
      <input
        class="form-control"
        id="Titre"
        placeholder="titre"
        v-model="aventure.name"
      />
    </div>
    <div class="form-group">
      <label for="style">style</label>
      <input
        class="form-control"
        id="style"
        placeholder="style"
        v-model="aventure.style"
      />
    </div>

    <div class="form-group">
      <label for="description">description</label>
      <textarea
        class="form-control"
        id="style"
        placeholder="description"
        v-model="aventure.description"
      />
    </div>

    <div class="form-group">
      <label for="start">start</label>
      <input
        class="form-control"
        id="start"
        placeholder="start"
        v-model="aventure.start"
      />
    </div>

    <button @click="enregistrer" class="btn btn-primary">Enregistrer</button>
  </div>
</template>

<script>
export default {
  name: "EditorAventureView",
  mounted() {
    this.$store.dispatch("solid_data/loadAventure");
  },
  methods: {
    enregistrer() {
      console.log("enregistrer", this.aventure);
      this.aventure.url = this.aventure_url;
      this.$store.dispatch("solid_data/saveAventure", this.aventure);
    },
  },
  computed: {
    aventure_url() {
      return this.$store.state.solid_data.aventure_url;
    },
    aventure() {
      return this.$store.state.solid_data.aventure;
    },
  },
};
</script>

<style scoped></style>
