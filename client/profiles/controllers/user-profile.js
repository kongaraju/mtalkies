angular.module("mtalkies").controller("ProfileCtrl", ['$rootScope','$scope', '$meteor', "$stateParams",
  function($root, $scope, $meteor,$params){
    console.log($params);
    console.log(Meteor.userId())
     $scope.username = $params.username || Meteor.userId();
     $scope.isCurrentUser = $scope.username === Meteor.userId();
     $scope.userObj = {};
     $scope.user={};
     
      $scope.userObj =  Meteor.users.findOne($scope.username,{fields:{profile:1}});
        if($scope.userObj){
          $scope.user = $scope.userObj.profile;
          $scope.isFollowing = $scope.user.followers.indexOf(Meteor.userId()) !== -1;
        }
       console.log($scope.user);
      
    $scope.saveProfile = function(user){
      Meteor.users.update( { _id: Meteor.userId() }, { $set: {'profile' : user}} )

    };

     $scope.addToFollowing = function(user){
      $meteor.call("addToFollowing",$scope.username)
    };

     

    $scope.changeProfilePic = function(target){
    	var files = target.files;
	    for (var i = 0, ln = files.length; i < ln; i++) {
	      var fileObj = ProfilePic.insert(files[i]);
console.log(fileObj);
var fileName = fileObj.collectionName+"-"+fileObj._id+"-"+fileObj.original.name;
Meteor.users.update( { _id: Meteor.userId() }, { $set: {'profile.pic' : fileObj,'profile.picName':fileName}});

// , function (err, fileObj) {
//           console.log(err);
//           if(!err){
//             console.log(fileObj);
//              //Meteor.users.update( { _id: Meteor.userId() }, { $set: {'profile.pic' : fileObj}});
//           // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
//           }
//         }

	    }
    }

  }]);