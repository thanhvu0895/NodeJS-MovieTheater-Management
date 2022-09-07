const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController')

userRouter.get("/LayDanhSachNguoiDung", userController.getUsers)
userRouter.get("/LayDanhSachNguoiDungPhanTrang", userController.getUsersPages)
userRouter.post("/DangKy", userController.signUp)
userRouter.post("/DangNhap", userController.login)
userRouter.post("/ThemNguoiDung", authController.checkToken, userController.addUser)
userRouter.put("/CapNhatThongTinNguoiDung/:id", authController.checkToken, userController.updateUser)
userRouter.delete("/XoaNguoiDung/:id", authController.checkToken, userController.deleteUser)


module.exports = userRouter;
