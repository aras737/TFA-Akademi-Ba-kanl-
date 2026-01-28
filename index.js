const { Client, GatewayIntentBits, EmbedBuilder, SlashCommandBuilder, REST, Routes } = require("discord.js");
require("dotenv").config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// --- KOMUT KAYDI ---
const commands = [
  new SlashCommandBuilder()
    .setName("egitim-kitapcigi")
    .setDescription("Eğitim kitapçıklarını listeler")
].map(command => command.toJSON());

client.once("ready", async () => {
  console.log(`🚀 ${client.user.tag} giriş yaptı!`);
  const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
  try {
    await rest.put(Routes.applicationCommands(client.user.id), { body: commands });
    console.log("✅ Komutlar başarıyla yüklendi.");
  } catch (error) {
    console.error(error);
  }
});

// --- KOMUT ÇALIŞTIRICI ---
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "egitim-kitapcigi") {
    // Yanıt vermedi hatasını önlemek için önce defer yapıyoruz
    await interaction.deferReply().catch(() => null);

    const embed = new EmbedBuilder()
      .setColor("#006dff")
      .setAuthor({
        name: "Akademi Başkanlığı",
        iconURL: "https://i.ibb.co/L6vVv9N/akademi-logo.png" // Logonu buraya ekledim
      })
      .setTitle("📖 EĞİTİM KİTAPÇIKLARI 📖")
      .setDescription(
        `**[OR-1/A] EĞİTİM KİTAPÇIĞI**\nhttps://docs.google.com/document/d/1cMWaGzAnE0qYiKyfxXRL608ABgjOSogSoUtTZikSWYk/edit?usp=sharing\n\n` +
        `**[OR-1/B] EĞİTİM KİTAPÇIĞI**\nhttps://docs.google.com/document/d/1FMD7mNXIrFa33H9INlOmr3ULbefwR63yV5BePwhGqgM/edit?usp=sharing\n\n` +
        `**[OR-2] EĞİTİM KİTAPÇIĞI**\nhttps://docs.google.com/document/d/1MS-c8spE22DvTHccV2hsWoF99u_pPwsnogHO-IDUDvY/edit?usp=sharing\n\n` +
        `**[OR-3 / OR-9] EĞİTİM KİTAPÇIĞI**\nhttps://docs.google.com/document/d/1ygwULEGoXN4xIioj9PAgK3K89ZSM7-Gkg73V7qfPsso/edit?usp=sharing\n\n`
      )
      .setFooter({
        text: "Akademi işi, Gönül İşi!",
        iconURL: "https://i.ibb.co/L6vVv9N/akademi-logo.png"
      })
      .setTimestamp();

    await interaction.editReply({ embeds: [embed] }).catch(console.error);
  }
});

client.login(process.env.TOKEN);
