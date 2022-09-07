const express = require('express');
const cinemaRouter = express.Router();
const cinemaController = require('../controllers/cinemaController');


cinemaRouter.get("/LayThongTinHeThongRap", cinemaController.getCineplex);
cinemaRouter.get("/LayThongTinCumRapTheoHeThong", cinemaController.getCinemaByCineplex);
cinemaRouter.get("/LayThongTinLichChieuHeThongRap", cinemaController.getShowByCineplex);
cinemaRouter.get("/LayThongTinLichChieuPhim", cinemaController.getShowTime);

module.exports = cinemaRouter;
