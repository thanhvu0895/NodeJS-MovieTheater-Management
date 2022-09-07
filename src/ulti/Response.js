// 200
const successCode = (res, data) => {
    let dSend = {
        message: "Thành công",
        data: data,
        dateTime: (new Date()).toJSON()
    }

    res.status(200).send(dSend);
}

//400
const errorCode = (res, data) => {

    let dSend = {
        message: "Thất bại",
        data: data,
        dateTime: (new Date()).toJSON()
    }
    
    res.status(400).send(dSend);

}

//500
const failCode = (res) => {
    let dSend = {
        message: "Lỗi hệ thống !",
        dateTime: (new Date()).toJSON()
    }
    res.status(500).send(dSend);

}

module.exports = {
    successCode,
    errorCode,
    failCode
}