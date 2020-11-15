import express from 'express';
import homepageController from '../controllers/homepageController';
import chatbotController from '../controllers/chatbotController';
let router = express.Router();

let initWebRouter = (app)=>{
    router.get('/', homepageController.getHomepage);
    router.get('/webhook', chatbotController.getWebhook);
    router.post('/webhook', chatbotController.postWebhook);
    return app.use('/', router);
};

module.exports = initWebRouter;