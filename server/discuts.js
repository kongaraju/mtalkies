Meteor.publish("discuts", function () {
  return Discuts.find({});
});
Meteor.methods({
  addDiscut: function (newDiscut,parentId) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
 
    Discuts.insert({
      text:newDiscut,
      createdAt: new Date(),
      owner: Meteor.userId(),            // _id of logged in user
      username: Meteor.user().username,
      parentId: parentId || 0,
      favouriteTo : [],
      likers:[],
      dislikers:[],
    });
  },
  makeFavourite : function(id){
    Discuts.update({"_id":id},{$addToSet:{favouriteTo:Meteor.userId()}});
  },
  addToLikers : function(id){
    Discuts.update({"_id":id},{$addToSet:{likers:Meteor.userId()}});
  },
  addToDislikers : function(id){
    Discuts.update({"_id":id},{$addToSet:{dislikers:Meteor.userId()}});
  }, 
  deleteDiscut: function (id) {
    Discuts.remove(id);
  },
});