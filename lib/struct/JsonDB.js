const jsoning = require("jsoning");
const Base = require("../utils/Base")

class json extends Base {
  constructor(config) {
    super()
    this.config = config

    if (config.autoLoad) {
      this.init()
    }
  }

  async init() {
    if (!this.enable) return;

    for (const db of this.dbs) {
      this.add(db)
    }

    this.log.success("JSONDB Loaded.")
  }

  add(db) {
    if (this[db]) {
      this.log.typer(`${db} json db already exists!`)
    }

    this[db] = new jsoning(`${this.dir}/${db}.json`)
  }

  remove(name) {
    if (!name || !this[name]) {
      this.log.typer(`${name} json not found`)
    }

    this[name] = null
  }

  get(name) {
    if (!name || !this[name]) {
      this.log.typer(`${name} json not found`)
    }

    return this[name]
  }

  get dbs() {
    return this.config.dbs
  }

  get enable() {
    return Boolean(this.config.enable)
  }

  get autoLoad() {
    return Boolean(this.config.autoLoad)
  }

  get dir() {
    return this.config.dir
  }
}

module.exports = json;