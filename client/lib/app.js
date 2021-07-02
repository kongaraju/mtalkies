if (Meteor.isClient) {
 
  // This code only runs on the client
  angular.module('mtalkies',['angular-meteor', 'ui.router']);
 Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
 
}