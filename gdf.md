<div align="center">
  <img src="https://user-images.githubusercontent.com/7047410/137898069-5a4fa361-68ae-49f6-886e-e80bb13c608d.png" width="300" height="300" />
  <p>One of your team mates has just posted in slack that they’ve fixed that gnarly bug. What do you do? Give them the muscle emoji of course. What if you could reward them with your own company token to show your appreciation.</p>
  <p>Strong work is a PoC that enables colleagues to reward each other ERC20 tokens by adding specific reactions to their team mates slack messages.
</div>

https://user-images.githubusercontent.com/7047410/137898175-58fe89b1-e181-4a50-bcdb-0a72380966ce.mp4


# How it works
Strong works a made up of a slack app, smart contract, a cloud function and a front-end.

## Slack App
Slack was used for this PoC but another service with a webhooks API (such as discord or telegram) could be used instead. The slack app does a few important things. 

- It handles the oAuth in the frontend 
- listens out for the `reaction:read` event in a specific channel
- Posts a message in the channel with a link to the blockchain transaction receipt.

## [Smart contract](https://github.com/coeu5a/strong-work/blob/master/contracts/StrongWork.sol)
The smart contract comprises of two (non-admin) functions. Update and reward. The update function adds a mapping of the users slack ID to their ethereum address and the reward function, you guessed it....rewards the user. 

## [Cloud function](https://github.com/coeu5a/strong-work/tree/master/functions)
Slack's event API calls an endpoint when certain events happen. In this instance, the cloud function is called when the `reaction:added` event is fired. The cloud function then does a couple of checks and calls the reward function in the smart contract sending along with it the Slack ID of the receiver of the reaction. 



## Frontend
The frontend is a simple NextJS app. A mapping of the users ethereum address and slack ID needs to be added to the smart contract in order for them to receive rewards. The main functions of the frontend app are -

- Authenticating via Slack OAuth
- Authenticating via Metamask
- Calling the update function in the smart contract. 



