<template>
  <div>
    <hr />
    <a :href="path" target="_blank" rel="noopener">{{ path }}</a>

    <hr />
    type {{ type }}
    <h1>{{ schema.name }} CRUD</h1>
    <CrudForm :properties="schema.properties" :path="path" :type="type" />
    READ: LIST, DEtail, Update CREATE NEW, = UPDATE with NULL DELETE

    <hr />
    <CrudList :things="aventure" :type="type" />
    <!-- {{ aventure }} -->
  </div>
</template>

<script>
import CrudForm from "./CrudForm.vue";
import CrudList from "./CrudList.vue";

export default {
  name: "CrudView",
  props: ["type", "path", "schema"],
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
  computed: {
    aventure() {
      return this.$store.state.solid_data.aventure;
    },
  },
};
</script>

<style scoped></style>
