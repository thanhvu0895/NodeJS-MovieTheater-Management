const express = require('express');
const ticketRouter = express.Router();
const ticketController = require('../controllers/ticketController')
const authController = require('../controllers/authController')


ticketRouter.post("/DatVe", authController.checkToken ,ticketController.bookTicket);
ticketRouter.get("/LayDanhSachPhongVe", ticketController.getTickets);
ticketRouter.post("/TaoLichChieu", authController.checkToken ,ticketController.createShowTime);


module.exports = ticketRouter;
