const {
  Client
} = require("discord.js")
const Logger = require("./utils/Logger")
const Functions = require("./utils/Functions")
const Pages = require("../utils/Pages.js")

class Bot extends Client {
  constructor(config) {
    this.config = config

    this.log = new Logger()
    this.fun = new Functions()
    this.pages = Pages
  }
}

module.exports = Bot