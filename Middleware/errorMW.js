const err = (err, req, res, next) => {
 const status = err.status || 500;
 const messsage = err.messsage || 'Internal Server error';   
 return res.status(status).json({
    success: false,
    status,
    messsage
 })
}

module.exports = err