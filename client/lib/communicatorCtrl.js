angular.module("mtalkies").controller("CommunicatorCtrl", ['$rootScope','$scope', '$meteor',
  function($root, $scope, $meteor){
    $scope.show=false;
    $scope.view = 'list';
    $scope.$on('toggleChat',function(event,state){
    	$scope.show=state;
    });
	
	$scope.users = $meteor.collection(Meteor.users).subscribe("userData");//Meteor.users.find({});
	$scope.switchView=function(view,user){

		$scope.view = view;
		if(user)
		$root.$broadcast('openChat',user);
	};
	$scope.getStatusClass=function(user){
		var status = 'avatar-off';
		if(user.status && user.status.online){
			status = 'avatar-online';
		}else if(user.status && user.status.idle){
			status = 'avatar-away';
		}

		return status;
	}
  }]);