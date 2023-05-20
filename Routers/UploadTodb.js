const fs = require('fs');
require("dotenv").config()
const mongoose = require('mongoose');

// Connection URL and database name
const url = process.env.MONGO_DB;

// Mongoose model for your data structure
const YourModel = require("../Models/AdmindataModel");
const jsonFile = require('../jsondata.json')

// File paths
const filePaths = [
    jsonFile
];

// Connect to the MongoDB server
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected successfully to MongoDB');

        // Read and upload each file
        Promise.all(filePaths.map(readAndUploadFile))
            .then(() => {
                console.log('All files uploaded successfully');
                mongoose.connection.close();
            })
            .catch(error => {
                console.error('Error uploading files:', error);
                mongoose.connection.close();
            });
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });

// Read a file and upload its contents to the database
function readAndUploadFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(`Error reading file ${filePath}: ${err}`);
                return;
            }

            try {
                const jsonData = JSON.parse(data);

                YourModel.insertMany(jsonData)
                    .then(() => {
                        console.log(`File ${filePath} uploaded successfully`);
                        resolve();
                    })
                    .catch(error => {
                        reject(`Error uploading file ${filePath}: ${error}`);
                    });
            } catch (parseError) {
                reject(`Error parsing JSON in file ${filePath}: ${parseError}`);
            }
        });
    });
}