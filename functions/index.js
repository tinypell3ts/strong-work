const functions = require('firebase-functions');
const ethers = require('ethers');
const strongWorkContract = require('./abis/strongWork.json');
const axios = require('axios');

exports.handler = functions.https.onRequest(async (req, res) => {
    try {
        const { body, headers } = req;

        // @todo correctly handle slack retries
        if (headers['x-slack-retry-num']) {
            return res.status(200).send('OK');
        }
        // Slack challenge
        if (body.challenge) {
            res.json({ body: body.challenge });
        }

        const user = body.event.item_user;
        const other_user = body.event.user;
        const reaction = body.event.reaction;
        let receipt;

        // @todo don't reward if user and other_user match
        if (user && reaction === functions.config().reaction.key) {
            const contractAddress = functions.config().contract_address.key;
            const provider = new ethers.providers.JsonRpcProvider(
                functions.config().rpc_url.key,
            );
            const signer = new ethers.Wallet(
                functions.config().signer.key,
                provider,
            );
            const contract = new ethers.Contract(
                contractAddress,
                strongWorkContract.abi,
                signer,
            );
            const addressExists = await contract.functions.getAddresss(user);
            if (addressExists) {
                const tx = await contract.functions.reward(user, {
                    gasLimit: ethers.utils.hexlify(250000),
                    //@todo get latest FAST gas price
                    gasPrice: ethers.utils.parseUnits('40', 'gwei'),
                });
                receipt = await tx.wait();
            }

            await axios.post(functions.config().slack_webhook.key, {
                text: `Strong work <@${user}>! <@${other_user}> just rewarded you some sweet sweet coin!`,
                blocks: [
                    {
                        type: 'section',
                        text: {
                            type: 'mrkdwn',
                            text: `Strong work <@${user}>! <@${other_user}> just rewarded you some coins!💰 `,
                        },
                        accessory: {
                            type: 'button',
                            text: {
                                type: 'plain_text',
                                text: 'See Transaction',
                                emoji: true,
                            },
                            value: 'See Transaction',
                            //@todo move to environment variable
                            url: `https://mumbai.polygonscan.com/tx/${receipt.transactionHash}`,
                            action_id: 'button-action',
                        },
                    },
                ],
            });
        } else {
            return res.status(200).send('invalid user or reaction');
        }

        return res.status(200).send('OK');
    } catch (e) {
        return res.status(500).json({ e });
    }
});
