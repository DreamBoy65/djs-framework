const Base = require("../utils/Base")
const check = require("../utils/PermissionCheck")
const ms = require("ms")
const {
  PermissionFlagsBits
} = require("discord.js")

class SlashHandler extends Base {
  constructor(client config) {
    super()
    this.client = client
    this.config = this.client.defConfig
    this.manager = this.client.textCommandManager
  }

  async handle(msg, prefix = this.config.bot.prefix || "$") {
    if (msg.author.bot) return;

    if (msg.guild &&
      !msg.channel.permissionsFor(msg.guild.me).has(PermissionFlagsBits.SendMessages)) {
      return;
    }

    if (
      message.content.match(new RegExp(`^<@!?${message.client.user.id}>( |)$`))
    ) {
      return msg.reply(`My prefix is ${prefix}.`)
    }

    let prefix

    if (message.content.startsWith(message.client.user.username)) {
      prefix = message.client.user.username;
    } else if (message.content.startsWith(prefix)) {
      prefix = prefix;
    }

    if (!prefix) return;

    const args = msg.content
    .slice(typeof prefix === "string" ? prefix.length: 0)
    .trim()
    .split(/ +/g);

    let name = args.shift().toLowerCase();

    let command = this.getCommand(name)

    if (!command) return;

    const {
      access,
      reasons
    } = await check(command, msg)

    if (!access) {
      return msg.reply(`${reasons.map((c, i = 0) => `${i + 1}. ${c}`).join("\n")}`)
    }

    let cooldown = command.onCooldown()

    if (cooldown) {
      return msg.reply({
        content: `This command is currently on cooldown for ${ms(((cooldown.time + cooldown.cooldown) - Date.now()))}`
      })
    }

    try {
      await command.run(this.client,
        msg, args)

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
      return msg.reply({
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