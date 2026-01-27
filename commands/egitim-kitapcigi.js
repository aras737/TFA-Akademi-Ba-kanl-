const { SlashCommandBuilder, EmbedBuilder, Events } = require("discord.js");

// 1. KOMUT TANIMI (commands dizisinin içine eklenecek kısım)
const egitimKitapcigıCmd = new SlashCommandBuilder()
    .setName("egitim-kitapcigi")
    .setDescription("Eğitim kitapçıklarını gösterir");

// 2. ETKİLEŞİM MANTIĞI (InteractionCreate olayının altına eklenecek kısım)
/* NOT: Eğer bu kodu ayrı bir dosyada tutuyorsan aşağıdaki "execute" kısmını kullan. 
   Eğer index.js içine ekliyorsan interaction.commandName === "egitim-kitapcigi" kontrolü yapmalısın.
*/

async function egitimKitapcigiCalistir(interaction) {
    const embed = new EmbedBuilder()
      .setColor("Blue") // Daha güvenli bir renk tanımı
      .setAuthor({
        name: "Akademi Başkanlığı",
        iconURL: "https://i.imgur.com/8QZQZQZ.png"
      })
      .setTitle("📚 EĞİTİM KİTAPÇIKLARI 📚")
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
        text: "Akademi işi, gönül işi"
      })
      .setTimestamp();

    // Komutu sadece yetkililer mi görsün? 
    // Eğer herkes görsün istiyorsan ephemeral: true kısmını silebilirsin.
    await interaction.reply({ embeds: [embed] });
}

// EĞER INDEX.JS İÇİNE YAPIŞTIRACAKSAN:
/*
  if (interaction.commandName === "egitim-kitapcigi") {
      await egitimKitapcigiCalistir(interaction);
  }
*/
