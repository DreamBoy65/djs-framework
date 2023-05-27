const Base = require("../utils/Base")
const check = require("../utils/PermissionCheck")
const ms = require("ms")

class SlashHandler extends Base {
  constructor(client) {
    super()
    this.client = client
    this.config = this.client.defConfig
    this.manager = this.client.slashCommandManager
  }

  async handle(int) {
    if (int.commandType !== this.client.consts.ApplicationCommand.ChatInput) return;

    const {
      commandName
    } = int

    let command

    if (int.options._subcommand) {
      command = this.getCommand(commandName + "-" + int.options._subcommand)
    } else {
      command = this.getCommand(commandName)
    }

    if (!command) {
      return int.follow({
        content: `Command ${commandName} not found.`
      })
    }
    
    await int.deferReply({
      ephemeral: command.ephemeral || true
    })

    const {
      access,
      reasons
    } = await check(command, int)

    if (!access) {
      return int.follow({
        content: `${reasons.map((c, i = 0) => `${i + 1}. ${c}`).join("\n")}`
      })
    }

    let options = {}
    for (const option of int.options._hoistedOptions) {
      options[option.name] = option
    }

    let cooldown = command.onCooldown()

    if (cooldown) {
      return int.follow({
        content: `This command is currently on cooldown for ${ms(((cooldown.time + cooldown.cooldown) - Date.now()))}`
      })
    }

    try {
      await command.run(this.client,
        int, options)

      if (command.isCooldownEnabled) {
        command.setCooldown()

        setTimeout(() => {
          command.removeCooldown()
        }, command.cooldown)
      }

    } catch(e) {
      if (command.isCooldownEnabled) {
        command.removeCooldown()
      }
      return int.follow({
        content: `Something bad Happened...\nError: ${e.message || "none"}`
      })
    }
  }

  getCommand(name) {
    try {
      return this.manager.getCommand(name)
    } catch(e) {
      return false
    }
  }
}

module.exports = SlashHandler