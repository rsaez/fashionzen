const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
// const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3001;
const busboyBodyParser = require('busboy-body-parser');
app.use(busboyBodyParser());

// Define middleware here, set extended to true so you can post "nested objects" and make it work with json too
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets for production deployment (On Heroku in this case)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Have every API or view request go through the router middleware
app.use(routes);

//app.post('/testImage', function(res, req){
//     let connection = mongoose.connection;
//     if (connection !== "undefined"){
//         console.log(connection.readyState.toString());
//         //The Path object
//         let path = require("path");
//         //The grid-stream
//         let grid = require("gridfs-stream");
//         //The File-System module
//         let fs = require("fs");
//         // Read the image file from the "filestoread" folder
//         let filesrc = req.body;
//         //establish connection between Mongo and GridFS
//         grid.mongo = mongoose.mongo;
//         connection.once("open", () => {
//             console.log("Connection Open");
//             let gridfs = grid(connection.db);
//             if (gridfs){
//                 //Create a stream, this will be used to store file in database
//                 let streamwrite = gridfs.createWriteStream({
//                     //the file will be stored with the name
//                     filename: "blueshirt.png"
//                 });
//                 //create a readstream to read the file from the filestoread folder and pipe into database
//                 fs.createReadStream(filesrc).pipe(streamwrite);
//                 //complete the write operation
//                 streamwrite.on("close", function(file){
//                     console.log("Write written successfully in database");
//                     res.send({
//                         success: true
//                     })
//                 });
//             } else {
//                 console.log("Sorry No Grid FS Object");
//             }
//         });
//     } else {
//         console.log("Sorry not connected");
//         res.send({
//             success: false
//         })
//     }
//     console.log("Done");
//
// });



// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fashionzen");
    let connection = mongoose.connection;
    if (connection !== "undefined"){
        console.log(connection.readyState.toString());
        //The Path object
        let path = require("path");
        //The grid-stream
        let grid = require("gridfs-stream");
        //The File-System module
        let fs = require("fs");
        // Read the image file from the "filestoread" folder
        let filesrc = path.join(__dirname, "/client/src/filestoread2/blueshirt.png");
        //establish connection between Mongo and GridFS
        grid.mongo = mongoose.mongo;
        connection.once("open", () => {
            console.log("Connection Open");
            let gridfs = grid(connection.db);
            if (gridfs){
                //Create a stream, this will be used to store file in database
                let streamwrite = gridfs.createWriteStream({
                    //the file will be stored with the name
                    filename: "blueshirt.png"
                });
                //create a readstream to read the file from the filestoread folder and pipe into database
                fs.createReadStream(filesrc).pipe(streamwrite);
                //complete the write operation
                streamwrite.on("close", function(file){
                    console.log("Write written successfully in database");
                });
            } else {
                console.log("Sorry No Grid FS Object");
            }
        });
    } else {
        console.log("Sorry not connected");
    }
    console.log("Done");

//The Connection Object

// Start the API server
app.listen(PORT, function() {
  console.log(`API Server now listening on PORT ${PORT}!`);
});
