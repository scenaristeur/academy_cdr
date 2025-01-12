<template>
  <div class="page" v-if="config != null" ref="page">
    <h1>{{ config.name }}</h1>
    <p v-if="page == 0">{{ config.description }}</p>
    page : {{ page }}, level {{ level }}
    <div v-if="page_data != undefined">
      <h2>{{ page_data.title }}</h2>
      <hr />

      <div v-for="content_part in page_data.content" v-bind:key="content_part">
        <div v-if="typeof content_part == 'object'">
          <div v-if="content_part.type == 'lien'">
            <a :href="content_part.href" target="_blank">{{ content_part.texte }}</a>
          </div>
        </div>
        <div v-else>
          {{ content_part }}
        </div>
      </div>

      <hr />

      <div class="list-group">
        <button
          v-for="choice in page_data.choices"
          v-bind:key="choice"
          v-on:click="choose(choice)"
          type="button"
          class="list-group-item list-group-item-action list-group-item-primary"
          :disabled="choice.active == false"
        >
          <b>{{ choice.text }}</b> <br /><small
            ><span>{{ choice.description }}</span></small
          >
          <!-- <br />
          -> rends-toi à la page {{ choice.page }} -->
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
    <div>
      <hr />
      <div>
        <button class="btn btn-primary" v-on:click="goBack">Retour</button>
      </div>
      <button class="btn btn-primary" v-on:click="restart">Recommencer l'aventure</button>
      <button class="btn btn-primary" v-on:click="change">Changer d'aventure</button>
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
  updated() {
    this.$refs.page.scrollIntoView();
  },
  methods: {
    choose(choice) {
      console.log(choice);
      this.$store.commit("config/setPage", choice.page);
    },
    restart() {
      this.$store.commit("config/setPage", 0);
    },
    change() {
      this.$store.commit("config/changeAventure");
    },
    goBack() {
      this.$store.commit("config/goBack");
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
