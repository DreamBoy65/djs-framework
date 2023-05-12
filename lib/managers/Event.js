const Base = require("../utils/Base")

class EventManager extends Base {
  constructor(client, config) {
    super()
    this.client = client
    this.config = config

    if (this.config.autoLoad) {
      this.loadAll()
    }
  }

  load(name, fun) {
    if (this.showLogs) {
      this.log.success(`Loaded Event: ${name}`)
    }
    this.client.on(name, fun.bind(null, this.client))
  }

  async loadAll() {
    try {
      if (!this.functions.isDir(this.dir)) return this.log.typer(`${this.dir} is not a directory`)
      await this.loadSubs()
      await this.loadDirect()
      this.emit("EventLoaded", this)
    } catch(e) {
      this.emit("error", e)
      this.log.typer(`${e.message || "unknown"}\n${e.stack}`)
    }
  }

  async loadDirect() {
    if (this.dirs) return;
    
    let files = await this.functions.readdirSync(`${process.cwd()}/${this.dir}`)
    for (const file of files) {
      if (file.split(".")[1] !== "js") return;

      let name = file.split(".")[0]
      let module = require(`${process.cwd()}/${this.dir}/${file}`)
      this.load(name, module)
    }
  }

  async loadSubs() {
    if (!this.dirs) return;

    for (const dir of this.subdirs) {
      let files = await
      this.functions.readdirSync(`${process.cwd()}/${this.dir}/${dir}`)

      for (const f of files) {
        if (f.split(".")[1] !== "js") return;

        let name = f.split(".")[0]
        let module = require(`${
          process.cwd()}/${this.dir}/${dir}/${f}`)
        this.load(name, module)
      }
    }
  }

  get dirs() {
    return Boolean(this.config.dirs)
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

  get subdirs() {
    return this.config.subDirs
  }
}

module.exports = EventManager