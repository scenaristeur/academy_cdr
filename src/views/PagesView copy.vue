<template>
  <div>
    choix

    {{ aventure }}
  </div>
</template>

<script>
export default {
  name: "ChoixView",
  computed: {
    aventure() {
      return this.$store.state.solid_data.currentThing.aventure;
    },
  },
};
</script>

<style scoped></style>
