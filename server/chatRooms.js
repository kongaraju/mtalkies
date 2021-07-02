Meteor.publish("chatRooms", function () {
  return ChatRooms.find({});
});
Meteor.methods({
  addRoom: function (userIds) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    var RoomKey = userIds.sort().join().replace(',','');
    return ChatRooms.insert({
            members:userIds,
            key: RoomKey,
            createdAt: new Date(),
            owner: Meteor.userId(),            // _id of logged in user
            username: Meteor.user().username,
            messages:[]
          });
  },
  getChatRoom:function(id){
    var RoomKey = [Meteor.userId(),id].sort().join().replace(',','')
    var res = ChatRooms.findOne({key:RoomKey});
    if(res){
      return res;
    }else{
      return Meteor.call('addRoom', [Meteor.userId(),id]);
    }
  },
  pushMessage:function(RoomKey,msg){
    ChatRooms.update({"key":RoomKey},{$push:{messages:msg}});

  },
  deleteRoom: function (id) {
    ChatRooms.remove(id);
  },
});