const Base = require("./Base")

class Constants extends Base {
  constructor(config) {
    super()

    this.constants = config
    let keys = Object.keys(config)

    if (keys.length !== 0) {
      for (const key of keys) {
        this[key] = config[key]
      }
    }
  }

  get All() {
    return this.constants
  }

  deleteOne(id) {
    if (!this[id]) {
      this.log.typer("No constant found with name " + id)
    }

    this[id] = null
  }

  addOne(id, obj) {
    if (!id || !obj || typeof obj !== "object" || this[id]) {
      this.log.typer("The id is not defined or already exists / obj must be a object.")
    }
    this[id] = obj
  }

  replace(id, obj) {
    if (!id || !obj || typeof obj !== "object" || !this[id]) {
      this.log.typer("The id is not defined or dont exists / obj must be a object.")
    }

    this[id] = obj
  }
}

module.exports = Constants