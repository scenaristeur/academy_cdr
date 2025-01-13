<template>
  <div>
    <hr />
    <a :href="path" target="_blank" rel="noopener">données</a>

    <hr />
    type {{ type }}
    <h1>{{ schema.name }} CRUD</h1>
    <CrudForm
      :properties="schema.properties"
      :path="path"
      :type="type"
      :parent="parent"
    />

    <hr />
    <CrudList :things="things" :type="type" :properties="schema.properties" />
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
