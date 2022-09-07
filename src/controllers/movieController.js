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

    let {soTrang, soPhanTuTrenTrang} = req.query;
    
    const totalPages = Math.ceil(totalCount/soPhanTuTrenTrang)
    // lấy n phần tử trên trang
    if(soPhanTuTrenTrang == null && soTrang == null || soTrang < 1) {

        let items = await prisma.movie.findMany();
        successCode(res, items)
    } else if (soTrang == null) {
        let items = await prisma.movie.findMany({
            take: Number(soPhanTuTrenTrang),
        })

        successCode(res, {
            count: soPhanTuTrenTrang,
            totalCount, 
            items
        })
    } else if (soPhanTuTrenTrang == null || soPhanTuTrenTrang < 1 ) {
        errorCode(res, "Số phần tử trên trang không hợp lệ")
    } 
    else {
            let items = await prisma.movie.findMany({
                skip: (Number(soTrang - 1) * soPhanTuTrenTrang), 
                take: Number(soPhanTuTrenTrang),
            })
            
            successCode(res, {
                currentPage: soTrang,
                count: soPhanTuTrenTrang,
                totalPages,
                totalCount, 
                items
            })       
    }
}        

const getFilmByDate = async (req, res) => {
    const {soTrang, soPhanTuTrenTrang, tuNgay, denNgay} = req.query;
    // số ngày hợp lệ
    if (tuNgay == null && denNgay == null && soPhanTuTrenTrang == null && soTrang == null) {
        errorCode(res, "Chưa điền đủ thông tin về ngày!")
    } else if (tuNgay == null || denNgay == null){
        errorCode(res, "Chưa điền đủ thông tin về ngày!")
    } else if (soPhanTuTrenTrang == null && soTrang == null) {
            let items = await prisma.movie.findMany({
            where: {
                startDate: {
                    gte: new Date(tuNgay),
                    lt: new Date(denNgay)
                }
            }
        })
        successCode(res, items)

    } else if (soTrang == null) {
        let items = await prisma.movie.findMany({
        take: Number(soPhanTuTrenTrang),
            where: {
                startDate: {
                    gte: new Date(tuNgay),
                    lt: new Date(denNgay)
                }
            }
        })
        successCode(res, items)
    }  else if (soPhanTuTrenTrang == null){
                errorCode(res, "Số Phần Tử không hợp Lệ")
    }  else {
        let items = await prisma.movie.findMany({
            skip: (Number(soTrang - 1) * soPhanTuTrenTrang), 
            take: Number(soPhanTuTrenTrang),
            where: {
                startDate: {
                    gte: new Date(tuNgay),
                    lt: new Date(denNgay)
                }
            }
        })
        successCode(res, items)
    }
} 


//LayThongTinPhim theo ma phim
const getFilmById = async (req, res) => {
    const {maPhim} = req.query;
    if (maPhim) {
        let items = await prisma.movie.findMany({
            where: {
                id: Number(maPhim)
            }
        });    
    successCode(res, items)
    } else {
        errorCode(res, "Mã phim không hợp lệ")
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
        console.log(checkFilm)
        if (checkFilm.length > 0) {
        await prisma.movie.delete({
            where: {
                id: Number(id)
            }
        })} else {
            errorCode(res, "Không tìm thấy dữ liệu");
        }
        successCode(res, "Xoá Phim Thành Công");
    } catch {
        failCode(res);
    } 
}


// ThemPhimUploadHinh
const addFilmImage = async (req, res) => {
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
            errorCode(res, "Phim không tồn tại");
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
    addFilmImage,
    uploadPoster
}
