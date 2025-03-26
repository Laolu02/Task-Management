const mongoose = require('mongoose')

const connectdb = async(req, res) => {
  try {
    await mongoose.connect(process.env.MONGODB)
    
  } catch (error) { return console.log(error);
  
    
  }
  console.log("connected to DB");
  
}

module.exports = connectdb