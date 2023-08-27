<div align="center">
  <h1>🌳 GrowTogether 🌳</h1>
  <p>Feel the joy of nurturing your virtual tree, catching bugs, and collecting NFT rewards 🪲🪴🎁</p>
</div>



## Features


- Plant a tree in a channel using the `!plant` command.
- Water the tree using the `!water` command to make insects appear.
- Catch insects using the `!catch` command within a time limit.
- Earn special NFT rewards for catching a certain number of bugs.


## Prerequisites


- Node.js
- Flow CLI
- Discord bot token
- Flow account and contract addresses
- Images of bugs and special NFTs

## Getting Started


1. Clone this repository:
   ```bash
   https://github.com/bhavaygrg/TreePlanter.git
   cd TreePlanter
2. Install Dependencies:
   ```npm install```
3. Install Flow CLI:
   - For Mac Users:
     ```bash
      brew install flow-cli
      //Alternatively for Mac & Linux users, if you want to download from a pre-built binary, use the command below.
      //Note: this will only work on x86-64.
   - For Windows Users:
     ```bash
     //This update method only works on Windows 10, 8.1, or 7 (SP1, with PowerShell 3.0), on x86-64.
       iex "& { $(irm 'https://raw.githubusercontent.com/onflow/flow-cli/master/install.ps1') }"
4. Generate a public key:
   ```bash
   //Once you have Flow-CLI downloaded, you can generate a public key using the following command: 
   flow keys generate
   //Save your private and public keys in a secure space before moving on to the next step.
5. Signup for a testnet account using your public key:
   - Head over to the Flow Testnet signup page and paste your public key into the form.
     Verify that you’re human and proceed with creating an account.
   - Remember to copy your address and save it in a secure space.

   - Confirm your funds by viewing your account using the View Account link pictured to the right. You should now have 1,000 Flow Token that courtesy of the Flow Testnet Faucet. Please bear in mind that these tokens are not actual currency, but can be used to build out proof of concepts on the Flow Testnet.
6. Place your images/nfts in the images folder
7. Start the bot using
   ```node index.js```
8. 🌳Grow Your tree🌳 


   
*Note: Please note that you should replace `your_discord_bot_token`, `your_flow_access_node_url`, `your_flow_account_address`, and `your_flow_account_private_key` with the actual values.*


## Inspiration
A walk in nature while thinking of a project!

## What it does
Nurture a virtual tree together in Discord. Grow, catch bugs, earn NFT rewards. Unite your community with blockchain-powered fun!

## How we built it
We came up with the metaphor of how nurturing the tree is analogous to nurturing a community and then slowly but surely built upon it. We primarily used GitHub and Flow for building the app. For Graphics and NFTs we used Adobe. Communication was done through discord.

## Challenges we ran into
- Bhavay struggled with Flow and the smart contracts
- Shobhit struggled with discord
- Shreya struggled with NFTs

## Accomplishments that we're proud of
- Shobhit is proud of how good the project turned out with 2 days of collaborative work
- Bhavay is proud of learning how to deploy smart contracts in flow
- Shreya is proud of how well the NFT's and the graphics came out
- Bhavay and Shobhit are proud of completing their first hackathon!!!!

## What we learned
- Collaboration is the key
- Be open to ideas. Ideate, Build, Iterate.
- Working with beginners is fun

## What's next for GrowTogether
- Better way to integrate wallets and authentication through Flow
- Hosting GrowTogether independently

  -----------------------------------------------------------------------------------------

# This project was made for the MLH WEB3Apps Hackathon. Check it out [here](https://web3apps-18938.devpost.com/)!

