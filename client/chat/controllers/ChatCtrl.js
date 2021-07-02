angular.module("mtalkies").controller("ChatCtrl", ['$scope', '$meteor',
  function($scope, $meteor){
  //$meteor.subscribe('chatRooms');
  $scope.msg = '';
  // $scope.room = $meteor.collection(function() {
  //       var RoomKey = [Meteor.userId(),Session.get('chatRoomUser')].sort().join().replace(',','');
  //       var room = ChatRooms.find({key:RoomKey});
  //       console.log(room.messages);
  //       return room.messages;
  //     }).subscribe('chatRooms');
  

    $scope.$on('openChat',function(event,user){
       $scope.msg = '';
      $scope.chatUser = user;
      $meteor.call('getChatRoom', user._id);
      Session.set('chatRoomUser',user._id);
      $scope.RoomKey = [Meteor.userId(),Session.get('chatRoomUser')].sort().join().replace(',','');
      $scope.room = $meteor.object(ChatRooms, {key: [Meteor.userId(),Session.get('chatRoomUser')].sort().join().replace(',','')})
            .subscribe('chatRooms');

      
      //console.log($scope.room.key);
      //$scope.messages = $scope.room.messages;

    });

    $scope.sendMessage = function(ev,msg){
      if(ev.keyCode === 13){
          $scope.msg = '';
          var name = Meteor.user().username;
          var id = Meteor.userId();
          Meteor.call('pushMessage',$scope.RoomKey, {
            name: name,
            userId:id,
            text: msg,
            createdAt: new Date()
          });
        
      }
    }

  }]);
