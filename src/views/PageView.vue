<template>
  <div class="page" v-if="config != null" ref="page">
    <h1>{{ config.name }}</h1>
    <p v-if="page == 0">{{ config.description }}</p>
    <!-- <p>{{ config.start }}</p>
    <p>{{ config.page }}</p> -->
    <!-- page : {{ page }},  -->
    level {{ level }}

    <div v-if="page_content != undefined">
      <h2>{{ page_content.name }}</h2>
      <hr />


      <div> {{ page_content.description }}</div>
      <hr />


      <div> {{ page_content.contenu }}</div>

      <div class="list-group"></div>
      <!-- {{  choice }} -->
      <ChoiceDisplay :choice="choice" v-for="choice in page_content.choix" v-bind:key="choice" />
      <!-- <b>{{ choice.text }}</b> <br /><small
            ><span>{{ choice.description }}</span></small
          > -->



      <!-- <div v-for="content_part in page_data.content" v-bind:key="content_part">
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

        </button>
      </div> -->
    </div>
    <div v-else>
      <p>
        Loading... si ça prend plus de 10 secondes
        <a href="https://github.com/scenaristeur/academy_cdr/issues">contactez l'administrateur</a>
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
import ChoiceDisplay from './ChoiceDisplay.vue';

export default {
  name: "PageView",
  components: {
    ChoiceDisplay
  },
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
  watch: {
    page() {
      console.log("page", this.page)
      if (this.page != undefined) {
        this.$store.dispatch('solid_data/getPageContent', this.page)
      }

    }
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
    page_content() {
      return this.$store.state.solid_data.page_content;
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
