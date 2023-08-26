const { Client, IntentsBitField } = require('discord.js');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

const plantedTrees = {}; // { channelID: { treePlanted: true, lastWateredBy: null, height: 0 } }

client.on('ready', () => {
  console.log(`✅ ${client.user.tag} is online.`);
});

client.on('messageCreate', (message) => {
    if (message.content === '!test') {
      const imagePath = './images/bug12.png'; // Make sure this is the correct path
      message.reply("Insect has appeared");
        // .catch(console.error);
        setTimeout(() => {
            message.channel.send({ files: [imagePath] });
          }, 100);
    }
  });

client.on('messageCreate', (message) => {
    if (message.content === '!plant') {
      if (!plantedTrees[message.channel.id]) {
        plantedTrees[message.channel.id] = { treePlanted: true, lastWateredBy: null, height: 0 };
        message.reply('A new tree has been planted!');
      } else {
        message.reply('A tree is already planted in this channel.');
      }
    } else if (message.content === '!water') {
      if (plantedTrees[message.channel.id] && plantedTrees[message.channel.id].treePlanted) {
        if (plantedTrees[message.channel.id].lastWateredBy !== message.author.id) {
          plantedTrees[message.channel.id].lastWateredBy = message.author.id;
          plantedTrees[message.channel.id].height++; // Increment the height
          const chanceOfInsect = 0.5; // Adjust this value as needed
        if (Math.random() < chanceOfInsect) {
            // message.reply(`The tree has been watered! An insect has appeared! Current height: ${plantedTrees[message.channel.id].height}`);
            const numberOfInsectImages = 12;
            const randomImageNumber = Math.floor(Math.random() * numberOfInsectImages) + 1;
            const randomImageFileName = `bug${randomImageNumber}.png`;
      
            // Construct the full path to the image
            const imagePath = `./images/${randomImageFileName}`;
            console.log('Image Path:', imagePath); // Add this line for debugging
      
            message.reply(`The tree has been watered! An insect has appeared! Current height: ${plantedTrees[message.channel.id].height}`);
            setTimeout(() => {
                message.channel.send({ files: [imagePath] });
              }, 100);
          // You can also add logic to award NFTs or points for catching the insect
        } else {
          message.reply(`The tree has been watered! Current height: ${plantedTrees[message.channel.id].height}`);
        }
      } else {
        message.reply("You can't water the tree twice in a row.");
      }
    } else {
      message.reply('There is no tree to water in this channel.');
    }
    }
  });

// client.login("YOUR_BOT_TOKEN");

client.login("MTE0NDg0ODcyODA4ODM4MzU2OQ.G4IRWV.qaN5gEcycnH0unZY89YkYFF55TrrKKore_4YEI");