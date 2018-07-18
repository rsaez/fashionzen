const db = require("../models");

// Defining methods for the UserSessionController
module.exports = {

  //finds users and logs in when signin button is clicked
  findOne: function(req, res) {
    console.log("======================================================");
    console.log(req.body.email);
    console.log("");
    let email = req.body.email;
    let password = req.body.password;

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
          token: doc._id,
          userInfo: user._id 
        }); // end of return

      });  //end of User Session.save
    }); //end of user find

  }, //end of findOne

  // logout logic, deletes users session when logout is clicked
  deleteToken: function(req, res) {

    console.log("======================================================");
    console.log("Logout Button has just been clicked.");
    console.log("");
    // Get the token
    let query = req.body.query;
    let token = req.body.token;

    // ?token=test
    // Verify the token is one of a kind and it's not deleted.
    db.UserSession.findOneAndUpdate({
      _id: token,
      isDeleted: false
    }, {
      $set: {
        isDeleted:true
      }
    }, null, (err, sessions) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }
      return res.send({
        success: true,
        message: 'Good'
      });
    });

  }, // end of logout

  // verify logic, verifies session when an action is taken not a page loaded
  verify: function(req, res) {
    // Get the token
    let query = req.body.query;
    let token = req.body.token;

    // ?token=test
    // Verify the token is one of a kind and it's not deleted.
    db.UserSession.findOneAndUpdate({
      _id: token,
      isDeleted: false
    }, {
      $set: {
        isDeleted:true
      }
    }, null, (err, sessions) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }
      return res.send({
        success: true,
        message: 'Good'
      });
    });
  } // end of verify


};  //end of module exports
