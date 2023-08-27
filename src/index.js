const { Client, IntentsBitField } = require('discord.js');
const fcl = require("@onflow/fcl");
const { createFlow, sendTransaction } = require('@onflow/fcl'); // Import Flow SDK modules
const botAddress = 'd44e9cb1d3147062a5727d472f7433c39a84991da63fb034258a84d7e56a2fb4b55aaf7036f6697181ee4376c8802ffe0ebf041390e4bf83f44d0d27d7ecdbbb'; // Replace with your bot's Flow address
const botPrivateKey = '61daaece865b9296240899ee6c6d2e202883bf147fa68943b819cfb931e7cee8'; // Replace with your bot's Flow private key
// Function to check height and show special NFTs
function checkHeightAndShowSpecialNFT(message, milestone) {
  if (plantedTrees[message.channel.id].height === milestone) {
    const specialImagePath = `./images/${milestone}.png`;
    console.log(`Congratulations! The tree has reached a height of ${milestone}`);
    message.channel.send(`🌳🎉 Congratulations! 🎉🌳\nThe tree has reached a height of ${milestone}!\nYour hard work and dedication have been rewarded with a special NFT.\nKeep up the great work!`)
    setTimeout(() => {
      message.channel.send({ files: [specialImagePath] });
    }, 100); // Adjust the timeout duration as needed
  }
}
const bugCatchTimeout = 2 * 60 * 1000; // 2 minutes in milliseconds
const caughtBugs = {}; // { userID: [bugImageNames] }
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

const plantedTrees = {}; // { channelID: { treePlanted: true, lastWateredBy: null, height: 0 } }

