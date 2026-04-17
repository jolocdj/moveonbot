require("dotenv").config();

const { REST, Routes, SlashCommandBuilder } = require("discord.js");

const commands = [
  new SlashCommandBuilder()
    .setName("moveon")
    .setDescription("Get a move-on reminder"),

  new SlashCommandBuilder()
    .setName("relapse")
    .setDescription("Get a relapse prevention reminder"),

  new SlashCommandBuilder()
    .setName("unsaidthoughts")
    .setDescription("Share what you wanted to say and get a response")
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("What you wanted to say")
        .setRequired(true),
    ),

  new SlashCommandBuilder()
    .setName("nocontact")
    .setDescription("Track your no-contact streak with context")
    .addIntegerOption((option) =>
      option.setName("days").setDescription("Number of days").setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("What you're feeling right now")
        .setRequired(false),
    ),

  new SlashCommandBuilder()
    .setName("replycheck")
    .setDescription("Check if a message is worth sending")
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("Your draft message")
        .setRequired(true),
    ),
].map((command) => command.toJSON());

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("Registering slash commands...");

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID,
      ),
      { body: commands },
    );

    console.log("Slash commands registered successfully.");
  } catch (error) {
    console.error(error);
  }
})();
