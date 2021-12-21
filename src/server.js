require("dotenv").config();
import express, { json } from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import bodyParser from "body-parser";
import userRouter from "./api/nhan_vien/user.router";
import LoaiGiayRouter from "./api/loai_san_pham/loaigiay.router";
import UploadRouter from "./api/uploadImage/upload.router";
import giayRouter from "./api/san_pham/sanpham.router";
import mauSacRouter from "./api/mau_sac/sanpham.router";
import ctmauSacRouter from "./api/chi_tiet_mau_sac/sanpham.router";
import ctsizeRouter from "./api/size/sanpham.router";
import ctsizeMauSacRouter from "./api/chi_tiet_size/sanpham.router";
import khuyenMai from "./api/khuyen_mai/loaigiay.router";
import ctKhuyenMai from "./api/chi_tiet_khuyen_mai/sanpham.router";
import ctDonhang from "./api/chi_tiet_don_hang/loaigiay.router";
import khachhang from "./api/khach_hang/loaigiay.router";
import dathang from "./api/dat_hang/loaigiay.router";
import { Server } from "socket.io";
import fetch from "fetch";
const http = require("http");
const axios = require("axios");
var cors = require("cors");
let app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5001",
    },
});
var URL = "http://localhost:5001";
const authAxios = axios.create({
    baseURL: URL,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
});

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
global.__basedir = __dirname;
const corsOptions = {
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
//config view engine
configViewEngine(app);

// init all web routes
initWebRoutes(app);

// //init cron job
// initCronJob();
//init all web routes
initWebRoutes(app);

app.use("/api/users", userRouter);
app.use("/api/giay", giayRouter);
app.use("/api/mau_sac", mauSacRouter);
app.use("/api/chi_tiet_mau_sac", ctmauSacRouter);
app.use("/api/size", ctsizeRouter);
app.use("/api/chi_tiet_size", ctsizeMauSacRouter);
app.use("/api/loai_giay", LoaiGiayRouter);
app.use("/api/khuyen_mai", khuyenMai);
app.use("/api/chi_tiet_khuyen_mai", ctKhuyenMai);
app.use("/api/chi_tiet_don_hang", ctDonhang);
app.use("/api/khach_hang", khachhang);
app.use("/api/dat_hang", dathang);

app.post("/api/notify", async(req, res) => {
    const data = req.body;
    console.log(data);
    // io.on("connection", (socket) => {
    //     socket.emit("newUser", data);
    // });

    const config = {
        method: "post",
        url: "http://localhost:5001/",
        headers: {
            "Content-Type": "application/json",
        },
        data: JSON.stringify({ data: data }),
    };

    await axios(config)
        .then(function(response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function(err) {
            console.log(err);
        });
});

UploadRouter(app);
let port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log("Ket noi 8080");
});