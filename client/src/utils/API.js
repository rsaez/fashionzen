import axios from "axios";

export default {
    // Gets all clothes
    getCloset: function() {
        return axios.get("/api/closet");
    },
    // Saves clothes to the database
    saveBook: function(clothesData) {
        return axios.post("/api/closet", clothesData);
    }
};