const express = require('express');
const rootRouter = express.Router();

const ticketRouter = require('./ticketRouter');
const userRouter = require('./userRouter')
const movieRouter = require('./movieRouter');
const cinemaRouter = require('./cinemaRouter');


rootRouter.use("/tickets",ticketRouter);
rootRouter.use("/users",userRouter);
rootRouter.use("/movies",movieRouter);
rootRouter.use("/cineplex",cinemaRouter);



module.exports = rootRouter