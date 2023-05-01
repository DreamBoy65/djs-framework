const Base = require("../utils/Base")
const Command = require("../struct/Command")

class SlashCommandManager extends Base {
  constructor(client, config) {
    super()
    this.client = client
    this.config = config
    this.commands = client.collections.add("slashCommands").get("slashCommands")
    client.collections.add("slashCooldowns")

    if (this.autoLoad) {
      try {
        this.loadAll()
      } catch(e) {
        this.emit("error", e)
        this.log.typer(`${e.message || "unknown"}\n${e.stack}`)
      }
    }
  }

  handle() {
    if (!this.autoHandle) return;

    this.client.on("interactionCreate", async (i) => {
      await this.client.slashCommandHandler.handle(i)
    })
  }

  registerCommands() {
    let cmds = []
    for (const command of this.commands) {
      let cmd = command[1].toJSON(true)
      cmds.push(cmd)
    }

    if (this.loadGlobal) {
      this.log.warn("The slash commands might take upto 1hour to get loaded globally")

      this.client.application.commands.set(cmds)
      .then(res => {
        this.log.success("Loaded slash commands globaly")
      })
      .catch(e => {
        this.log.typer(e)
      })

      return;
    }

    for (const guild of this.client.guilds.cache.map(g => g)) {
      guild.commands.set(cmds)
      .then(res => {
        if (this.showLoadLogs) {
          this.log.success("Loaded slash commands for " + guild.name)
        }
      })
      .catch(e => {
        this.log.warn("Unable to load slash commands for " + guild.name)
      })
    }
  }

  async loadAll() {
    if (!this.enable) return;
    if (!this.functions.isDir(this.dir)) return this.log.typer(`${this.dir} is not a directory`)

    let files = await this.functions.readdirSync(`${process.cwd()}/${this.dir}`)

    for (const file of files) {
      try {
        if (await this.functions.isDir(this.dir + "/" + file)) {
          await this.loadSub(file)
        } else {
          await this.loadFile(file)
        }
      } catch(e) {
        this.emit("error", e)
        this.log.typer(`${e.message || "unknown"}\n${e.stack}`)
      }
    }

    this.emit("CommandLoaded", this)
  }

  async loadFile(file) {
    if (file.split(".")[1] !== "js") return;
    let name = file.split(".")[0]
    let module = require(`${process.cwd()}/${this.dir}/${file}`)
    this.load(module, file)
  }

  async loadSub(folder) {
    if (!this.parentCommands.find(c => c.dir === folder)) return;

    let files = await
    this.functions.readdirSync(`${process.cwd()}/${this.dir}/${folder}`)

    for (const file of files) {
      if (file.split(".")[1] !== "js") return;
      let name = file.split(".")[0]
      let module = require(`${process.cwd()}/${this.dir}/${folder}/${file}`)
      module.parent = folder
      this.load(module, file)
    }
  }

  load(data, filename) {
    if (this.showLogs) {
      this.log.success(`Loaded Command: ${data.name || "unknown"} - Slash`)
    }
    this.setCommand(data, filename)
  }

  setCommand(data, fn) {
    if (!data) return this.log.typer(`No data is given for file ${fn}`)

    if (!data || !data.name || !data.description) {
      return this.log.typer(`Not enough Data for ${fn}`)
    }

    let cmd = new Command(this.client, data)

    if (data.parent) {
      let da = this.parentCommands.find(c => c.dir === data.parent)
      return this.commands.set(`${da.name}-${data.name}`, cmd)
    } else {
      return this.commands.set(data.name, cmd)
    }
  }

  removeCommand(name) {
    if (!this.commands.has(name)) return this.log.typer(`No command found with name: ${name}`)

    this.commands.delete(name)
  }

  getCommand(name) {
    if (!this.commands.has(name)) return this.log.typer(`No command found with name: ${name}`)

    return this.commands.get(name)
  }

  get parentCommands() {
    return this.config.parentCommands
  }

  get dir() {
    return this.config.dir
  }

  get autoLoad() {
    return Boolean(this.config.autoLoad)
  }

  get showLogs() {
    return Boolean(this.config.showLogs)
  }

  get enable() {
    return Boolean(this.config.enable)
  }

  get loadGlobal() {
    return Boolean(this.config.loadGlobal)
  }

  get autoHandle() {
    return Boolean(this.config.autoHandle)
  }

  get showLoadLogs() {
    return Boolean(this.config.showLoadLogs)
  }
}

module.exports = SlashCommandManager