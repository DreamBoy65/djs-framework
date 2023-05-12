module.exports = {
  bot: {
    token:
    "ODE4MTMyNzUwMTQ1MjkwMjQy.GajpOO.33udjR29UP-I5mhJZVnsWeR3B_OE2FE0TKcIY",
    intents: ["Guilds"]
  },

  events: {
    dir: "test/events",
    subDirs: ["client"],
    dirs: false,
    showLogs: true
  },

  slashCommand: {
    dir: "test/slashCommands",
    parentCommands: [{
      dir: "lol",
      name: "lol",
      description: "lola"
    }],
    showLogs: false
  },

  textCommand: {
    dir: "test/textCommands",
    folders: ["lol"],
    showLogs: false
  },

  jsonDB: {
    enable: false,
    dir: "test/databases",
    dbs: ["data"],
    autoLoad: true
  },


}