<template>
  <div>
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      :data-bs-target="'#' + type + 'Modal'"
      v-on:click="resetThing"
    >
      Edition {{ type }}
    </button>

    <!-- Modal -->
    <div
      class="modal fade"
      :id="type + 'Modal'"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Edition {{ type }}</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
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
                <div v-else>
                  Not implemented yet for type {{ property.type }} key {{ key }}
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Fermer
            </button>
            <button type="button" class="btn btn-primary" v-on:click="save">
              Enregistrer
            </button>
          </div>
        </div>
      </div>
    </div>
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
    this.resetThing();
  },
  methods: {
    resetThing() {
      this.$store.commit("solid_data/setCurrentThing", { type: this.type, thing: null });
      this.result = {};
      this.result.path = this.path + this.type + "/";
      this.result.url = this.result.path + uuidv4() + ".json";
      for (const property in this.properties) {
        if (this.properties[property].default) {
          this.result[property] = this.properties[property].default;
        }
      }
    },
    save() {
      this.result.type = this.type;
      console.log("save", this.result);
      this.$store.dispatch("solid_data/crudSave", this.result);
    },
  },
  watch: {
    currentThing() {
      console.log("currentThing for modal", this.currentThing);
      if (this.currentThing != null) {
        this.result = this.currentThing.content;
      }
    },
  },
  computed: {
    currentThing() {
      return this.$store.state.solid_data.currentThing[this.type];
    },
  },
};
</script>

<style scoped></style>
