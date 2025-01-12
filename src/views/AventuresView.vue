<template>
  <div>
    <SolidLogin />

    Aventures CRUD

    <CrudView
      v-if="pod != null"
      type="aventure"
      :path="pod.aventureStore"
      :schema="aventure_schema"
    />
  </div>
</template>

<script>
import SolidLogin from "@/components/SolidLogin.vue";
import CrudView from "./CrudView.vue";

export default {
  name: "AventuresView",
  data() {
    return {
      aventure_schema: {
        name: "Aventure",
        version: "1.0.0",
        type: "object",
        properties: {
          url: {
            type: "string",
          },
          name: {
            type: "string",
          },
          description: {
            type: "textarea",
          },
          style: {
            type: "string",
          },
          start: {
            type: "string",
          },
          author: {
            type: "string",
          },
          version: {
            type: "string",
            default: "1.0.0",
          },
          pages: {
            type: "array",
            classe: "page",
            items: {
              type: "string",
            },
          },
        },
      },
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
  },
};
</script>

<style scoped></style>
