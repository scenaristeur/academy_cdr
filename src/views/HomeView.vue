<template>
  <main>


    <PageView v-if="config!=null"/>


  </main>
</template>

<script>
// import config from '@/store/modules/config';
import PageView from './PageView.vue';

// import PageView from './PageView.vue';

export default {
  name: 'HomeView',
  // props: {
  //   page_number: Number
  // },
  components: {
    PageView
  },
  mounted() {
    // console.log(this.page_number)
    this.$store.dispatch('config/loadConfig'/*, this.page_number*/)
  },

  computed: {
config() {
  return this.$store.state.config.config
}
  }
}
</script>
