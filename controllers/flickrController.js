const request = require("request");

module.exports = {

    getImage: function (req, res) {

        //add variables to store

    request("http://api.flickr.com/services/rest/?&method=flickr.people.getPublicPhotos&api_key=d99c7440d075321835a40777e9c40cdd&user_id=163803425@N07&per_page=1&page=1&format=json&jsoncallback=?")
    }

};