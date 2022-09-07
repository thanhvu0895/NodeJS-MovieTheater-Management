const { successCode, errorCode, failCode } = require('../ulti/response');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authController = require('./authController');

// Them nguoi dung

const addUser = async(req, res) => {
    try {
        const {name, email, phone, pass_word, role_id} = req.body;
        const data = {
            name, 
            email,
            phone,
            pass_word: authController.hashPass(pass_word),
            role_id
        };
        const checkEmail = await prisma.user.findMany({
            where: {
                email
            }
        });
        if (checkEmail.length > 0) errorCode(res, "email đã tồn tại");
        else {
            const createData = await prisma.user.create({data});
            if(createData) successCode(res, "tao tk thanh cong");
            else errorCode(res, "tao tk that bai");
        }
    } catch {
        failCode(res);
    }
} 


// Dang Ky
const signUp = async (req, res) => {
    try {
        const {name, email, phone, pass_word} = req.body;
        const data = {
            name, 
            email,
            phone,
            pass_word: authController.hashPass(pass_word),
        };
        // check email if existed
        const checkEmail = await prisma.user.findMany({
            where: {
                email
            }
        });
        if (checkEmail.length > 0) errorCode(res, "email đã tồn tại");
        else {
            const createData = await prisma.user.create({data});
            if(createData) successCode(res, createData);
            else errorCode(res, "tao tk that bai");
        }
    } catch {
        failCode(res);
    }
}

// Dang Nhap
const login = async (req, res) => {
    try {
        const {email, passWord} = req.body;
        const checkEmail = await prisma.user.findMany({
            where: {
                email
            }
        });
        if (checkEmail.length > 0) {
            const {pass_word} = checkEmail[0];
            const checkPass = authController.comparePass(passWord, pass_word);
            if (checkPass) {
                let token = authController.generateToken(checkEmail[0]);
                let data = {...checkEmail[0], token};
                successCode(res, data);
            } else errorCode(res, "Sai Mật khẩu");
            
        } else errorCode(res, "Email không tồn tại");
    } catch  {
        failCode(res);
    }
}



// LayDanhSachNguoiDung
const getUsers = async (req, res) => {
    const data = await prisma.user.findMany({
        include: {
            ticket: true
        }
    });
    successCode(res, data);
}


// LayDanhSachNguoiDungPhanTrang

const getUsersPages = async (req, res) => {
    try {
        const totalCount = await prisma.user.count()
    
        let {soTrang, soPhanTuTrenTrang} = req.query;
        const totalPages = Math.ceil(totalCount/soPhanTuTrenTrang);
    
        if (soTrang == null && soPhanTuTrenTrang == null || soTrang < 1) {
            const items = await prisma.user.findMany();
            successCode(res, {
                totalPages: 1,
                totalCount, 
                items
            });
        } else if (soTrang == null) {
            const items = await prisma.user.findMany({
                take: Number(soPhanTuTrenTrang),
            });
            
            successCode(res, {
                count: soPhanTuTrenTrang,
                totalPages,
                totalCount, 
                items
            });      
    
        } else if (soPhanTuTrenTrang == null || soPhanTuTrenTrang < 1){
            errorCode(res, "Số phần tử trên trang không hợp lệ");
        } else {
            const items = await prisma.user.findMany({
                skip: (Number(soTrang - 1) * soPhanTuTrenTrang), 
                take: Number(soPhanTuTrenTrang),
            });
            
            successCode(res, {
                currentPage: soTrang,
                count: soPhanTuTrenTrang,
                totalPages,
                totalCount, 
                items
            });      
        }
    } catch {
        failCode(res);
    }
}

// CapNhatThongTinNguoiDung
const updateUser = async (req, res) => {
    const { id } = req.params;
    const {name, email, phone, pass_word, role_id} = req.body;

    const data = {
        name, 
        email,
        phone,
        pass_word: authController.hashPass(pass_word),
        role_id
    };

    let checkUser = await prisma.user.findMany({
        where: {
            id: Number(id)
        }
    });

    if (checkUser.length > 0) {
        const updateData = await prisma.user.update({data,
            where: {
                id: Number(id)
            }});

        successCode(res, updateData);
    } else {
        errorCode(res, "Người dùng không tồn tại");
    }

}

// XoaNguoiDung
const deleteUser = async (req, res) => {
    const {id} = req.params;
    let checkUser = await prisma.user.findMany({
        where: {
            id: Number(id)
        }
    })

    if(checkUser.length > 0) {
        await prisma.user.delete({
            where: {
                id: Number(id)
        }})    
        successCode(res, "User Deleted")
    } else {
        errorCode(res, "Không tìm thấy dữ liệu người dùng")
    }
}


module.exports = {
    addUser,
    signUp,
    getUsers,
    deleteUser,
    login,
    updateUser,
    getUsersPages
}