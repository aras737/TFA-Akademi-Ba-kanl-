module.exports = {
  name: "interactionCreate",

  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (err) {
      console.error(err);
      if (interaction.replied || interaction.deferred) {
        interaction.editReply("Bir hata oluştu.");
      } else {
        interaction.reply({ content: "Bir hata oluştu.", ephemeral: true });
      }
    }
  }
};
