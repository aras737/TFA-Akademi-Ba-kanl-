const { 
  Client, 
  GatewayIntentBits, 
  EmbedBuilder, 
  SlashCommandBuilder, 
  REST, 
  Routes, 
  Events 
} = require("discord.js");
require("dotenv").config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

/* ================= KOMUT TANIMI ================= */
const commands = [
  new SlashCommandBuilder()
    .setName("egitim-kitapcigi")
    .setDescription("Akademi Başkanlığı eğitim kitapçıklarını gösterir")
].map(c => c.toJSON());

/* ================= BOT HAZIR OLDUĞUNDA ================= */
client.once(Events.ClientReady, async (c) => {
  const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
  try {
    await rest.put(Routes.applicationCommands(c.user.id), { body: commands });
    console.log(`✅ ${c.user.tag} Aktif!`);
  } catch (err) {
    console.error(err);
  }
});

/* ================= KOMUT ÇALIŞTIRICI ================= */
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "egitim-kitapcigi") {
    const embed = new EmbedBuilder()
      .setColor("#2b2d31") // Görseldeki koyu Discord arka planına yakın renk
      .setAuthor({
        name: "Akademi Başkanlığı",
        iconURL: "https://i.ibb.co/v6mXmP0/akademi-logo.png" // Attığın logoyu buraya ekledim
      })
      .setTitle("📖EĞİTİM KİTAPÇIKLARI📖")
      .setDescription(
        `**[OR-1/A] EĞİTİM KİTAPÇIĞI**\n` +
        `https://docs.google.com/document/d/1cMWaGzAnE0qYiKyfxXRL608ABgjOSogSoUtTZikSWYk/edit?usp=sharing\n\n` +
        
        `**[OR-1/B] EĞİTİM KİTAPÇIĞI**\n` +
        `https://docs.google.com/document/d/1FMD7mNXIrFa33H9INlOmr3ULbefwR63yV5BePwhGqgM/edit?usp=sharing\n\n` +
        
        `**[OR-2] EĞİTİM KİTAPÇIĞI**\n` +
        `https://docs.google.com/document/d/1MS-c8spE22DvTHccV2hsWoF99u_pPwsnogHO-IDUDvY/edit?usp=sharing\n\n` +
        
        `**[OR-3 / OR-9] EĞİTİM KİTAPÇIĞI**\n` +
        `https://docs.google.com/document/d/1ygwULEGoXN4xIioj9PAgK3K89ZSM7-Gkg73V7qfPsso/edit?usp=sharing`
      )
      .setFooter({
        text: "Akademi işi, Gönül İşi!",
        iconURL: "https://i.ibb.co/v6mXmP0/akademi-logo.png"
      })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
});

client.login(process.env.TOKEN);
