module.exports = {
  bot: {
    intents: [],
    prefix: "$"
  },

  owners: [],

  events: {
    dirs: false,
    dir: "events",
    autoLoad: true,
    showLogs: true,
    subDirs: ["guild",
      "client"]
  },

  slashCommand: {
    enable: true,
    dir: "slashCommands",
    autoLoad: true,
    showLogs: true,
    parentCommands: [],
    loadGlobal: false,
    autoHandle: true,
    showLoadLogs: true
  },

  textCommand: {
    enable: false,
    dir: "textCommands",
    autoLoad: true,
    showLogs: true,
    folders: []
  },

  constants: {
    SlashOption: {
      SubCommand: 1,
      SubCommandGroup: 2,
      String: 3,
      Integer: 4,
      Boolean: 5,
      User: 6,
      Channel: 7,
      Role: 8,
      MentionAble: 9,
      Number: 10,
      Attachment: 11
    },

    ApplicationCommand: {
      ChatInput: 1,
      User: 2,
      Message: 3
    },

    SlashCommandPerms: {
      Role: 1,
      User: 2,
      Channel: 3
    }
  },

  mongoDB: {
    enable: false,
    autoLoad: true,
    models: [],
    modelDir: "models",
    uri: "",
    config: {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      autoIndex: false,
      connectTimeoutMS: 10000,
      family: 4
    }
  },

  jsonDB: {
    enable: false,
    dir: "databases",
    dbs: ["data"],
    autoLoad: true
  }
}