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
  // doc: null
  aventures: {},
  aventures_path: 'public/cdr_academie/',
  pod: null,
  aventure_url: null,
  aventure: null,
})

const mutations = {
  setPod(state, p) {
    console.log('pod', p)
    state.pod = p
  },
  setAventures(state, a) {
    console.log('aventures', a)
    state.aventures = a
  },
  setAventureUrl(state, a) {
    console.log('aventure_url', a)
    localStorage.setItem(LOCAL_STORAGE_KEY_LAST_AVENTURE, a)
    state.aventure_url = a
  },
  setAventure(state, a) {
    console.log('aventure', a)
    state.aventure = a
  },
  // updateDoc(state, newDoc) {
  //   state.doc = newDoc
  //   //render(newDoc)
  // },
}

const actions = {
  // async saveAventure(context, aventure) {
  //   context.commit('setAventure', aventure)
  //   console.log(aventure)
  //   let filename = aventure.url.replace(context.state.pod.aventureStore, '')
  //   console.log(filename)
  //   const savedFile = await overwriteFile(
  //     aventure.url,
  //     new File([JSON.stringify(aventure, null, 2)], filename, { type: 'application/json' }),
  //     { fetch: sc.fetch },
  //   )

  //   console.log(savedFile)
  // },
  // async loadAventure(context, url = context.state.aventure_url) {
  //   if (url != null) {
  //     try {
  //       // File (https://docs.inrupt.com/developer-tools/api/javascript/solid-client/modules/interfaces.html#file) is a Blob (see https://developer.mozilla.org/docs/Web/API/Blob)
  //       const file = await getFile(
  //         url, // File in Pod to Read
  //         { fetch: sc.fetch }, // fetch from authenticated session
  //       )
  //       // console.log(file)
  //       let text = await file.text()
  //       // console.log(text)
  //       context.commit('setAventure', JSON.parse(text))
  //       console.log(`Fetched a ${getContentType(file)} file from ${getSourceUrl(file)}.`)
  //       // console.log(`The file is ${isRawData(file) ? 'not ' : ''}a dataset.`)
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   }
  // },
  // async chooseAventure(context, url) {
  //   context.commit('setAventureUrl', url)
  // },

  async getPod(context, session) {
    console.log('getPod', session)
    let pod = await context.dispatch('getPodInfos', session) //this.$getPodInfosFromSession(session)
    console.log('pod', pod)
    context.commit('setPod', pod)
    // const aventuresContainer = await getSolidDataset(pod.aventureStore, { fetch: sc.fetch })
    // let aventures = await getThingAll(aventuresContainer, { fetch: sc.fetch })
    // console.log('aventures', aventures)
    // aventures = aventures.filter((aventure) => {
    //   return aventure.url.endsWith('.json')
    // })
    // let avs = aventures.map((aventure) => {
    //   let ave = {}
    //   ave.name = decodeURI(aventure.url.replace(pod.aventureStore, '').replace('.json', ''))
    //   ave.data = aventure
    //   return ave
    // })
    // console.log('aventures graph', avs)
    // context.commit('setAventures', avs)
    // const last_aventure = localStorage.getItem(LOCAL_STORAGE_KEY_LAST_AVENTURE)
    // if (last_aventure) {
    //   context.commit('setAventureUrl', last_aventure)
    // }
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
        // let storage = await getLink(pod.webId)
        // console.log("storage", storage)
        // for community solid server with no pim:storage
        pod.storage = pod.webId.split('/').slice(0, -2).join('/') + '/'
      }

      pod.photo = await getUrl(profile, VCARD.hasPhoto)
      pod.aventureStore == undefined
        ? (pod.aventureStore = pod.storage + context.state.aventures_path)
        : ''
      // pod.workspaces = []

      // let publicTypeIndexUtl = pod.storage + 'settings/publicTypeIndex.ttl'
      // const pti_ds = await getSolidDataset(publicTypeIndexUtl, { fetch: sc.fetch })
      // let indexes = await getThingAll(pti_ds)
      // for await (const i of indexes) {
      //   let types = await getUrlAll(i, 'http://www.w3.org/ns/solid/terms#forClass')
      //   //console.log(types)
      //   if (types.includes('https://scenaristeur.github.io/verse#Workspace')) {
      //     console.log(i)
      //     let ws = {}
      //     ws.name = await getStringNoLocale(i, AS.name)
      //     ws.url = await getUrl(i, SOLID.instance)
      //     pod.workspaces.push(ws)
      //   }
      // }
      //console.log(ws)
      //  pod.workspaces = await getUrlAll(pti_ds, "http://www.w3.org/ns/solid/terms#forClass", "https://www.w3.org/ns/activitystreams#Collection");
      // pod.publicTags = await this.$getTags(pod.storage+'public/tags.ttl')
      // store.commit("vatch/addToNetwork", pod.publicTags)
      //this.$subscribe(pod.storage)
      //  console.log("getpodinfos",pod)
    } catch (e) {
      console.log('erreur', e, pod)
    }
    console.log(pod)
    return await pod
  },
  // async checkSession(context) {
  //   localStorage.setItem(LOCAL_STORAGE_KEY__SOLID_SESSION_RESTORE_URL, window.location.toString())
  //   // console.log("check session", document.location)
  //   // localStorage.setItem(Date.now, document.location)
  //   // sc.onSessionRestore((url) => {
  //   //   history.replaceState(null, '', url)
  //   // })
  //   await sc
  //     .handleIncomingRedirect({
  //       restorePreviousSession: true,
  //     })
  //     .then((info) => {
  //       if (info.isLoggedIn == true) {
  //         console.log(`Logged in with WebID [${info.webId}]`)
  //         context.commit('setSession', info)
  //         // let session = sc.getDefaultSession()
  //         // this.$getPodInfosFromSession(session)
  //         // This line is not reached until you are successfully logged in
  //         localStorage.setItem(LOCAL_STORAGE_KEY__SOLID_SESSION_RESTORE_URL, '')
  //       }
  //     })
  // },
  // async login(context, issuer) {
  //   console.log('login', issuer)
  //   if (!sc.getDefaultSession().info.isLoggedIn) {
  //     await sc.login({
  //       oidcIssuer: issuer,
  //       redirectUrl: window.location.href,
  //       clientName: 'Agent',
  //     })
  //   }
  // },
  // async logout(context) {
  //   let session = sc.getDefaultSession()
  //   await session.logout()
  //   context.commit('setSession', null)
  //   context.commit('setPod', null)
  //   //store.dispatch('nodes/clearStore')
  // },
  // // async newDoc(context){
  // //   let doc = Automerge.init()
  // //   context.commit('setDoc', doc)
  // // },
  // // addItem(context, text) {
  // //   console.log(context.state.doc)
  // //   let newDoc = Automerge.change(context.state.doc, doc => {
  // //     if (!doc.items) doc.items = []
  // //     doc.items.push({ text, done: false })
  // //   })
  // //   context.commit('updateDoc', newDoc)
  // // }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
}
