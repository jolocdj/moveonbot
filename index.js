require("dotenv").config();

console.log("bot script started");

const {
  Client,
  GatewayIntentBits,
  Events,
  EmbedBuilder,
} = require("discord.js");

console.log("TOKEN exists:", !!process.env.TOKEN);

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function analyzeMessage(text = "") {
  const msg = text.toLowerCase();

  if (
    msg.includes("miss") ||
    msg.includes("namimiss") ||
    msg.includes("miss ko") ||
    msg.includes("i miss") ||
    msg.includes("naaalala") ||
    msg.includes("hinahanap")
  ) {
    return "miss";
  }

  if (
    msg.includes("chat") ||
    msg.includes("text") ||
    msg.includes("message") ||
    msg.includes("replyan") ||
    msg.includes("imessage") ||
    msg.includes("kausapin") ||
    msg.includes("send") ||
    msg.includes("reach out")
  ) {
    return "relapse";
  }

  if (
    msg.includes("lungkot") ||
    msg.includes("sad") ||
    msg.includes("iyak") ||
    msg.includes("hurt") ||
    msg.includes("sakit") ||
    msg.includes("pagod") ||
    msg.includes("masakit")
  ) {
    return "sad";
  }

  if (
    msg.includes("closure") ||
    msg.includes("tanong") ||
    msg.includes("bakit") ||
    msg.includes("why") ||
    msg.includes("answer") ||
    msg.includes("sagot")
  ) {
    return "closure";
  }

  if (
    msg.includes("alone") ||
    msg.includes("mag-isa") ||
    msg.includes("lonely") ||
    msg.includes("wala akong") ||
    msg.includes("walang kasama") ||
    msg.includes("i feel alone")
  ) {
    return "lonely";
  }

  if (
    msg.includes("galit") ||
    msg.includes("inis") ||
    msg.includes("angry") ||
    msg.includes("bwisit") ||
    msg.includes("betray") ||
    msg.includes("betrayed")
  ) {
    return "angry";
  }

  return "general";
}

function generateMoveOnReply() {
  const intros = [
    "Okay, listen.",
    "Breathe first.",
    "MoveOnBot says:",
    "Ito ang gentle reminder mo today:",
  ];

  const bodies = [
    "Beh, wag na. Na-miss mo lang yung attention.",
    "You are healing, not losing.",
    "Do not text them. Tubig muna.",
    "Closure is not always a conversation.",
    "Missing them is not a sign to go back.",
    "Hindi lahat ng nostalgia ay invitation.",
    "Peace is better than temporary kilig.",
  ];

  const endings = [
    "One step at a time.",
    "Piliin mo ulit sarili mo.",
    "You already survived worse nights.",
    "Hindi ka pa tapos mag-heal.",
  ];

  return `${pickRandom(intros)}\n\n${pickRandom(bodies)}\n\n${pickRandom(endings)}`;
}

function generateRelapseReply() {
  const intros = [
    "Relapse check.",
    "Pause.",
    "Before you do anything impulsive...",
    "Honest answer?",
  ];

  const bodies = [
    "Phone down muna.",
    "Type mo sa notes, hindi sa chat.",
    "You want comfort, not that person.",
    "No. Respectfully, no.",
    "The message does not need to be sent.",
    "Urge lang ito. Hindi ito sign.",
  ];

  const endings = [
    "Protect your progress.",
    "Huwag mong i-trade ang peace mo.",
    "This feeling will pass.",
    "You do not owe your loneliness a message.",
  ];

  return `${pickRandom(intros)}\n\n${pickRandom(bodies)}\n\n${pickRandom(endings)}`;
}

