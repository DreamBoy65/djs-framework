module.exports = (client) => {
  client.log.log("Im Ready as " + client.user.username)
  client.slashCommandManager.registerCommands()
}