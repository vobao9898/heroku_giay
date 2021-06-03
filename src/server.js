require('dotenv').config();
import express from 'express';
import configViewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
import bodyParser from 'body-parser';
import userRouter from './api/nhan_vien/user.router';
import LoaiGiayRouter from './api/loai_san_pham/loaigiay.router';
import UploadRouter from './api/uploadImage/upload.router';
import giayRouter from './api/san_pham/sanpham.router';
import mauSacRouter from './api/mau_sac/sanpham.router';
import ctmauSacRouter from './api/chi_tiet_mau_sac/sanpham.router';
import ctsizeRouter from './api/size/sanpham.router';
import ctsizeMauSacRouter from './api/chi_tiet_size/sanpham.router';
import khuyenMai from './api/khuyen_mai/loaigiay.router';
import ctKhuyenMai from './api/chi_tiet_khuyen_mai/sanpham.router';
import ctDonhang from './api/chi_tiet_don_hang/loaigiay.router';
import khachhang from './api/khach_hang/loaigiay.router';
import dathang from './api/dat_hang/loaigiay.router';

var cors = require('cors');

let app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
global.__basedir = __dirname;
const corsOptions = {
    origin: 'http://localhost:3000',
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
app.use('/api/users', userRouter);
app.use('/api/giay', giayRouter);
app.use('/api/mau_sac', mauSacRouter);
app.use('/api/chi_tiet_mau_sac', ctmauSacRouter);
app.use('/api/size', ctsizeRouter);
app.use('/api/chi_tiet_size', ctsizeMauSacRouter);
app.use('/api/loai_giay', LoaiGiayRouter);
app.use('/api/khuyen_mai', khuyenMai);
app.use('/api/chi_tiet_khuyen_mai', ctKhuyenMai);
app.use('/api/chi_tiet_don_hang', ctDonhang);
app.use('/api/khach_hang', khachhang);
app.use('/api/dat_hang', dathang);

UploadRouter(app);
let port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log('Ket noi 8080');
});