const config = {
  accessNode: "https://testnet.flowscan.org/", // Use testnet for development
  account: {
    address: "0x9ebb2356ac2182f4",
    privateKey: "61daaece865b9296240899ee6c6d2e202883bf147fa68943b819cfb931e7cee8",
  },
};
fcl.config().put("accessNode.api", config.accessNode);
fcl.config().put("discovery.wallet", "https://flow-wallet-testnet.blocto.app/authn");
// Function to mint NFT on Flow
async function mintNFT() {
  const authorization = await fcl.config().get('authorization');
  console.log('Authorization:', authorization); // Add this line for debugging

  const account = await fcl.send([fcl.getAccount(authorization)]);
  console.log('Account:', account); // Add this line for debugging
console.log(account);
const response = await fcl.send([
  fcl.transaction`
    import BugNFT from 0x9ebb2356ac2182f4

    transaction {
      prepare(acct: AuthAccount) {
        acct.save(<-BugNFT.mintNFT(), to: /storage/NFTPath)
      }
    }
  `,
  fcl.args([]),
  fcl.proposer(authorization),
  fcl.authorizations([authorization]),
  fcl.payer(authorization),
  fcl.limit(100),
  fcl.prepAccount(account),
]);

return response;
}

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


  //function for minting special nfts
  async function mintSpecialNFT(userID, milestone) {
    const authorization = await fcl.config().get('authorization');
    const account = await fcl.send([fcl.getAccount(authorization)]);
  
    const response = await fcl.send([
      fcl.transaction`
        import SpecialNFT from 0x...  // Replace with the contract address
  
        transaction {
          prepare(acct: AuthAccount) {
            acct.save(<-SpecialNFT.mintSpecialNFT(${milestone}), to: /storage/NFTPath)
          }
        }
      `,
      fcl.args([]),
      fcl.proposer(authorization),
      fcl.authorizations([authorization]),
      fcl.payer(authorization),
      fcl.limit(100),
      fcl.prepAccount(account),
    ]);
  
    return response;
  }




  //CATCH FUNCTION: 
  client.on('messageCreate', (message) => {
    if (message.content === '!catch') {
      const userID = message.author.id;
      const userData = caughtBugs[userID];
  
      if (userData && userData.lastBugTime) {
        const currentTime = Date.now();
        if (currentTime - userData.lastBugTime <= bugCatchTimeout) {
          const bugName = userData.bugNames.shift();
  
          if (bugName) {
            userData.bugsCaught++;
            const specialImagePath = `./images/${userData.bugsCaught}x.png`;
            if (userData.bugsCaught === 3) {
              message.reply("Congratulations! You've caught 3 bugs! 🎉");
              setTimeout(() => {
                message.channel.send({ files: [specialImagePath] });
              }, 100);
              mintSpecialNFT(userID, 3)

            }
            if (userData.bugsCaught === 6) {
              message.reply("Congratulations! You've caught 6 bugs! 🎉");
              setTimeout(() => {
                message.channel.send({ files: [specialImagePath] });
              }, 100);
              mintSpecialNFT(userID, 6)

            }
            if (userData.bugsCaught === 9) {
              message.reply("Congratulations! You've caught 9 bugs! 🎉");
              setTimeout(() => {
                message.channel.send({ files: [specialImagePath] });
              }, 100);
              mintSpecialNFT(userID, 9)

            }
            if (userData.bugsCaught === 12) {
              message.reply("Congratulations! You've caught 12 bugs! 🎉");
              setTimeout(() => {
                message.channel.send({ files: [specialImagePath] });
              }, 100);
              mintSpecialNFT(userID, 12)

            } else {
              message.reply(`Congratulations! You caught a Bug! It has been added to your collection.`);
            }
          } else {
            message.reply(`You have caught all available bugs. Wait for new bugs to appear.`);
          }
        } else {
          message.reply(`The bug has run away. Try again when a new bug appears.`);
        }
      } else {
        message.reply(`There are no bugs for you to catch right now.`);
      }
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
          // plantedTrees[message.channel.id].height = 100; //checking if the special nfts are displayed or not
          checkHeightAndShowSpecialNFT(message, 100);
          checkHeightAndShowSpecialNFT(message, 500);
          checkHeightAndShowSpecialNFT(message, 1000);
          const chanceOfInsect = 0.5; // Adjust this value as needed
        if (Math.random() < chanceOfInsect) {
            // message.reply(`The tree has been watered! An insect has appeared! Current height: ${plantedTrees[message.channel.id].height}`);
            const numberOfInsectImages = 12;
            const randomImageNumber = Math.floor(Math.random() * numberOfInsectImages) + 1;
            const randomImageFileName = `bug${randomImageNumber}.png`;
      
            // Construct the full path to the image
            const imagePath = `./images/${randomImageFileName}`;
            console.log('Image Path:', imagePath); // Add this line for debugging
      
            // message.reply(`The tree has been watered! An insect has appeared! Current height: ${plantedTrees[message.channel.id].height}`);
            // setTimeout(() => {
            //     message.channel.send({ files: [imagePath] });
            //   }, 100);

            //---------------------------------------------------------- adding timeout and catch functionality:----------------------------------------------------
            const userID = message.author.id;

            if (!caughtBugs[userID]) {
              caughtBugs[userID] = {
              bugNames: [],
              lastBugTime: null,
              bugsCaught: 0,
              };
            }
            caughtBugs[userID].bugNames.push(randomImageFileName);
            caughtBugs[userID].lastBugTime = Date.now();
            mintNFT()
            .then(() => {
              message.reply(`The tree has been watered! An insect has appeared and a new NFT has been minted! Current height: ${plantedTrees[message.channel.id].height}`);
              setTimeout(() => {
                message.channel.send({ files: [imagePath] });
              }, 100);
            })
            .catch((error) => {
              console.error('Error minting NFT:', error);
              message.reply(`The tree has been watered! An insect has appeared! Current height: ${plantedTrees[message.channel.id].height}`);
              setTimeout(() => {
                message.channel.send({ files: [imagePath] });
              }, 100);
            });
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

client.login("MTE0NDg0ODcyODA4ODM4MzU2OQ.GwltjK.I70zt1mNTEMjftrAW9ItIT42MHSIzRCmYcw0fg");