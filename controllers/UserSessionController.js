const db = require("../models");

// Defining methods for the UserSessionController
module.exports = {

  findOne: function(req, res) {
    console.log("======================================================");
    console.log(req.body);
    let email = req.body.email
    let password = req.body.password

    email = email.toLowerCase();
    email = email.trim();

    // run a find mongoose method that looks for an email in the user collection that matches what is passed
    // by the api call
    db.User.find( {email: email}, (err, users) => {

      //check error
      if (err) {
        console.log('err 2:', err);
        return res.send({
          success: false,
          message: 'Error: server error'
        });
      }

      //check error
      if (users.length != 1) {
        return res.send({
          success: false,
          message: 'Error: Invalid'
        });
      }

      //set the first user returned by the .find method equal to "user"
      const user = users[0];

      // Otherwise correct user!!!!!
      const userSession = new db.UserSession();
      userSession.userId = user._id;

      userSession.save((err, doc) => {
        if (err) {
          console.log(err);
          return res.send({
            success: false,
            message: 'Error: server error'
          });
        }

        return res.send({
          success: true,
          message: 'Valid sign in',
          token: doc._id
        }); // end of return

      });  //end of User Session.save
    }); //end of user find

  } //end of findOne

};  //end of module exports
