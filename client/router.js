 angular.module('mtalkies').config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
    function($urlRouterProvider, $stateProvider, $locationProvider){
 
      $locationProvider.html5Mode(true);
 
      $stateProvider
        .state('discuts', {
          url: '/discuts',
          templateUrl: 'client/discuts/templates/discutsView.ng.html',
          controller: 'DiscutsCtrl',
          resolve: {
            "currentUser": ["$meteor", function($meteor){
              return $meteor.requireUser();
            }]
          }
        })
        // .state('partyDetails', {
        //   url: '/parties/:partyId',
        //   //templateUrl: 'party-details.ng.html',
        //   //controller: 'PartyDetailsCtrl'
        // });
        .state('profile', {
          url: '/profile',
          templateUrl: 'client/profiles/templates/profileView.ng.html',
          controller: 'ProfileCtrl',
          resolve: {
            "currentUser": ["$meteor", function($meteor){
              return $meteor.requireUser();
            }]
          }
        })
        .state('profileWithId', {
          url: '/profile/:username',
          templateUrl: 'client/profiles/templates/profileView.ng.html',
          controller: 'ProfileCtrl',
          resolve: {
            "currentUser": ["$meteor", function($meteor){
              return $meteor.requireUser();
            }]
          }
        })
         .state('userSettings', {
          url: '/user-settings',
          templateUrl: 'client/templates/user-settings.ng.html',
          controller: 'AuthCtrl',
        })
 
      //$urlRouterProvider.otherwise("/discuts");
    }]);
 