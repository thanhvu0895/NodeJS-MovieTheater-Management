const express = require('express');
const ticketRouter = express.Router();
const ticketController = require('../controllers/ticketController')
const authController = require('../controllers/authController')

/**
 * @swagger
 * /api/tickets/getTickets:
 *  get:
 *    tags:
 *      - Tickets Management
 *    content:
 *      application/json:
 *    responses:
 *      '200':
 *        description: Success
 */
ticketRouter.get("/getTickets", ticketController.getTickets);

ticketRouter.post("/bookTicket", authController.checkToken ,ticketController.bookTicket);
ticketRouter.post("/createShowTime", authController.checkToken ,ticketController.createShowTime);


module.exports = ticketRouter;
