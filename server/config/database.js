const mongoose=require('mongoose');
require('dotenv').config();
exports.connect=()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(()=>{
        console.log('database connection successful')
    })
    .catch((error)=>{
        console.log('database connection failed');
        console.error(error);
        process.exit(1);
    })
}