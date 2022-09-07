const { successCode, errorCode, failCode } = require('../ulti/response');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


const bookTicket = (req, res) => {
    const {userid, movieid} = req.body;
    const data = prisma.ticket.create({
        data:{
            userid:Number(userid),
            movieid:Number(movieid)
    }})
    
    successCode(res, data)
}   

const getTickets = (req, res) => {
    const data = prisma.showtime.findMany()
    successCode(res, data)
}


const createShowTime = (req,res) => {
    const {startTime, cinemaId} = req.body;
    let createNew = prisma.ticket.create({data: {
        startTime: new Date(startTime),
        cinemaId: Number(cinemaId)
    }})
    successCode(res, createNew)
}

// LayDanhSachPhongVe
module.exports = {
    bookTicket,
    getTickets,
    createShowTime
}