import express from 'express';
import homepageController from '../controllers/homepageController';
import chatbotController from '../controllers/chatbotController';

import sql from './../sql/sql';

let router = express.Router();

let initWebRouter = (app) => {
    //   router.get('/', homepageController.getHomepage);
    router.get('/webhook', chatbotController.getWebhook);
    router.post('/webhook', chatbotController.postWebhook);
    router.get('/api/nhan-vien', sql.danhsachLogin);

    router.get('/logout', (req, res) => {
        req.session.destroy();
        req.logout();
        res.status(200).json({ err: null, authUser: {} });
    });
    return app.use('/', router);
};

module.exports = initWebRouter;