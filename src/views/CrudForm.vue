<template>
  <div>
    <div v-for="(property, key) in properties" v-bind:key="key">
      <div class="form-group">
        <label :for="key">{{ key }}</label>
        <!-- type string -->
        <input
          v-if="property.type === 'string'"
          class="form-control"
          :id="key"
          :placeholder="key"
          v-model="result[key]"
        />
        <!--type textarea -->
        <textarea
          v-else-if="property.type === 'textarea'"
          class="form-control"
          :id="key"
          :placeholder="key"
          v-model="result[key]"
        ></textarea>
        <div v-else>Not implemented yet for type {{ property.type }} key {{ key }}</div>
      </div>
    </div>

    <button class="btn btn-primary" v-on:click="save">Enregistrer</button>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
export default {
  name: "CrudForm",
  props: ["properties", "path", "type"],
  data() {
    return {
      result: {},
    };
  },
  mounted() {
    this.result.url = this.path + this.type + "/" + uuidv4() + ".json";
    for (const property in this.properties) {
      if (this.properties[property].default) {
        this.result[property] = this.properties[property].default;
      }
    }
  },
  methods: {
    save() {
      console.log("save", this.result);
    },
  },
};
</script>

<style scoped></style>
