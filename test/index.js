const {
  Client
} = require(`${process.cwd()}/lib/index`)
const config = require("./config")
const client = new Client(config)

client.start()