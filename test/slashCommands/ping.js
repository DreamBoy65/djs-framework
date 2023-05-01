module.exports = {
  name: "ping",
  description: "ping bot",
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
  run: async(client, int) => {
    int.follow({
      content: "lol"
    })
  }
}