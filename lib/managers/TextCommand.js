const Base = require("../utils/Base")
const Command = require("../struct/Command")

class TextCommandManager extends Base {
  constructor(client, config) {
    super()
    this.client = client
    this.config = config
    this.commands = client.collections.add("textCommands").get("textCommands")
    client.collections.add("textCooldowns")

    if (this.autoLoad) {
      try {
        this.loadAll()
      } catch(e) {
        this.emit("error", e)
        this.log.typer(`${e.message || "unknown"}\n${e.stack}`)
      }
    }
  }

  async loadAll() {
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
    if (!this.config.folders.find(c => c === folder)) return;

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
      this.log.success(`Loaded Command: ${data.name || "unknown"} - Text`)
    }
    this.setCommand(data, filename)
  }

  setCommand(data, fn) {
    if (!data) return this.log.typer(`No data is given for file ${fn}`)

    if (!data || !data.name || !data.description) {
      return this.log.typer(`Not enough Data for ${fn}`)
    }

    let cmd = new Command(this.client, data)
    return this.commands.set(data.name, cmd)
  }

  removeCommand(name) {
    if (!this.commands.has(name)) return this.log.typer(`No command found with name: ${name}`)

    this.commands.delete(name)
  }

  getCommand(name) {
    if (!this.commands.has(name)) return this.log.typer(`No command found with name: ${name}`)

    this.commands.get(name)
  }

  get subs() {
    return this.config.subs
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
}

module.exports = TextCommandManager