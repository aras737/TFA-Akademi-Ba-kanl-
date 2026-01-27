const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("egitim-kitapcigi")
    .setDescription("Eğitim kitapçıklarını gösterir"),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor(0x0a2a66)
      .setAuthor({
        name: "Akademi Başkanlığı",
        iconURL: "https://i.imgur.com/8QZQZQZ.png" // istersen değiştir
      })
      .setTitle("📚 EĞİTİM KİTAPÇIKLARI 📚")
      .setDescription(
`**[OR-1/A] EĞİTİM KİTAPÇIĞI**
https://docs.google.com/document/d/1cMWaGzAnE0qYiKyfxXRL608ABgjOSogSoUtTZikSWYk/edit?usp=sharing

**[OR-1/B] EĞİTİM KİTAPÇIĞI**
https://docs.google.com/document/d/1FMD7mNXIrFa33H9INlOmr3ULbefwR63yV5BePwhGqgM/edit?usp=sharing

**[OR-2] EĞİTİM KİTAPÇIĞI**
https://docs.google.com/document/d/1MS-c8spE22DvTHccV2hsWoF99u_pPwsnogHO-IDUDvY/edit?usp=sharing

**[OR-3 / OR-9] EĞİTİM KİTAPÇIĞI**
https://docs.google.com/document/d/1ygwULEGoXN4xIioj9PAgK3K89ZSM7-Gkg73V7qfPsso/edit?usp=sharing`
      )
      .setFooter({
        text: "Akademi işi, gönül işi"
      })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
};
