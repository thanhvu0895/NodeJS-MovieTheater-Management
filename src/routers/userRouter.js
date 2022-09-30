const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController')

/**
 * @swagger
 * /api/users/getUsers:
 *  get:
 *    tags:
 *      - Users Management
 *    content:
 *      application/json:
 *    responses:
 *      '200':
 *        description: Success
 */
userRouter.get("/getUsers", userController.getUsers)

/**
 * @swagger
 * /api/users/getUsersPages:
 *  get:
 *    tags:
 *      - Users Management
 *    parameters:
 *      - name: pageNum
 *        in: query
 *        description: Total page numbers
 *        schema:
 *          type: integer
 *          format: int64
 *      - name: pageItemsNum
 *        in: query
 *        description: Number of Items per page
 *        schema:
 *          type: integer
 *          format: int64
 *    content:
 *      application/json:
 *    responses:
 *      '200':
 *        description: Success
 */
userRouter.get("/getUsersPages", userController.getUsersPages)


userRouter.post("/signup", userController.signUp)
userRouter.post("/signin", userController.login)

/**
 * @swagger
 * /api/users/addUser:
 *  post:
 *    tags:
 *      - Users Management
 *    description: Add New User
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    content:
 *      application/json:
 *    responses:
 *      '200':
 *        description: Success
 */
userRouter.post("/addUser", authController.checkToken, userController.addUser)
userRouter.put("/updateUser/:id", authController.checkToken, userController.updateUser)



/**
 * @swagger
 * /api/users/deleteUser/{id}:
 *  delete:
 *    tags:
 *      - Users Management
 *    parameters:
 *      - name: authentication
 *        in: header
 *        description: ''
 *        required: false
 *        schema:
 *          type: String
 *      - name: id
 *        in: path
 *        description: Movie id
 *        required: true
 *        schema:
 *          type: integer
 *          format: int64
 *    content:
 *      application/json:
 *    responses:
 *      '400':
 *        description: Invalid User Id
 */
userRouter.delete("/deleteUser/:id", authController.checkToken, userController.deleteUser)

module.exports = userRouter;
