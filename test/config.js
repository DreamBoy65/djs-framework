module.exports = {
  bot: {
    token:
    "ODE4MTMyNzUwMTQ1MjkwMjQy.GIL6Bu.JVxgqOD-njlEu4tnEo55rw1amXDGMVxnCe9Qsk",
    intents: ["Guilds"]
  },

  events: {
    dir: "test/events",
    subDirs: ["client"],
    dirs: true,
    showLogs: false
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
  }
}