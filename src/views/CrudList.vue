<template>
  <div class="list-group">
    <button
      v-for="thing in things"
      v-bind:key="thing.url"
      v-on:click="select(thing)"
      type="button"
      class="list-group-item list-group-item-action list-group-item-primary"
    >
      {{ thing.content.name }}
      <button class="btn btn-primary btn-sm" @click.stop="pages(thing)">pages</button>
      <button class="btn btn-primary btn-sm" @click.stop="choix(thing)">choix</button>
      <button class="btn btn-danger btn-sm" @click.stop="supprime(thing)">X</button>
    </button>
  </div>
</template>

<script>
import * as bootstrap from "bootstrap";
export default {
  name: "CrudList",
  props: ["things", "type"],
  methods: {
    pages(thing) {
      console.log("pages", thing);
    },
    choix(thing) {
      console.log("choix", thing);
    },
    supprime(thing) {
      let confirme = confirm("Supprimer " + thing.url + " ?");
      if (confirme) {
        this.$store.dispatch("solid_data/deleteThing", thing);
      }
    },
    select(thing) {
      // this.$emit("select", url);
      this.$store.commit("solid_data/setCurrentThing", thing);
      const myModal = new bootstrap.Modal(
        "#" + this.type + "Modal" // " + type + 'Modal'"
        //  {
        //   keyboard: false,
        // }
      );

      // const modalToggle = document.getElementById("toggleMyModal");
      myModal.show();
    },
  },
};
</script>

<style scoped></style>
