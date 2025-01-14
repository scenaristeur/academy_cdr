<template>
  <main>
    <!-- <input v-model="config_path" class="form-control" /> -->
    <div class="list-group">
      <button
        v-for="a in aventure"
        v-bind:key="a.url"
        v-on:click="choose(a)"
        type="button"
        class="list-group-item list-group-item-action list-group-item-primary"
      >
        <b>{{ a.content.name }}</b> <br /><small
          ><span>{{ a.content.description }}</span></small
        >
        <!-- <br />
        -> rends-toi à la page {{ choice.page }} -->
      </button>
    </div>

    <!-- {{ aventure }} -->

    <PageView v-if="config != null" />
  </main>
</template>

<script>
// import config from '@/store/modules/config';
import PageView from "./PageView.vue";

// import PageView from './PageView.vue';

export default {
  name: "HomeView",
  // props: {
  //   page_number: Number
  // },
  components: {
    PageView,
  },
  mounted() {
    // console.log(this.page_number)
    // this.$store.dispatch('config/loadConfig'/*, this.page_number*/)
    this.$store.dispatch("solid_data/crudReadContainer", {
      path: "https://academy-cdr.solidcommunity.net/public/cdr_academie/aventure/",
      type: "aventure",
    });
  },
  methods: {
    choose(a) {
      console.log(a);
      this.$store.commit("config/setConfig", a.content);
      this.$store.commit("config/setPage", a.content.start);
    },
  },

  computed: {
    aventure() {
      return this.$store.state.solid_data.aventure;
    },
    config() {
      return this.$store.state.config.config;
    },
  },
};
</script>
