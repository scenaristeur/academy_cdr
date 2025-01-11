// import { v4 as uuidv4 } from 'uuid'
// import axios from 'axios'

export class Tools {
  constructor(options = {}) {
    this.options = options
console.log(options)

  }
  async loadJson(path) {
    console.log(path)
    let json = null
    if(path.startsWith('http')) {
      json = await fetch(path).then(response => response.json())
    } else {
      json = await import(path)?.default;
      console.log(json)
    }
    return json
  }
}
