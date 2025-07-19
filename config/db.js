const mongoose = require('mongoose');
const catchAsyncError = require('../middleware/catchAsyncError');

const ConnectDataBase = catchAsyncError( async () => {
    await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then((res)=>{
         console.log(`✅ MongoDB connected: ${res.connection.host}`)
    }).catch((err)=>{
        console.log(err)
    })
    


})

module.exports = ConnectDataBase;