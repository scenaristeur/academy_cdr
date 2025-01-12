<template>
  <div>
    <hr />
    path {{ path }}
    <hr />
    type {{ type }}
    <h1>{{ schema.name }} CRUD</h1>
    <CrudForm :properties="schema.properties" :path="path" :type="type" />
    READ: LIST, DEtail, Update CREATE NEW, = UPDATE with NULL DELETE
  </div>
</template>

<script>
import CrudForm from "./CrudForm.vue";

export default {
  name: "CrudView",
  props: ["type", "path", "schema"],
  components: {
    CrudForm,
  },
};
</script>

<style scoped></style>
