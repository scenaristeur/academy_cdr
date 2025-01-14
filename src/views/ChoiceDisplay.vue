<template>
  <div>
    <br>
    <button v-on:click="choose()" type="button" class="list-group-item list-group-item-action list-group-item-primary"
      :disabled="choice.active == false">

      <div v-if="choice_data">
        <!-- {{ choice }} -->

        <b>{{ choice_data.name }}</b><br>
        {{ choice_data.texte }}<br>
        <!-- {{ choice_data.destination }} -->
      </div>
    </button>
  </div>
</template>

<script>
export default {
  name: "ChoiceDisplay",
  props: ['choice'],
  data() {
    return {
      choice_data: null
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      this.choice_data = await this.$store.dispatch('solid_data/getChoice', this.choice.url)
    },
    choose() {
      console.log(this.choice_data);
      this.$store.commit("config/setPage", this.choice_data.destination);
    },
  },
  watch: {
    choice() {

    }
  },
  computed: {
    // aventure() {
    //   return this.$store.state.solid_data.currentThing.aventure;
    // },
  },
};
</script>

<style scoped></style>
