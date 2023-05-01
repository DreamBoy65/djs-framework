const {
  Collection
} = require("discord.js")
const Base = require("../utils/Base")

class Collections extends Base {
  constructor(array = []) {
    super()

    for (const e of array) {
      this[e] = new Collection()
    }
  }

  add(name) {
    if (this[name]) return this.log.typer(`There's already a collection with
      ${name} name`)
    this[name] = new Collection()
    return this;
  }

  remove(name) {
    if (!this[name]) return this.log.typer(`There's not a collection with
      ${name} name`)
    this[name] = null
    return this;
  }

  get(name) {
    if (!this[name]) return this.log.typer(`There's not a collection with
      ${name} name`)
    return this[name]
  }
}

module.exports = Collections