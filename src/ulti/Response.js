// 200
const successCode = (res, data) => {
    let dSend = {
        message: "Success",
        data: data,
        dateTime: (new Date()).toJSON()
    }

    res.status(200).send(dSend);
}

//400
const errorCode = (res, data) => {

    let dSend = {
        message: "Bad Request",
        data: data,
        dateTime: (new Date()).toJSON()
    }
    
    res.status(400).send(dSend);

}

//500
const failCode = (res) => {
    let dSend = {
        message: " Internal Server Error",
        dateTime: (new Date()).toJSON()
    }
    res.status(500).send(dSend);

}

module.exports = {
    successCode,
    errorCode,
    failCode
}