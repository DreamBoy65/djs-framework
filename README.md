# DJS Framework

A framework for your bot with discord.js@v14

## Contents
- [How to use it?](#how-to-use-it-)
  * [Config.js](#configjs)
  * [Index.js](#indexjs)
  * [Slash Command Structure](#slash-command-structure)
  * [Text Command Structure](#text-command-structure)

## How to use it?

```
<your bot name>/
├─ src/
│  ├─ slashCommands/
│  ├─ textCommands/
│  ├─ events/
│  │  ├─ client/
│  │  ├─ guild/
│  ├─ config.js
│  ├─ index.js
├─ node_modules/
├─ package.json
```

Create your workspace like this

### Config.js

```js
module.exports = {
  bot: {
    token:
    "TOKEN-GOES-HERE",
    intents: ["Guilds"] // the intents to load
  },

  events: {
    dir: "bot/events", // events directory
    subDirs: ["client"], // sub-directories of events
    dirs: true, // whether or not if you have sub-directories
    showLogs: false
  },

  slashCommand: {
    dir: "bot/slashCommands", // slash command directory
    parentCommands: [{
      dir: "lol",            // sub-directory if you want
      name: "lol",
      description: "lola"
    }],
    showLogs: false
  },

  textCommand: {
    dir: "bot/textCommands", // text command directory
    folders: ["lol"],
    showLogs: false
  }
}
```

### Index.js

```js
const {
  Client
} = require(`@shadowgarden/djs-framebot`)
const config = require("./config")
const client = new Client(config)

client.start()
```

### Slash Command Structure
```js
module.exports = {
  name: "ping",             //name of the command
  description: "ping bot",  //description of the command
  options: [{
    name: "user",
    type: "User",
    description: "user..",
    required: false
  }],
  cooldown: {
    enable: true,
    time: 5000
  },
  clientPermissions: [],
  memberPermissions: [],
  adminOnly: false,
  ownerOnly: false,
  run: async(client, int) => {
    int.follow({
      content: "lol"
    })
  }
}
```

### Text Command Structure

```js
module.exports = {
  name: "ping",
  description: "ping",
  cooldown: {
    enable: true,
    time: 5000
  },
  clientPermissions: [],
  memberPermissions: [],
  adminOnly: false,
  ownerOnly: false,
  run: async(client, message, args) => {
    message.channel.send('pong!')
  }
}
```

## ⭐ the project if you like it!
[![Join our discord](https://i.imgur.com/fFfU9aF.png)](https://discord.gg/pEnmPjS6QK)
