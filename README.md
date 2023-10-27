# Sender 🚀

A web3 app to send ERC20 Tokens with ease over Ethereum Mainnet or Goerli.

## Features

- Automatically detects tokens holded by an account, no need to add first , then send.
- Suggests up-to-date gas prices.
- Tracks pending transactions with ease.
- Detects Replaced , Repriced or Cancelled transactions.

 <img src="https://i.imgur.com/02NjHZZ.png" width="50%"/>

## Challenges

### Getting Suggested Gas Prices

For mainnet it was easy to get suggested gas prices by utilising Etherscan's [Gas Tracker](https://docs.etherscan.io/api-endpoints/gas-tracker) API. But it's not supported for Goerli.

So, I had to make a makeshift gas tracker by analysing previous Block's Txns
To make it organised, I made a serverless function that returns the suggested Gas prices for Mainnet and Goerli.

API :- https://sender-pi.vercel.app/api/gas-tracker?id=1
