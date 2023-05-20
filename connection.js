const mongoose = require("mongoose");
require("dotenv").config()

const url = process.env.MONGO_DB

const connectToDb = () => {
    mongoose
        .connect(url)
        .then(() => {
            console.log("sucessfully connected");
        }) // when result is successfull
        .catch((err) => {
            console.error(err);
        }); // when there is some error

}
module.exports = connectToDb;