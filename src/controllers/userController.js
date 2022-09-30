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
        if (checkEmail.length > 0) errorCode(res, "Email Account Already Exists");
        else {
            const createData = await prisma.user.create({data});
            if(createData) successCode(res, "User Account Creation Success");
            else errorCode(res, "User Account Creation Failed");
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
        if (checkEmail.length > 0) errorCode(res, "Email Account Already Exists");
        else {
            const createData = await prisma.user.create({data});
            if(createData) successCode(res, createData);
            else errorCode(res, "User Account Creation Failed");
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
            } else errorCode(res, "Wrong Password");
            
        } else errorCode(res, "Email Account Not Found");
    } catch  {
        failCode(res);
    }
}



// LayDanhSachNguoiDung
const getUsers = async (req, res) => {
    const data = await prisma.user.findMany();
    successCode(res, data);
}


// LayDanhSachNguoiDungPhanTrang

const getUsersPages = async (req, res) => {
    try {
        const totalCount = await prisma.user.count()
    
        let {pageNum, pageItemsNum} = req.query;
        const totalPages = Math.ceil(totalCount/pageItemsNum);
    
        if (pageNum == null && pageItemsNum == null || pageNum < 1) {
            const items = await prisma.user.findMany();
            successCode(res, {
                totalPages: 1,
                totalCount, 
                items
            });
        } else if (pageNum == null) {
            const items = await prisma.user.findMany({
                take: Number(pageItemsNum),
            });
            
            successCode(res, {
                count: pageItemsNum,
                totalPages,
                totalCount, 
                items
            });      
    
        } else if (pageItemsNum == null || pageItemsNum < 1){
            errorCode(res, "Invalid number of items per page");
        } else {
            const items = await prisma.user.findMany({
                skip: (Number(pageNum - 1) * pageItemsNum), 
                take: Number(pageItemsNum),
            });
            
            successCode(res, {
                currentPage: pageNum,
                count: pageItemsNum,
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
    try {
        const { id } = req.params;
        const {name, email, phone, pass_word, role_id} = req.body;
    
        const data = {
            name, 
            email,
            phone,
            pass_word: authController.hashPass(pass_word),
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
            errorCode(res, "User Account Does Not Exist");
        }
    } catch {
        failCode(res);
    }

}

// XoaNguoiDung
const deleteUser = async (req, res) => {
    try{
        const {id} = req.params;
        if(id == "undefined"){
            errorCode(res, "User Id missing")
        } else {
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
                errorCode(res, "User Data Not Found")
            }
        }
        } catch {
            failCode(res)
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