const mongoose = require('mongoose');
const mongoURI="mongodb://localhost:27017/inotebook"
async function connectToMongo() {
    await mongoose.connect(mongoURI).then(()=> console.log("Connected to Mongo Successfully")).catch((e) => console.log(e));
  }
  
  module.exports = connectToMongo;
  
// const mongoose = require('mongoose');
// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect('mongodb://localhost:27017/demoDB');
//     console.log(`Mongo db connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// };
// module.exports = connectDB;