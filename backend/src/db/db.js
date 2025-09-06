const mongoose = require('mongoose')


async function connectDb(){
   try{
       await mongoose.connect(process.env.MONGODB_URL)
       console.log('Connected To MongoDB');
       
   } 
   catch(err){
      console.error("Error connecting to mongodb",err);
      
   }

}

module.exports = connectDb