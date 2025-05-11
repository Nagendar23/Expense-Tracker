const mongoose = require('mongoose');

const connectionDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI, {});
        console.log('MongoDB connected...');
    }catch(error){
        console.log("Error connecting in MongoDB",error.message);
        process.exit(1);

    }
};


module.exports = connectionDB;