require("dotenv").config();
import request from 'request';

const MY_VERIFY_FB_TOKEN = process.env.MY_VERIFY_FB_TOKEN;
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

let postWebhook = (req, res) => {
    // Parse the request body from the POST
    let body = req.body;

    // Check the webhook event is from a Page subscription
    if (body.object === 'page') {
        // Iterate over each entry - there may be multiple if batched
        body.entry.forEach(function(entry) {
            // // Gets the body of the webhook event
            let webhook_event = entry.messaging[0];
            // console.log(webhook_event);

            // // Get the sender PSID
            let sender_psid = webhook_event.sender.id;
            // console.log('Sender PSID: ' + sender_psid);

            try {
                if (webhook_event.message) {
                    let message = webhook_event.message;
                    if (message.quick_reply) {
                        handleQuickReply(sender_psid, message);
                    } else if (message.text) {
                        handleMessage(sender_psid, message);
                    }
                } else if (webhook_event.postback) {
                    handlePostback(sender_psid, webhook_event.postback);
                }
            } catch (error) {
                console.error(error);
            }
        });

        // Return a '200 OK' response to all events
        res.status(200).send('EVENT_RECEIVED');
    } else {
        // Return a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
    }
};

let getWebhook = (req, res) => {
    // Your verify token. Should be a random string.
    let VERIFY_TOKEN = process.env.MY_VERIFY_FB_TOKEN;

    // Parse the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    // Checks if a token and mode is in the query string of the request
    if (mode && token) {
        // Checks the mode and token sent is correct
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            // Responds with the challenge token from the request
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);
        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    }
};

function handleMessage(sender_psid, received_message) {
    let response;

    // Check if the message contains text
    if (received_message.text) {

        // Create the payload for a basic text message
        response = {
            "text": `You sent the message: "${received_message.text}". Now send me an image!`
        }
    }

    // Sends the response message
    callSendAPI(sender_psid, response);
}


function callSendAPI(sender_psid, response) {
    // Construct the message body
    let request_body = {
        recipient: {
            id: sender_psid,
        },
        message: response,
    };

    // Send the HTTP request to the Messenger Platform
    request({
            uri: 'https://graph.facebook.com/v10.0/me/messages',
            qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
            method: 'POST',
            json: request_body,
        },
        (err, res, body) => {
            if (!err) {
                console.log('message sent!');
            } else {
                console.error('Unable to send message:' + err);
            }
        }
    );
}


module.exports = {
    postWebhook: postWebhook,
    getWebhook: getWebhook,
};