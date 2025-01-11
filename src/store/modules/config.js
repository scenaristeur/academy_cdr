// import Vue from 'vue'
// import { v4 as uuidv4 } from 'uuid';
// import {Tools} from '@/lib/tools';
// const tools = new Tools();

const state = () => ({
  config: null,
  config_path: '../../../data/',
  default_aventure: 'first_aventure.json',
  page: 0,
  level: 0,
})

const mutations = {
  setConfig(state, c) {
    console.log
    state.config = c
  },
  setPage(state, p) {
    state.page = p
  },
  setLevel(state, l) {
    state.level = l
  },
}

const actions = {
  async loadConfig(context /*, page_number*/) {
    console.log('load')
    // let config = await tools.loadJson(`./data/config/${page_number}.json`)
    // load actual config & page from profile (localstorage or db)
    let file = context.state.config_path + context.state.default_aventure
    console.log(file)
    // if (page_number) {
    //   file = `${page_number}.json`
    // }
    // let config = await tools.loadJson(file)
    try {
      let config = await import(file)
      console.log('loaded', config)
      context.commit('setConfig', config.default)
      //app.load()
    } catch (e) {
      console.log(e)
    }

    // context.commit('setConfig', page_number)
  },
  // async getCompletion(context, data) {
  //   let story = data.story
  //   let callback = data.callback
  //   story.hordeApiKey = context.state.hordeApi
  //   console.log(context.state, story)
  //   let completion = await context.state.hordeClient.getCompletion(story, callback)
  //   console.log('completion', completion)
  // }
  // async newDoc(context){
  //   let doc = Automerge.init()
  //   context.commit('setDoc', doc)
  // },
  // addItem(context, text) {
  //   console.log(context.state.doc)
  //   let newDoc = Automerge.change(context.state.doc, doc => {
  //     if (!doc.items) doc.items = []
  //     doc.items.push({ text, done: false })
  //   })
  //   context.commit('updateDoc', newDoc)
  // }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
}
