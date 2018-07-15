// Import mongoose settings 
const mongoose = require("mongoose");
var schema = mongoose.Schema;
let connection = mongoose.connection; //The Connection Object, maybe a const?

const path = require("path"); //The Path object
const grid = require("gridfs-stream"); //The grid-stream
const fs = require("fs"); //The File-System module

module.exports = {

    addImage: function(req, res) {
        if (connection !== "undefined"){
        console.log(connection.readyState.toString());

        // Read the image file from the "filestoread" folder
        let filesrc = path.join(__dirname, "./filestoread/blueshirt.png");

        //establish connection between Mongo and GridFS
        grid.mongo = mongoose.mongo;

        connection.once("open", () => {
            console.log("Connection Open");
            var gridfs = grid(connection.db);

            if (gridfs){
            //Create a stream with the file name of the image to store, this will be used to store file in database
            var streamwrite = gridfs.createWriteStream({
                //the file will be stored with 
                filename: "blueshirt.png"
            });
            //create a readstream to read the file from the filestoread folder and pipe into database
            fs.createReadStream(filesrc).pipe(streamwrite);
            //complete the write operation
            streamwrite.on("close", function(file){
                console.log("Write written successfully in database");
                // this is for testing, must send somthing back from the server
                res.send("It Worked!");
            });
            } else {
            console.log("Sorry No Grid FS Object");
            // this is for testing, must send somthing back from the server
            res.send("No Grid object");
            }

        });
        } else {
        console.log("Sorry not connected");
        res.send("connection failed");
        }
        console.log("Done");


    },

    readImage: function(req, res) {
        if (connection !== "undefined") {
            console.log(connection.readyState.toString());
            
            var videosrc = path.join(__dirname, "./filestowrite/celibration_write.mp4");
            Grid.mongo = mongooseDrv.mongo;
            connection.once("open", () => {
                console.log("Connection Open");
                var gridfs = grid(connection.db);
                if (gridfs) {
                    var fsstreamwrite = fs.createWriteStream(
                        path.join(__dirname, "./filestowrite/bird.png")
                    );
         
                    var readstream = gridfs.createReadStream({
                        filename: "bird.png"
                    });
                    readstream.pipe(fsstreamwrite);
                    readstream.on("close", function (file) {
                        console.log("File Read successfully from database");
                    });
                } else {
                    console.log("Sorry No Grid FS Object");
                }
            });
        } else {
         
            console.log('Sorry not connected');
        }
        console.log("done");
    }
}