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

/**
 * @swagger
 * /api/users/signup:
 *  post:
 *    tags:
 *      - Users Management
 *    parameters:
 *      - name: request body
 *        in: body
 *        schema:
 *          $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: Success
 */
userRouter.post("/signup", userController.signUp)
/**
 * @swagger
 * /api/users/signin:
 *  post:
 *    tags:
 *      - Users Management
 *    parameters:
 *      - name: request body
 *        in: body
 *        schema:
 *          $ref: '#/components/schemas/SignIn'
 *    responses:
 *      200:
 *        description: Success
 */
userRouter.post("/signin", userController.login)

/**
 * @swagger
 * /api/users/addUser:
 *  post:
 *    tags:
 *      - Users Management
 *    parameters:
 *      - name: request body
 *        in: body
 *        schema:
 *          $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: Success
 */
userRouter.post("/addUser", authController.checkToken, userController.addUser)

/**
 * @swagger
 * /api/users/updateUser/{id}:
 *  put:
 *    tags:
 *      - Users Management
 *    parameters:
 *      - name: authentication
 *        in: header
 *        description: ''
 *      - name: id
 *        in: path
 *      - name: request body
 *        in: body
 *        schema:
 *          $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: Success
 */
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
 *        schema:
 *          type: String
 *      - name: id
 *        in: path
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
