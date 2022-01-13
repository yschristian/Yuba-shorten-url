const mongoose =require('mongoose');
const config=require('config');
const db=config.get('mongoURL');

const connectDB=async()=>{
    try{
            await mongoose.connect(db,{useNewUrlParser:true});
            console.log('mongo db connected');
    }catch(err){
        console.log(err);
    }
}
module.exports = connectDB;