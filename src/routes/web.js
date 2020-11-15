import express from 'express';
import homepageController from '../controllers/homepageController';
let router = express.Router();

let initWebRouter = (app)=>{
    router.get('/', homepageController.getHomepage);

    return app.use('/', router);
};

module.exports = initWebRouter;