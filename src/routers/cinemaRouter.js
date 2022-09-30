const express = require('express');
const cinemaRouter = express.Router();
const cinemaController = require('../controllers/cinemaController');

/**
 * @swagger
 * /api/cineplex/getCineplex:
 *  get:
 *    tags:
 *      - Theaters Management
 *    content:
 *      application/json:
 *    responses:
 *      '200':
 *        description: A successful response
 */
cinemaRouter.get("/getCineplex", cinemaController.getCineplex);

/**
 * @swagger
 * /api/cineplex/getCinemaByCineplex:
 *  get:
 *    description: A list of Movie Theaters By Cineplex
 *    tags:
 *      - Theaters Management
 *    parameters:
 *      - in: query
 *        name: cineplexId                           
 *        schema:
 *          type: string
 *          description: The ID of the cineplex such as "BHD" or "CGV"
 *    content:
 *      application/json:
 *    responses:
 *      '200':
 *        description: A successful response
 */
cinemaRouter.get("/getCinemaByCineplex", cinemaController.getCinemaByCineplex);

/**
 * @swagger
 * /api/cineplex/getShowByCineplex:
 *  get:
 *    description: A list of Movie Screenings By Cineplex
 *    tags:
 *      - Theaters Management
 *    parameters:
 *      - in: query
 *        name: cineplexId
 *        schema:
 *          type: string
 *        description: The ID of the cineplex such as "BHD" or "CGV"
 *    content:
 *      application/json:
 *    responses:
 *      '200':
 *        description: A successful response
 */
cinemaRouter.get("/getShowByCineplex", cinemaController.getShowByCineplex);


/**
 * @swagger
 * /api/cineplex/getShowTime:
 *  get:
 *    description: A list of Screenings By Movie
 *    tags:
 *      - Theaters Management
 *    parameters:
 *      - in: query
 *        name: movieId
 *        schema:
 *          type: int
 *        description: The ID of the cineplex such as "BHD" or "CGV"
 *    content:
 *      application/json:
 *    responses:
 *      '200':
 *        description: A successful response
 */
cinemaRouter.get("/getShowTime", cinemaController.getShowTime);

module.exports = cinemaRouter;
