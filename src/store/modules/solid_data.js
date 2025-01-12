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
  getContentType,
  // saveFileInContainer,
  // getContainedResourceUrlAll,
  // getStringNoLocaleAll,
  // createContainerAt,
  getSourceUrl,
  // deleteFile,
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
  //  getDatetime,
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
  current: null,
  aventure: null,
})

const mutations = {
  setPod(state, p) {
    console.log('pod', p)
    state.pod = p
  },
  setCurrent(state, c) {
    state.current = c
  },
  setThings(state, { things, type }) {
    state[type] = things
    console.log(state)
  },
}

const actions = {
  async crudSave(context, data) {
    try {
      console.log(data)
      // let filename = data.url.replace(context.state.pod.aventureStore, '')
      // console.log(filename)
      const savedFile = await overwriteFile(
        data.url,
        new File([JSON.stringify(data, null, 2)], data.name, { type: 'application/json' }),
        { fetch: sc.fetch },
      )

      console.log(savedFile)
      context.commit('setCurrent', data.url)
      context.dispatch('crudReadContainer', { path: data.path, type: data.type })
      alert('Saved ' + data.url)
    } catch (e) {
      console.log(e)
      alert(e)
    }
  },

  async crudReadContainer(context, data) {
    console.log('crudReadContainer', data)
    let container_ds = await getSolidDataset(data.path, { fetch: sc.fetch })
    let things = await getThingAll(container_ds)
    context.commit('setThings', { things: things, type: data.type })
    console.log(things)
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
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
}
