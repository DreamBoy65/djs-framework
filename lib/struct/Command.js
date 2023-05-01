const Base = require("../utils/Base")
const {
  PermissionFlagsBits
} = require("discord.js")

class Command extends Base {
  constructor(client, data) {
    super()
    this.data = this.functions.mergeObj(this.config(), data)
    this.client = client

    if (!data || !data.name || !data.description) {
      return this.log.typer("Not enough Data")
    }

    if (!data.run || typeof data.run !== "function") {
      return this.log.typer("Run Function not defined")
    }

    this.cooldownManager = this.client.collections.get("slashCooldowns")
  }

  onCooldown() {
    if (this.cooldownManager.has(this.parent ? `${this.parent}-${this.name}`:
      this.name)) {
      return this.cooldownManager.get(this.parent ? `${this.parent}-${this.name}`: this.name)
    } else {
      return false
    }
  }

  setCooldown() {
    if (!this.isCooldownEnabled) return this.typer("Cooldown is disabled!")

    this.cooldownManager.set(this.parent ? `${this.parent}-${this.name}`: this.name, {
      name: this.name,
      cooldown: this.cooldown,
      time: Date.now()
    })
  }

  removeCooldown() {
    if (!this.isCooldownEnabled) return this.typer("Cooldown is disabled!")

    if (this.cooldownManager.has(this.parent ? `${this.parent}-${this.name}`: this.name)) {
      this.cooldownManager.delete(this.parent ? `${this.parent}-${this.name}`: this.name)
    }
  }

  toJSON(slash = false) {
    if (!slash) {
      return this.data
    }

    let data = {
      ...this.data
    }
    delete data.run

    if (data.parent) {
      let da = this.client.defConfig.slashCommand.parentCommands.find(c => c.dir === data.parent)

      if (!da || !da.name || !da.description) {
        this.log.typer("Name and description must be defined for category " + data.parent)
      }

      let dda = {
        name: da.name,
        description: da.description
      }

      data.type = "SubCommand"

      dda.options = [data]
      data = dda
    }

    data.options = this.replaceOptions(data.options)

    if (data.memberPermissions?.length > 0) {
      data.default_member_permissions = data.memberPermissions.map(e => {
        if (!PermissionFlagsBits[e]) {
          this.log.typer(`Invalid Permission ${e} in ${data.name} command`)
        }

        return PermissionFlagsBits[e]
      }).reduce((a, b) => a | b)
    }

    if (data.guildOnly) {
      data.dm_permission = true
    } else if (!data.guildOnly) {
      data.dm_permission = false
    }

    return data
  }

  replaceOptions(opts) {
    for (const option of opts) {
      if (typeof option !== "object") {
        this.log.typer("Options must be an object.")
      }

      if (option.type) {
        option.type = this.client.consts.SlashOption[option.type]
      }

      if (option.options) {
        option.options = this.replaceOptions(option.options)
      }

      if (option.memberPermissions?.length > 0) {
        option.default_member_permissions = option.memberPermissions.map(e => {
          if (!PermissionFlagsBits[e]) {
            this.log.typer(`Invalid Permission ${e} in ${data.name} command`)
          }

          return PermissionFlagsBits[e]
        }).reduce((a, b) => a | b)
      }

      if (option.guildOnly) {
        option.dm_permission = true
      } else if (!option.guildOnly) {
        option.dm_permission = false
      }
    }

    return opts
  }

  get name() {
    return this.data.name
  }

  get description() {
    return this.data.name
  }

  get clientPermissions() {
    return this.data.clientPermissions
  }

  get guildOnly() {
    return Boolean(this.data.guildOnly)
  }

  get memberPermissions() {
    return this.data.memberPermissions
  }

  get ownerOnly() {
    return Boolean(this.data.ownerOnly)
  }

  get adminOnly() {
    return Boolean(this.data.adminOnly)
  }

  get isCooldownEnabled() {
    return Boolean(this.data.cooldown.enable)
  }

  get cooldown() {
    return this.isCooldownEnabled ? this.data.cooldown.time: null
  }

  get options() {
    return this.data.options
  }

  get example() {
    return this.data.examples
  }
  get usage() {
    return this.data.usage
  }

  get run() {
    return this.data.run
  }

  get parent() {
    return this.data.parent
  }

  config() {
    return {
      clientPermissions: [],
      memberPermissions: [],
      guildOnly: true,
      adminOnly: false,
      ownerOnly: false,
      cooldown: {
        enable: false,
        time: 0
      },
      options: [],
      examples: [],
      usage: [],
      parent: null
    }
  }
}

module.exports = Command