Discuts = new Mongo.Collection("discuts", {transform: function(doc) {
    doc.userObj = Meteor.users.findOne(doc.owner,{fields:{profile:1}});
    return doc;
  }});