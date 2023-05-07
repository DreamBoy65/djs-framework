const {
  Client,
  GatewayIntentBits
} = require("discord.js")
const Logger = require("./struct/Logger")
const Functions = require("./utils/Functions")
const Pages = require("./struct/Pages")
const defaultConfig = require("./config/config")
const Collections = require("./struct/Collections")
const EventManager = require("./managers/Event")
const SlashCommandManager = require("./managers/SlashCommand")
const TextCommandManager = require("./managers/TextCommand")
const Constants = require("./utils/Constants")
const MongoManager = require("./struct/Mongoose")
const JsonManager = require("./struct/JsonDB")
const Extensions = require("./utils/extensions")
const SlashHandler = require("./handlers/SlashCommand")
const TextHandler = require("./handlers/TextCommand.js")

class Bot extends Client {
  constructor(config) {
    config.bot.intents = config?.bot?.intents?.map(e => GatewayIntentBits[e])
    super({
      intents: config.bot.intents
    })

    this.collections = new Collections()
    this.config = config
    this.log = new Logger()
    this.fun = new Functions()
    this.pages = Pages
    this.defConfig = this.fun.mergeObj(defaultConfig, this.config)
    this.consts = new Constants(this.defConfig.constants)
    this.EventManager = new EventManager(this, this.defConfig.events)
    this.slashCommandManager = new SlashCommandManager(this,
      this.defConfig.slashCommand)
    this.slashCommandHandler = new SlashHandler(this)
    this.textCommandManager = new TextCommandManager(this,
      this.defConfig.textCommand)
    this.textCommandHandler = new TextHandler(this)
    this.mongoManager = new MongoManager(this.defConfig.mongoDB)
    this.jsonManager = new JsonManager(this.defConfig.jsonDB)
  }

  async init() {
    await this.slashCommandManager.handle()
  }

  async start() {
    await this.init()

    if (!this.defConfig.bot.token) return this.log.warn("No Bot token provided!")
    return this.login(this.defConfig.bot.token).catch(e => this.log.warn(e.message))
  }
}

module.exports = Bot