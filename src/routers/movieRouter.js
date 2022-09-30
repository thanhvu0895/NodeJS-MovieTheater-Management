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

/**
 * @swagger
 * /api/movies/getFilms:
 *  get:
 *    tags:
 *      - Movies Management
 *    content:
 *      application/json:
 *    responses:
 *      '200':
 *        description: Success
 */
movieRouter.get("/getFilms", movieController.getFilms);

/**
 * @swagger
 * /api/movies/getFilmPages:
 *  get:
 *    tags:
 *      - Movies Management
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
movieRouter.get("/getFilmPages", movieController.getFilmPages);


/**
 * @swagger
 * /api/movies/getFilmByDate:
 *  get:
 *    tags:
 *      - Movies Management
 *    parameters:
 *      - name: pageNum
 *        in: query
 *        description: Page Number to show  (eg. 1)
 *        schema:
 *          type: integer
 *          format: int64
 *      - name: pageItemsNum
 *        in: query
 *        description: Number of items per page  (eg. 3)
 *        schema:
 *          type: integer
 *          format: int64
 *      - name: fromDate
 *        in: query
 *        description:  Start date to filter from (eg. 1000-01-01)
 *        schema:
 *          type: date-time
 *          format: int64
 *      - name: toDate
 *        in: query
 *        description:  End date to filter from (eg. 2022-29-09)
 *        schema:
 *          type: date-time
 *          format: int64
 *    content:
 *      application/json:
 *    responses:
 *      '200':
 *        description: Success
 */
movieRouter.get("/getFilmByDate", movieController.getFilmByDate);




/**
 * @swagger
 * /api/movies/getFilmById/{id}:
 *  get:
 *    tags:
 *      - Movies Management
 *    parameters:
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
 *      '200':
 *        description: Success
 */
movieRouter.get("/getFilmById/:id", movieController.getFilmById);



/**
 * @swagger
 * /api/movies/getBanners:
 *  get:
 *    tags:
 *      - Movies Management
 *    content:
 *      application/json:
 *    responses:
 *      '200':
 *        description: Success
 */
movieRouter.get("/getBanners", movieController.getBanners);


/**
 * @swagger
 * /api/movies/addFilm:
 *  post:
 *    tags:
 *      - Movies Management
 *    description: Add New Film
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Order'
 *    content:
 *      application/json:
 *    responses:
 *      '200':
 *        description: Success
 */
movieRouter.post("/addFilm", movieController.addFilm)


movieRouter.post("/addFilmWithPoster", upload.single("image"), movieController.addFilmPoster)
movieRouter.put("/uploadPoster/:id", upload.single("image"), movieController.uploadPoster)


/**
 * @swagger
 * /api/movies/deleteFilm/{id}:
 *  delete:
 *    tags:
 *      - Movies Management
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
 *        description: Invalid Film Id
 */
movieRouter.delete("/deleteFilm/:id", authController.checkToken, movieController.deleteFilm)

module.exports = movieRouter;