<template>
  <div>
    <a :href="path" target="_blank" rel="noopener">données</a>

    <hr />
    Crud {{ type }}
    <span v-if="parent != null"
      >pour
      <a :href="parent.url" target="_blank" rel="noopener">{{
        parent.content.name
      }}</a></span
    >
    <CrudForm
      :properties="schema.properties"
      :path="path"
      :type="type"
      :parent="parent"
    />

    <hr />
    <CrudList
      :things="things"
      :type="type"
      :properties="schema.properties"
      :parent="parent"
    />
    <!-- {{ aventure }} -->
  </div>
</template>

<script>
import CrudForm from "./CrudForm.vue";
import CrudList from "./CrudList.vue";

export default {
  name: "CrudView",
  props: ["type", "path", "schema", "things", "parent"],
  components: {
    CrudForm,
    CrudList,
  },
  created() {
    this.readContainer();
  },
  methods: {
    readContainer() {
      this.$store.dispatch("solid_data/crudReadContainer", {
        path: this.path + this.type + "/",
        type: this.type,
      });
    },
  },
};
</script>

<style scoped></style>
