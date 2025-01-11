<template>
  <div class="page" v-if="config != null">
    <h1>{{ config.name }}</h1>
    page : {{ page }}, level {{ level }}
    <div v-if="page_data != undefined">
      <p>{{ page_data.title }}</p>
      <hr />

      <div v-for="part in page_data.text" v-bind:key="part">{{ part }}</div>

      <hr />

      <div class="list-group">
        <button
          v-for="choice in page_data.choices"
          v-bind:key="choice"
          v-on:click="choose(choice)"
          type="button"
          class="list-group-item list-group-item-action list-group-item-primary"
        >
          {{ choice.text }}
        </button>
      </div>
    </div>
    <div v-else>
      <p>
        Loading... si ça prend plus de 10 secondes
        <a href="https://github.com/scenaristeur/academy_cdr/issues"
          >contactez l'administrateur</a
        >
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageView",
  // props: {
  //   page_number: Number
  // },
  // created() {
  //   console.log(this.page_number)
  //   this.$store.dispatch('config/loadConfig', this.page_number)
  // }
  methods: {
    choose(choice) {
      console.log(choice);
      this.$store.commit("config/setPage", choice.page);
    },
  },
  computed: {
    config() {
      return this.$store.state.config.config;
    },
    page() {
      return this.$store.state.config.page;
    },
    level() {
      return this.$store.state.config.level;
    },
    page_data() {
      return this.$store.state.config.config.pages[this.page];
    },
  },
};
</script>

<!-- <style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style> -->