function generateUnsaidThoughtsReply(message) {
  const type = analyzeMessage(message);

  const intros = [
    "Narinig kita.",
    "That feeling is valid.",
    "Okay, let’s sit with that for a second.",
    "Gets kita.",
  ];

  const byType = {
    miss: [
      "Namimiss mo siya, pero hindi ibig sabihin kailangan mo siyang kausapin.",
      "Pwede mo siyang ma-miss without undoing your healing.",
      "Missing someone is normal. Going back is a separate choice.",
    ],
    relapse: [
      "Mukhang gusto mo lang ng response, hindi necessarily ng peace.",
      "Bago mo i-send, tanungin mo sarili mo: clarity ba ito o craving?",
      "The urge is loud, but that does not make it wise.",
    ],
    sad: [
      "Masakit talaga minsan, pero hindi ibig sabihin mali ang paglayo mo.",
      "Heavy day lang ito. Hindi ito failure.",
      "You can be hurting and still be healing.",
    ],
    closure: [
      "Hindi lahat ng tanong may sagot na makakatulong sa’yo.",
      "Closure is not always something they give.",
      "Some answers reopen wounds more than they heal them.",
    ],
    lonely: [
      "Lonely ka ngayon, pero hindi loneliness ang dapat magdesisyon para sa’yo.",
      "Ang need mo ngayon baka comfort, not reconnection.",
      "Being alone tonight does not mean you chose wrong.",
    ],
    angry: [
      "Valid ang galit mo, pero baka hindi makakatulong kung ipadala mo agad.",
      "You can be angry without handing them access to you again.",
      "Feel the anger. Huwag mo munang gawing message.",
    ],
    general: [
      "Valid ang nararamdaman mo, pero hindi lahat ng nararamdaman kailangang i-send.",
      "You can feel it without acting on it.",
      "Write it. Feel it. Do not send it.",
      "Hindi mo kailangan sirain ang progress mo tonight.",
    ],
  };

  const endings = [
    "Try mo muna isulat, then balikan mo after 10 minutes.",
    "You do not need to respond to every emotion immediately.",
    "Tonight is for feeling, not sending.",
    "Protect your peace first.",
  ];

  return `${pickRandom(intros)}\n\n${pickRandom(byType[type])}\n\n${pickRandom(endings)}`;
}

function generateNoContactReply(days, message = "") {
  const type = analyzeMessage(message);

  const intros = [
    `You survived **${days} day(s)** of no contact.`,
    `Day **${days}** and you are still here.`,
    `**${days} day(s)** strong.`,
  ];

  const missReplies = [
    "Miss mo siya, pero hindi ibig sabihin nun kailangan mo siyang balikan.",
    "Missing them is normal. Messaging them is a different decision.",
    "Pwede mo silang ma-miss without reopening the wound.",
    "Ang pangungulila ay totoo, pero hindi siya utos.",
  ];

  const relapseReplies = [
    "Before you send anything, huminga ka muna. Urge lang ito, hindi instruction.",
    "You do not need to act on every emotion tonight.",
    "Type mo muna sa notes, hindi sa chat box.",
    "The urge to reach out will pass. The message might restart everything.",
  ];

  const sadReplies = [
    "Masakit ngayon, pero hindi ibig sabihin wala kang progress.",
    "Healing still counts even on heavy days.",
    "Hindi nasisira ang healing mo dahil lang nalungkot ka today.",
    "Your pain is real, but so is your progress.",
  ];

  const closureReplies = [
    "Not every unanswered question needs another conversation.",
    "Closure is not always something they give.",
    "Some silences are answers too, kahit masakit tanggapin.",
    "You do not need one more reply to begin moving forward.",
  ];

  const lonelyReplies = [
    "Lonely ka tonight, but loneliness is not a reason to break no contact.",
    "Missing connection does not always mean missing the person.",
    "Baka companionship ang hinahanap mo, hindi sila mismo.",
    "Being alone right now does not mean you should go back.",
  ];

  const angryReplies = [
    "Galit ka ngayon, and that’s real, but impulsive messages usually create new mess.",
    "You can feel betrayed without reopening access.",
    "Do not let anger volunteer you for another painful conversation.",
    "Some messages feel powerful for 5 minutes and painful for 5 days.",
  ];

  const generalReplies = [
    "Keep choosing yourself, one day at a time.",
    "Healing is not linear, but this still counts as progress.",
    "You are not back to zero just because today feels heavy.",
    "Protect the peace you worked hard to build.",
  ];

  let selectedPool = generalReplies;

  if (type === "miss") selectedPool = missReplies;
  else if (type === "relapse") selectedPool = relapseReplies;
  else if (type === "sad") selectedPool = sadReplies;
  else if (type === "closure") selectedPool = closureReplies;
  else if (type === "lonely") selectedPool = lonelyReplies;
  else if (type === "angry") selectedPool = angryReplies;

  let extraLine = "";
  if (days >= 7) extraLine = "\n\nOne week strong.";
  if (days >= 30) extraLine = "\n\nThat is real progress.";
  if (days >= 100) extraLine = "\n\nElite healing behavior.";

  return `${pickRandom(intros)}\n\n${pickRandom(selectedPool)}${extraLine}`;
}

