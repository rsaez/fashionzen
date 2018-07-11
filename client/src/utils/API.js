import axios from "axios";

export default {
    // Gets all clothes
    getCloset: function() {
        return axios.get("/api/closet");
    },
    // Saves clothes to the database
    saveCloset: function(clothesData) {
        return axios.post("/api/closet", clothesData);
    },
    // Deletes the book with the given id
    deleteCloset: function(id) {
    return axios.delete("/api/closet/" + id);
  },
    getImage: function(){

    }
};