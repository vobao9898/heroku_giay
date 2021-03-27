require('dotenv').config();
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
    // Checks if the message contains text
    if (received_message.text) {
        response = {
            text: `You sent the message: "${received_message.text}". Now send me an attachment!`,
        };
    } else if (received_message.attachments) {
        // Get the URL of the message attachment
        let attachment_url = received_message.attachments[0].payload.url;
        response = {
            attachment: {
                type: 'template',
                payload: {
                    template_type: 'generic',
                    elements: [{
                        title: 'Is this the right picture?',
                        subtitle: 'Tap a button to answer.',
                        image_url: attachment_url,
                        buttons: [{
                                type: 'postback',
                                title: 'Yes!',
                                payload: 'yes',
                            },
                            {
                                type: 'postback',
                                title: 'No!',
                                payload: 'no',
                            },
                        ],
                    }, ],
                },
            },
        };
    }

    // Send the response message
    callSendAPI(sender_psid, response);
}

function handlePostback(sender_psid, received_postback) {
    let response;

    // Get the payload for the postback
    let payload = received_postback.payload;

    // Set the response based on the postback payload
    if (payload === 'yes') {
        response = { text: 'Thanks!' };
    } else if (payload === 'no') {
        response = { text: 'Oops, try sending another image.' };
    }
    // Send the message to acknowledge the postback
    callSendAPI(sender_psid, response);
}

function callSendAPI(sender_psid, response) {
    // Construct the message body
    let request_body = {
        recipient: {
            id: sender_psid,
        },
        message: {
            attachment: {
                type: 'template',
                payload: {
                    template_type: 'generic',
                    elements: [{
                        title: 'Is this the right picture?',
                        subtitle: 'Tap a button to answer.',
                        image_url: 'https://www.google.com/search?q=hinh+anh+png&sxsrf=ALeKk015qyL8P6_chpCw4tfnznp8AbVZOw:1616832265950&tbm=isch&source=iu&ictx=1&fir=2ueLoIjGFmTO5M%252CepQmq_iyw6tmJM%252C_&vet=1&usg=AI4_-kTTWcxMYqWjgHIqCsgaVqzGuBP4yQ&sa=X&ved=2ahUKEwjd9f3GgdDvAhWeyIsBHcJsCzYQ9QF6BAgNEAE#imgrc=2ueLoIjGFmTO5M',
                        buttons: [{
                                type: 'postback',
                                title: 'Yes!',
                                payload: 'yes',
                            },
                            {
                                type: 'postback',
                                title: 'No!',
                                payload: 'no',
                            },
                        ],
                    }, ],
                },
            },
        },
    };

    // Send the HTTP request to the Messenger Platform
    request({
            uri: 'https://graph.facebook.com/v10.0/me/messages',
            qs: {
                access_token: 'EAANNAcgakRcBALhK8oTDPnXKUIaed4dk99C2E8fZBCZCJ4e2zFWavhIXjiZBLZA5toAuUALJDsFgJaS6EjlQeLVJofNylmMIpoLjabOpQYsaDwTci0bh6mPQLgaZBZCin7T3FuEApOBwTplDqrYZCE5HF8cQq8Xt3yv87o7uIRHgAZDZD',
            },
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