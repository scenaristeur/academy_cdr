<template>
  <div>
    pages
    <!--
    {{ aventure }}
    <hr />
    {{ page_schema }} -->

    <CrudView
      v-if="pod != null"
      type="page"
      :path="pod.aventureStore"
      :schema="page_schema"
      :things="things"
      :parent="aventure"
    />
  </div>
</template>

<script>
import page_schema from "@/schemas/page_schema.json";
import CrudView from "./CrudView.vue";
export default {
  name: "PagesView",
  components: {
    CrudView,
  },
  data() {
    return {
      page_schema: page_schema,
    };
  },
  computed: {
    pod() {
      return this.$store.state.solid_data.pod;
    },
    aventure() {
      return this.$store.state.solid_data.currentThing.aventure;
    },
    things() {
      return this.$store.state.solid_data.page;
    },
  },
};
</script>

<style scoped></style>
