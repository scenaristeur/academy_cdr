import {
  getSolidDataset,
  getThingAll,
  //getPublicAccess,
  //  getAgentAccess,
  //getSolidDatasetWithAcl,
  //getPublicAccess,
  //getAgentAccess,
  getFile,
  // isRawData,
  // getContentType,
  // saveFileInContainer,
  // getContainedResourceUrlAll,
  // getStringNoLocaleAll,
  // createContainerAt,
  // getSourceUrl,
  // getLiteralAll,
  deleteFile,
  //removeThing,
  // removeAll,
  //removeStringNoLocale,
  //deleteContainer,
  //addStringNoLocale,
  //setThing,
  //saveSolidDatasetAt,
  //createSolidDataset,
  //createThing,
  //addUrl,
  //buildThing,
  overwriteFile,
  getStringNoLocale,
  getThing,
  getUrlAll,
  getUrl,
  //addDatetime,
  // getDatetime,
  getDecimal,
  //setUrl,
  //setStringNoLocale,
  //setDecimal,
  //setInteger,
  //  getDecimal,
  //getInteger,
  // setDatetime
} from '@inrupt/solid-client'
import { FOAF, /*LDP,*/ VCARD, /*RDF,*/ AS /*RDFS, OWL*/ } from '@inrupt/vocab-common-rdf'
import { WS, SOLID } from '@inrupt/vocab-solid-common'
import * as sc from '@inrupt/solid-client-authn-browser'
const LOCAL_STORAGE_KEY_LAST_AVENTURE = 'academy_editor_last_aventure'

const state = () => ({
  aventures_path: 'public/cdr_academie/',
  pod: null,
  currentThing: {},
  aventure: null,
  path: null,
  type: null,
})

const mutations = {
  setPod(state, p) {
    console.log('pod', p)
    state.pod = p
  },
  setCurrentThing(state, { type, thing }) {
    state.currentThing[type] = thing
    console.log('currentThing', state.currentThing)
  },
  async setThings(state, { things, type }) {
    state[type] = things
    console.log(state)
  },
}

const actions = {
  async crudSave(context, { parent, thing }) {
    try {
      console.log('saving', thing, parent)
      // let filename = data.url.replace(context.state.pod.aventureStore, '')
      // console.log(filename)
      const savedFile = await overwriteFile(
        thing.url,
        new File([JSON.stringify(thing, null, 2)], thing.name, { type: 'application/json' }),
        { fetch: sc.fetch },
      )

      console.log(savedFile)
      context.dispatch('crudReadContainer', { path: thing.path, type: thing.type })
      alert('Saved ' + thing.url)
    } catch (e) {
      console.log(e)
      alert(e)
    }
  },

  async crudReadContainer(context, data) {
    console.log('crudReadContainer', data)
    try {
      context.state.path = data.path
      context.state.type = data.type
      let container_ds = await getSolidDataset(data.path, { fetch: sc.fetch })
      let things = await getThingAll(container_ds)

      let type_state = context.state[data.type] || {}
      let content = null
      for (const thing of things) {
        if (!thing.url.endsWith('/')) {
          // https://docs.inrupt.com/developer-tools/javascript/client-libraries/tutorial/read-write-data/#read-data-attribute-of-a-thing
          let mtime = await getDecimal(thing, 'http://www.w3.org/ns/posix/stat#mtime')
          console.log(thing.url, mtime)
          let old = type_state[thing.url]
          if (old == null || old.mtime < mtime) {
            if (thing.url.endsWith('.json')) {
              const file = await getFile(
                thing.url, // File in Pod to Read
                { fetch: sc.fetch }, // fetch from authenticated session
              )
              // console.log(file)
              let text = await file.text()
              // console.log(text)
              content = JSON.parse(text)
            }

            type_state[thing.url] = { url: thing.url, mtime: mtime, content: content }
          }
        }
      }

      context.commit('setThings', { things: type_state, type: data.type })
      console.log(type_state)
    } catch (e) {
      console.log(e)
    }
  },

  async getPod(context, session) {
    console.log('getPod', session)
    let pod = await context.dispatch('getPodInfos', session) //this.$getPodInfosFromSession(session)
    console.log('pod', pod)
    context.commit('setPod', pod)
  },
  async getPodInfos(context, pod) {
    try {
      const dataset = await getSolidDataset(pod.webId, { fetch: sc.fetch })
      let profile = await getThing(dataset, pod.webId)
      pod.name = await getStringNoLocale(profile, FOAF.name)
      pod.friends = await getUrlAll(profile, FOAF.knows).map((webId) => {
        return { webId: webId }
      })
      pod.storage = await getUrl(profile, WS.storage)

      if (pod.storage == null) {
        pod.storage = pod.webId.split('/').slice(0, -2).join('/') + '/'
      }

      pod.photo = await getUrl(profile, VCARD.hasPhoto)
      pod.aventureStore == undefined
        ? (pod.aventureStore = pod.storage + context.state.aventures_path)
        : ''
    } catch (e) {
      console.log('erreur', e, pod)
    }
    console.log(pod)
    return await pod
  },

  async deleteThing(context, thing) {
    console.log(thing)
    try {
      await deleteFile(thing.url, { fetch: sc.fetch })
      delete context.state[context.state.type][thing.url]
    } catch (e) {
      console.log(e)
    }

    context.dispatch('crudReadContainer', { path: context.state.path, type: context.state.type })
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
}