function generateReplyCheck(message) {
  const type = analyzeMessage(message);

  const openers = [
    "Message review:",
    "Here’s the honest take:",
    "MoveOnBot analysis:",
    "Real talk:",
  ];

  const checks = {
    miss: [
      "Mukhang galing ito sa pangungulila, hindi sa clarity.",
      "This sounds like you miss them, not that the situation is safe again.",
      "Emotional siya, pero hindi pa stable.",
    ],
    relapse: [
      "This feels impulsive.",
      "Mukhang urge message ito.",
      "Parang gusto mo lang ng response, kahit alam mong baka masaktan ka ulit.",
    ],
    sad: [
      "This reads like pain asking for comfort.",
      "Valid, pero vulnerable ka ngayon.",
      "You sound hurt, and that’s exactly why baka hindi magandang i-send muna.",
    ],
    closure: [
      "This sounds like you want answers they may not give honestly.",
      "Possible na hindi nito maibigay yung closure na gusto mo.",
      "Reasonable pakinggan, pero baka magbukas lang ulit ng sugat.",
    ],
    lonely: [
      "This feels more like loneliness than long-term clarity.",
      "Baka companionship ang hanap mo, not necessarily them.",
      "Understandable, but this reads like a lonely-night message.",
    ],
    angry: [
      "This is emotionally loaded.",
      "Gets yung galit, pero baka magsimula lang ito ng panibagong gulo.",
      "Strong ang emotion dito, kaya mas risky i-send ngayon.",
    ],
    general: [
      "May emotion pa sa ilalim nito.",
      "Hindi siya totally bad, pero baka hindi ito magandang oras.",
      "Pwede itong totoo, pero not necessarily helpful to send.",
    ],
  };

  const verdicts = [
    "Suggestion: huwag muna i-send tonight.",
    "Suggestion: i-save mo muna sa notes.",
    "Suggestion: balikan mo after 30 minutes.",
    "Suggestion: revise later when calmer ka na.",
  ];

  return `${pickRandom(openers)}\n\n${pickRandom(checks[type])}\n\n${pickRandom(verdicts)}`;
}

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Logged in as ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  try {
    if (!interaction.isChatInputCommand()) return;

    console.log("Command received:", interaction.commandName);

    if (interaction.commandName === "moveon") {
      const embed = new EmbedBuilder()
        .setTitle("MoveOnBot")
        .setDescription(generateMoveOnReply())
        .setFooter({ text: "One step at a time." });

      await interaction.reply({ embeds: [embed] });
    } else if (interaction.commandName === "relapse") {
      const embed = new EmbedBuilder()
        .setTitle("Relapse Alert")
        .setDescription(generateRelapseReply())
        .setFooter({ text: "Do not send that message." });

      await interaction.reply({ embeds: [embed] });
    } else if (interaction.commandName === "unsaidthoughts") {
      const message = interaction.options.getString("message");

      const embed = new EmbedBuilder()
        .setTitle("Unsaid Thoughts")
        .addFields(
          { name: "What you wanted to say", value: message },
          {
            name: "MoveOnBot says",
            value: generateUnsaidThoughtsReply(message),
          },
        )
        .setFooter({ text: "Feel it. Don’t send it." });

      await interaction.reply({ embeds: [embed] });
    } else if (interaction.commandName === "nocontact") {
      const days = interaction.options.getInteger("days");
      const message = interaction.options.getString("message") || "";

      const embed = new EmbedBuilder()
        .setTitle("No Contact Tracker")
        .setDescription(generateNoContactReply(days, message))
        .setFooter({ text: "Healing is not linear." });

      await interaction.reply({ embeds: [embed] });
    } else if (interaction.commandName === "replycheck") {
      const message = interaction.options.getString("message");

      const embed = new EmbedBuilder()
        .setTitle("Reply Check")
        .addFields(
          { name: "Draft message", value: message },
          { name: "MoveOnBot says", value: generateReplyCheck(message) },
        )
        .setFooter({ text: "Pause before you press send." });

      await interaction.reply({ embeds: [embed] });
    }
  } catch (error) {
    console.error("Interaction error:", error);

    if (interaction.isRepliable()) {
      if (interaction.deferred || interaction.replied) {
        await interaction
          .followUp({
            content: "Nagka-error habang pinoprocess yung command.",
            ephemeral: true,
          })
          .catch(console.error);
      } else {
        await interaction
          .reply({
            content: "Nagka-error habang pinoprocess yung command.",
            ephemeral: true,
          })
          .catch(console.error);
      }
    }
  }
});

process.on("unhandledRejection", (error) => {
  console.error("Unhandled promise rejection:", error);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught exception:", error);
});

client.login(process.env.TOKEN).catch(console.error);
