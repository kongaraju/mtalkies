angular.module("mtalkies").controller("HeaderCtrl", ['$rootScope','$scope', '$meteor',
  function($root, $scope, $meteor){
    var opened = false;
    $scope.showUsers = function(){
      opened = !opened;
      $root.$broadcast('toggleChat',opened);
    };

$scope.logout = function(){

	Meteor.logout(function(error){

		console.log(error)
	})

}

$root.fromNow =function(date){
 return moment(date).fromNow()
}

  }]);