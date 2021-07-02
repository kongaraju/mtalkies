// server
Meteor.publish("userData", function () {
  //if (this.userId) {
    return Meteor.users.find({});
  //} else {
    //this.ready();
  //}
});
Meteor.publish("profilePic", function () {
  //if (this.userId) {
    return ProfilePic.find({});
  //} else {
    //this.ready();
  //}
});

Meteor.methods({
  addToFollowing: function (id) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
 
   //console.log(id);
   Meteor.users.update({"_id":Meteor.userId()},{'$addToSet':{'profile.following':id}});
   Meteor.users.update({"_id":id},{'$addToSet':{'profile.followers':Meteor.userId()}});
  },

  isFollowing: function (id) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
 
    //console.log(id);
    return !!Meteor.users.find({'_id':id,'profile.following':{'$in':[Meteor.userId()]}}).count();
  },
  followCounts:function(){
    var profile = Meteor.users.find({'_id':id},{fields:{'profile':1}});
    console.log(profile);
    return{
      //followers:
    }
  }

});

