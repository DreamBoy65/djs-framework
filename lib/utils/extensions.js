const {
  Message,
  BaseInteraction
} = require("discord.js")

BaseInteraction.prototype.follow = async function(data) {

  this.followUp({
    ...data,
    ephemeral: data.eph ?? true
  })
}