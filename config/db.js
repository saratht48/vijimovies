const mongoose=require('mongoose')

exports.connectDB=()=>{
    mongoose.connect(process.env.CONN_STR, {
        useNewUrlParser: true
    }).then((conn) => {
        //console.log(conn);
        console.log('DB Connection Successful');
    })
}
