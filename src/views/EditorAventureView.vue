<template>
  <div v-if="aventure_url != null">
    <h1>{{ aventure.name }}</h1>
    <small>style:{{ aventure.style }}</small>
    <div v-html="aventure.content"></div>
  </div>
</template>

<script>
export default {
  name: "EditorAventureView",
  mounted() {
    this.$store.dispatch("solid_data/loadAventure");
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
