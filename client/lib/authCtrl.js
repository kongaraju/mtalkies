angular.module("mtalkies").controller("AuthCtrl", ['$rootScope','$scope', '$meteor',
  function($root, $scope, $meteor){

  	$scope.login= function(user,pswd){
    	Meteor.loginWithPassword({username:user},'944130', function(error){
    		console.log(error);
    	});
	}

	$scope.join= function(fname,user,pswd,cpswd){
		if(pswd === cpswd){
    	Accounts.createUser({username:user,password:'944130',profile:{
        firstName:fname,
        followers:[],
        following:[],
      }}, function(error){
    		console.log(error);
    	});
    }
	}

  $scope.changePassword= function(opswd,npswd,cpswd){
    if(npswd === cpswd){
      Accounts.changePassword(opswd,npswd, function(error){
        console.log(error);
      });
      }
  }
  }]);