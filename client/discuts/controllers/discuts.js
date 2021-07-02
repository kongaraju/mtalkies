angular.module("mtalkies").controller("DiscutsCtrl", ['$scope', '$meteor',
  function($scope, $meteor){
    $scope.canReply=false;
     $scope.loadComments=false;
    var Count_Key = 'DiscutsLimit';
    var Page_Size = 10;
     Session.set(Count_Key,Page_Size)
    
    $scope.getDate = function(date){
      return new Date(date).toString();
    }
    


    $scope.init = function(id){
      console.log(id);
      $scope.parentId = id;
      $scope.discuts = $meteor.collection(function() {
        var filters = {};
        var query = {sort: { createdAt: -1 }};
          filters.parentId = id ||0 ;
        
        if(!filters.parentId){
          query.limit=Session.get(Count_Key); 
        }
        var discuts = Discuts.find(filters, query);
        console.log(discuts)
        return discuts;
      }).subscribe('discuts');
    };

    $scope.makeFavourite = function(disc){
         $meteor.call('makeFavourite',disc._id);
    }
    $scope.like = function(disc){
        $meteor.call('addToLikers',disc._id);
    }
    $scope.dislike = function(disc){
        $meteor.call('addToDislikers',disc._id);
    }

    $scope.loadMore = function(){

      var newLimit = Session.get(Count_Key)+Page_Size;
       Session.set(Count_Key,newLimit);
    }
 
   $scope.addDiscut = function(newDiscut,parentId){
  	
      $meteor.call('addDiscut', newDiscut,parentId);
   };

    $scope.remove = function(discut){
      //$scope.discuts.splice( $scope.discuts.indexOf(discut), 1 );
      $meteor.call('deleteDiscut',discut._id);
    };
 
    $scope.removeAll = function(){
      $scope.discuts.remove();
    };
  }]);


// angular.module("mtalkies").directive(
//             "bnLogDomCreation",
//             function() {
//                 // I bind the UI to the $scope.
//                 function link( $scope, element, attributes ) {
//                     console.log(
//                         attributes.bnLogDomCreation,
//                         $scope.$index,$scope.disc._id
//                     );
//                 }
//                 // Return the directive configuration.
//                 return({
//                     link: link
//                 });
//             }
//         );