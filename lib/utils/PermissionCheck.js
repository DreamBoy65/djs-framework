const {
  PermissionFlagsBits
} = require("discord.js")

module.exports = (command, int) => {
  const user = int.user ? int.user: int.author
  const reasons = []

  if (command.guildOnly && int.channel.type === 1) {
    reason.push("DM only.")
  }

  if (command.ownerOnly && !int.client.defConfig.owners.find(c => c ===
    int.user.id)) {
    reasons.push("Owner(s) only.")
  }

  if (int.guild) {
    if (command.clientPermissions.length > 0) {
      let perms = int.guild.members.me.permissionsIn(int.channel)

      if (!perms.has(command.clientPermissions.map(e =>
        PermissionFlagsBits[e]))) {
        reasons.push(`I dont have enough permission(s):\n${Object.entries(perms.serialize()).filter(c =>
          command.clientPermissions.includes(c[0]) && !c[1]).map(e =>
          `  • ${e[0]}`).join("\n")
          }`)
      }
    }

    if (command.memberPermissions.length > 0) {
      let perms = int.member.permissionsIn(int.channel)

      if (!perms.has(command.memberPermissions.map(e =>
        PermissionFlagsBits[e]))) {
        reasons.push(`You dont have enough permission(s):\n${Object.entries(perms.serialize()).filter(c =>
          command.memberPermissions.includes(c[0]) && !c[1]).map(e =>
          ` •  ${e[0]}`).join("\n")
          }`)
      }
    }

      if (command.adminOnly &&
        !int.member.permissions.has(PermissionFlagsBits.Administrator)) {
        reasons.push("Admin Only.")
      }
  }

  return {
    access: reasons.length > 0 ? false: true,
    reasons: reasons
  }
}