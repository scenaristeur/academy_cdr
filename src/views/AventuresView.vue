<template>
  <div>
    <SolidLogin />
    <CrudView
      v-if="pod != null"
      type="aventure"
      :path="pod.aventureStore"
      :schema="aventure_schema"
      :things="things"
    />
  </div>
</template>

<script>
import SolidLogin from "@/components/SolidLogin.vue";
import CrudView from "./CrudView.vue";
import aventure_schema from "@/schemas/aventure_schema.json";

console.log("aventure_schema raw", aventure_schema);
// console.log("aventure_schema", aventure_schema);

export default {
  name: "AventuresView",
  data() {
    return {
      aventure_schema: aventure_schema,
    };
  },
  components: {
    SolidLogin,
    CrudView,
  },
  mounted() {
    this.setAuthor();
  },
  methods: {
    setAuthor() {
      if (this.pod && this.pod.name) {
        this.aventure_schema.properties.author.default = this.pod.name;
      }
    },
  },
  watch: {
    session() {
      if (this.session != null) {
        if (this.session.isLoggedIn == true) {
          this.$store.dispatch("solid_data/getPod", this.session);
        }
      }
    },
    pod() {
      this.setAuthor();
    },
  },
  computed: {
    pod() {
      return this.$store.state.solid_data.pod;
    },
    session() {
      return this.$store.state.solid.session;
    },

    things() {
      return this.$store.state.solid_data.aventure;
    },
  },
};
</script>

<style scoped></style>
