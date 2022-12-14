const { successCode, errorCode, failCode } = require('../ulti/response');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

//LayThongTinHeThongRap
const getCineplex = async (req, res) => {
    const items = await prisma.cineplex.findMany();
    successCode(res, items)
}

//LayThongTinCumRapTheoHeThong
const getCinemaByCineplex = async (req, res) => {
    const {cineplexId} = req.query;
    let items = await prisma.cineplex.findMany();

    if (cineplexId) {    
        items =  await prisma.cineplex.findMany({
            where: {
                name: cineplexId
            },
            include: {
                cinema: {
                    select: {
                        name: true,
                        id: true
                    }
                },
            },
        });
    } 
    successCode(res, items)
}

//LayThongTinLichChieuHeThongRap
const getShowByCineplex = async (req, res) => {
    const {cineplexId} = req.query;
    let items = await prisma.showtime.findMany();

    if (cineplexId) {    
        items =  await prisma.cineplex.findMany({
            where: {
                name: cineplexId
            },
            select: {
                name: true,
                logo: true,
                cinema: {
                    select: {
                        name: true,
                        address: true,
                        showtime: {
                            select: {
                                startTime: true,
                                id: true
                            }
                        }
                    }
                }
            },
        });
    } 

    successCode(res, items)
}



///LayThongTinLichChieuPhimTheoPhim
const getShowTime = async (req, res) => {
    const {filmId} = req.query;
    let items = await prisma.showtime.findMany();

    if (filmId) {
        items = await prisma.movie.findMany({
            where: {
                id: Number(filmId)
            },
            select: {
                name: true,
                cinema_movie: {
                    select: {
                        cinema: {
                            select: {
                                name: true,
                                address: true,
                                showtime: {
                                    select: {
                                        startTime: true,
                                        id: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })
    }
    
    successCode(res, items)
}


module.exports = {
    getCineplex,
    getCinemaByCineplex,
    getShowByCineplex,
    getShowTime
}