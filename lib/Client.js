const {
  Client,
  GatewayIntentBits
} = require("discord.js")
const Logger = require("./utils/Logger")
const Functions = require("./utils/Functions")
const Pages = require("./utils/Pages")
const defaultConfig = require("./config/config")
const Collections = require("./utils/Collections")

class Bot extends Client {
  constructor(config) {
    config.bot.intents = config?.bot?.intents?.map(e => GatewayIntentBits[e])
    super({
      intents: config.bot.intents
    })

    this.config = config
    this.log = new Logger()
    this.fun = new Functions()
    this.pages = Pages
    this.defConfig = this.fun.mergeObj(defaultConfig, this.config)
    this.collections = new Collections()
  }

  start() {
    if (!this.defConfig.bot.token) return this.log.warn("No Bot token provided!")
    return this.login(this.defConfig.bot.token).catch(e => this.log.warn(e.message))
  }
}

module.exports = Bot