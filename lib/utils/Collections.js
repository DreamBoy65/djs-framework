const {
  Collection
} = require("discord.js")
const Base = require("./Base")

class Collections extends Base {
  constructor(array = []) {
    super()

    for (const e of array) {
      this[e] = new Collection()
    }
  }

  add(name) {
    if (this[name]) return this.log.warn(`There's already a collection with
      ${name} name`)
    return this[name] = new Collection()
  }

  remove(name) {
    if (!this[name]) return this.log.warn(`There's not a collection with
      ${name} name`)
    return this[name] = null
  }

  get(name) {
    if (!this[name]) return this.log.warn(`There's not a collection with
      ${name} name`)
    return this[name]
  }
}

module.exports = Collections