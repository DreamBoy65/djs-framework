const Logger = require("./Logger")
const Functions = require("./Functions")
const Pages = require("./Pages")
const {
  EventEmitter
} = require("events")

class Base extends EventEmitter {
  constructor() {
    super()
    this.log = new Logger()
    this.functions = new Functions()
    this.Pages = Pages
  }
}

module.exports = Base