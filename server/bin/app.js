import logger from "morgan";
import express from "express";
import cookieParser from "cookie-parser";
import * as discord from "./src/discord";
import * as config from "./config";
const router = express.Router();
const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));
router.get('/', function (_req, res) {
    res.send("test");
});
app.use('/api', router);
app.listen(3000);
console.log("Listing on http://127.0.0.1:3000/");
discord.start(config.token);
