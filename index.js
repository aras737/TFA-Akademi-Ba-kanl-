const { Client, GatewayIntentBits, EmbedBuilder, SlashCommandBuilder, REST, Routes } = require("discord.js");
require("dotenv").config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// --- KOMUT TANIMLARI ---
const commands = [
  new SlashCommandBuilder()
    .setName("egitim-kitapcigi")
    .setDescription("Eğitim kitapçıklarını listeler"),
  new SlashCommandBuilder()
    .setName("madalya-sistemi")
    .setDescription("Akademi madalya ve nişan sistemini gösterir")
].map(command => command.toJSON());

client.once("ready", async () => {
  console.log(`🚀 ${client.user.tag} başarıyla giriş yaptı!`);
  const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
  try {
    await rest.put(Routes.applicationCommands(client.user.id), { body: commands });
    console.log("✅ Komutlar global olarak yüklendi.");
  } catch (error) {
    console.error("Yükleme hatası:", error);
  }
});

// --- KOMUT ÇALIŞTIRICI ---
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  // Hata almamak için botu 'düşünüyor' moduna alıyoruz
  // 'ephemeral: true' yaparak mesajın sadece atan kişiye görünmesini ve isminin gizli kalmasını sağlıyoruz
  await interaction.deferReply({ ephemeral: true }).catch(() => null);

  const logoURL = "https://i.ibb.co/v6mXmP0/akademi-logo.png"; // Attığın logoyu buraya ekledim

  // --- EĞİTİM KİTAPÇIĞI KOMUTU ---
  if (interaction.commandName === "egitim-kitapcigi") {
    const embed = new EmbedBuilder()
      .setColor("#2b2d31")
      .setAuthor({ name: "Akademi Başkanlığı", iconURL: logoURL })
      .setTitle("📖 EĞİTİM KİTAPÇIKLARI 📖")
      .setDescription(
        `**[OR-1/A] EĞİTİM KİTAPÇIĞI**\nhttps://docs.google.com/document/d/1cMWaGzAnE0qYiKyfxXRL608ABgjOSogSoUtTZikSWYk/edit?usp=sharing\n\n` +
        `**[OR-1/B] EĞİTİM KİTAPÇIĞI**\nhttps://docs.google.com/document/d/1FMD7mNXIrFa33H9INlOmr3ULbefwR63yV5BePwhGqgM/edit?usp=sharing\n\n` +
        `**[OR-2] EĞİTİM KİTAPÇIĞI**\nhttps://docs.google.com/document/d/1MS-c8spE22DvTHccV2hsWoF99u_pPwsnogHO-IDUDvY/edit?usp=sharing\n\n` +
        `**[OR-3 / OR-9] EĞİTİM KİTAPÇIĞI**\nhttps://docs.google.com/document/d/1ygwULEGoXN4xIioj9PAgK3K89ZSM7-Gkg73V7qfPsso/edit?usp=sharing`
      )
      .setFooter({ text: "Akademi işi, Gönül İşi!", iconURL: logoURL })
      .setTimestamp();

    return interaction.editReply({ embeds: [embed] });
  }

  // --- MADALYA SİSTEMİ KOMUTU ---
  if (interaction.commandName === "madalya-sistemi") {
    const embed = new EmbedBuilder()
      .setColor("#3a01ff") // Görseldeki morumsu/mavi şerit rengi
      .setAuthor({ name: "Akademi Başkanlığı", iconURL: logoURL })
      .setTitle("MADALYA SİSTEMİ")
      .setDescription(
        `**Eğitim Tamamlama Madalyaları (Subay)**\n` +
        `Bronz Eğitim Nişanı - 25 Eğitim Tamamlayan subaylara verilir. (Teğmen-Üsteğmen)\n` +
        `Gümüş Eğitim Nişanı - 30 Eğitimi tamamlayan subaylara verilir. (Üsteğmen-Binbaşı)\n` +
        `Altın Eğitim Nişanı - 40 ve üzeri eğitimi tamamlayan subaylara verilir. (Albay-Yarbay)\n\n` +
        
        `**Aktiflik Madalyaları (Subay & General)**\n` +
        `Aktiflik Rozeti Oyunda 12 Saat Aktif Kalan Subay ve Generallere Verilir\n` +
        `Görev Sadakat Madalyası - Düzenli Eğitim/Denetmenlik Yapan Subay Generallere verilir.\n` +
        `Üstün Hizmet madalyası: Oyunda 20 Saat Aktif kalıp Düzenli Görevini Yapan Subay/Generallere Verilir.\n\n` +
        
        `**Denetleme Madalyaları (General)**\n` +
        `Bröve Denetim Rozeti - 20 eğitim denetlemeyi tamamlayan generallere verilir.\n` +
        `Stratejik Denetim Madalyası - 30 eğitim denetlemeyi tamamlayan generallere verilir.\n` +
        `Üstün Komuta Nişanı - 40 ve üzeri eğitim denetlemeyi tamamlayan generallere verilir.\n\n` +
        
        `**Haftalık Nişanlar (Subay & General)**\n` +
        `Haftanın Subayı: Bir haftada en çok eğitim yapan subaya verilir\n` +
        `Haftanın Generali: Bir haftada en çok denetmenlik yapan denetmene verilir\n` +
        `Aktiflik Nişanı: 1 hafta oyunda en aktif subay veya generale verilir.`
      )
      .setFooter({ text: "Akademi işi, Gönül İşi!", iconURL: logoURL });

    return interaction.editReply({ embeds: [embed] });
  }
});

client.login(process.env.TOKEN);
