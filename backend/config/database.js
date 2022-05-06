const mongoose = require("mongoose");

const DB = process.env.DB_URI;

const connectDatabase = () => {
  mongoose.connect(DB).then((data) => {
    console.log(`Mongodb connected with server`);
  });
};

module.exports = connectDatabase;
