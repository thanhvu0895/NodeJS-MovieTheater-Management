const { successCode, errorCode, failCode } = require('../ulti/response');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


// LayDanhSachBanner
const getBanners = async (req, res) => {
    const items = await prisma.movie.findMany({
        select: {
            id: true,
            name: true,
            poster: true
        }
    })
    successCode(res, items)
}

// LayDanhSachPhim
const getFilms = async (req, res) => {
    const items = await prisma.movie.findMany();
    successCode(res, items)
}

//LayDanhSachPhimPhanTrang
const getFilmPages = async (req, res) => {
    
    const totalCount = await prisma.movie.count()

    let {pageNum, pageItemsNum} = req.query;
    
    const totalPages = Math.ceil(totalCount/pageItemsNum)
    // lấy n phần tử trên trang
    if(pageItemsNum == null && pageNum == null || pageNum < 1) {

        let items = await prisma.movie.findMany();
        successCode(res, items)
    } else if (pageNum == null) {
        let items = await prisma.movie.findMany({
            take: Number(pageItemsNum),
        })

        successCode(res, {
            count: pageItemsNum,
            totalCount, 
            items
        })
    } else if (pageItemsNum == null || pageItemsNum < 1 ) {
        errorCode(res, "Invalid Number Of Items Per Page")
    } 
    else {
            let items = await prisma.movie.findMany({
                skip: (Number(pageNum - 1) * pageItemsNum), 
                take: Number(pageItemsNum),
            })
            
            successCode(res, {
                currentPage: pageNum,
                count: pageItemsNum,
                totalPages,
                totalCount, 
                items
            })       
    }
}        

const getFilmByDate = async (req, res) => {
    const {pageNum, pageItemsNum, fromDate, toDate} = req.query;
    // số ngày hợp lệ
    if (fromDate == null && toDate == null && pageItemsNum == null && pageNum == null) {
        errorCode(res, "Missing date-time values")
    } else if (fromDate == null || toDate == null){
        errorCode(res, "Missing date-time values")
    } else if (pageItemsNum == null && pageNum == null) {
            let items = await prisma.movie.findMany({
            where: {
                startDate: {
                    gte: new Date(fromDate),
                    lt: new Date(toDate)
                }
            }
        })
        successCode(res, items)

    } else if (pageNum == null) {
        let items = await prisma.movie.findMany({
        take: Number(pageItemsNum),
            where: {
                startDate: {
                    gte: new Date(fromDate),
                    lt: new Date(toDate)
                }
            }
        })
        successCode(res, items)
    }  else if (pageItemsNum == null){
                errorCode(res, "Invalid Number Of Items Per Page")
    }  else {
        let items = await prisma.movie.findMany({
            skip: (Number(pageNum - 1) * pageItemsNum), 
            take: Number(pageItemsNum),
            where: {
                startDate: {
                    gte: new Date(fromDate),
                    lt: new Date(toDate)
                }
            }
        })
        successCode(res, items)
    }
} 


//LayThongTinPhim theo ma phim
const getFilmById = async (req, res) => {
    const {id} = req.params;
    let checkMovie = await prisma.movie.findMany({
        where: {
            id: Number(id)
        }
    });

    if (checkMovie.length > 0) {
        successCode(res, checkMovie)
    } else {
        errorCode(res, "Film ID not found")
    }
}


// ThemPhim
const addFilm = async (req, res) => {
    let {name, startDate, time, evaluate, poster} = req.body;
    let data = {name, startDate: new Date(startDate), time, evaluate, poster};

    const createData = await prisma.movie.create({data})
    successCode(res, createData)
}


// deleteFilm
const deleteFilm = async (req, res) => {
    try {
        const {id} = req.params
        let checkFilm = await prisma.movie.findMany({
            where: {
                id: Number(id)
            }
        })
        if (checkFilm.length > 0) {
        await prisma.movie.delete({
            where: {
                id: Number(id)
            }
        })} else {
            errorCode(res, "Data not found");
        }
        successCode(res, "Film deleted successfully");
    } catch {
        failCode(res);
    } 
}


// ThemPhimUploadHinh
const addFilmPoster = async (req, res) => {
    const {filename} = req.file;
    const {name, startDate, time, evaluate} = req.body

    let data = {name, startDate: new Date(startDate), time: Number(time), evaluate:Number(evaluate), poster: `/public/image/${filename}`}
    const createNew = await prisma.movie.create({data});

    successCode(res, createNew);
}

// Update poster phim
const uploadPoster = async (req, res) => {
    try {
        const {id} = req.params;
        const {filename} = req.file;
        const checkFilm  = await prisma.movie.findMany({
            where: {
                id: Number(id)
            }
        });

        if (checkFilm) {
            let data = {...checkFilm[0], poster: `/public/image/${filename}`}
            await prisma.movie.update({data, where: 
            {
                id: Number(id)
            }})
            successCode(res, data);
        } else {
            errorCode(res, "Film Not Found");
        }
    } catch {
        failCode(res);
    }
}


module.exports = {
    getFilms,
    addFilm,
    deleteFilm,
    getFilmPages,
    getBanners,
    getFilmByDate,
    getFilmById,
    addFilmPoster,
    uploadPoster
}
