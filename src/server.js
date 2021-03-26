require('dotenv').config();
import express from 'express';
import configViewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';

import bodyParser from 'body-parser';

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//config view engine
app.use(express.static("./src/public"));
app.set("view engine", "ejs");
app.set("views", "./src/views");

//init all web routes
initWebRoutes(app);

let port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log('Ket noi 8080');
})