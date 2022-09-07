const express = require('express');
const rootRouter = express.Router();

const ticketRouter = require('./ticketRouter');
const userRouter = require('./userRouter')
const movieRouter = require('./movieRouter');
const cinemaRouter = require('./cinemaRouter');


rootRouter.use("/QuanLyDatVe",ticketRouter);
rootRouter.use("/QuanLyNguoiDung",userRouter);
rootRouter.use("/QuanLyPhim",movieRouter);
rootRouter.use("/QuanLyRap",cinemaRouter);



module.exports = rootRouter