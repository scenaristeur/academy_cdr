<template>
  <div>
    choix

    <CrudView
      v-if="pod != null"
      type="choix"
      :path="pod.aventureStore"
      :schema="choix_schema"
      :things="things"
      :parent="parent"
    />
  </div>
</template>

<script>
import choix_schema from "@/schemas/choix_schema.json";
import CrudView from "./CrudView.vue";

export default {
  name: "ChoixView",
  components: {
    CrudView,
  },
  data() {
    return {
      choix_schema: choix_schema,
    };
  },
  computed: {
    pod() {
      return this.$store.state.solid_data.pod;
    },
    parent() {
      return this.$store.state.solid_data.currentThing.page;
    },
    things() {
      return this.$store.state.solid_data.choix;
    },
  },
};
</script>

<style scoped></style>
