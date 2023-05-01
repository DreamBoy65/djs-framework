module.exports = {
  name: "lola",
  description: "lol",
  run: async(client, int) => {
    int.follow({
      content: "Lmao"
    })
  }
}