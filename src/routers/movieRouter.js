const express = require('express');
const movieController = require('../controllers/movieController');
const movieRouter = express.Router();
const multer = require('multer');
const authController = require('../controllers/authController')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, process.cwd() + "/public/img");
    },
    filename: (req, file, cb) => {
        const fileNewName = Date.now() + "_" + file.originalname;
        cb(null, fileNewName);
    }
})

const upload = multer({ storage });

movieRouter.get("/LayDanhSachPhim", movieController.getFilms);
movieRouter.get("/LayDanhSachBanner", movieController.getBanners);
movieRouter.get("/LayDanhSachPhimPhanTrang", movieController.getFilmPages);
movieRouter.get("/LayThongTinPhim", movieController.getFilmById);
movieRouter.get("/LayDanhSachPhimTheoNgay", movieController.getFilmByDate);


movieRouter.post("/ThemPhim", movieController.addFilm)
movieRouter.post("/", upload.single("image"), movieController.addFilmImage)


movieRouter.put("/ThemPhimUploadHinh/:id", upload.single("image"), movieController.uploadPoster)

movieRouter.delete("/XoaPhim/:id", authController.checkToken, movieController.deleteFilm)


module.exports = movieRouter;