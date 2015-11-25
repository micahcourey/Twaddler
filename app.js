var twaddler = angular.module('twaddler', [])

.directive('header', function() {
  return {
    templateUrl: "templates/header.html",
    controller: "headersCtrl"
  }
})

twaddler.controller('mainCtrl', function mainCtrl($scope) {

  $scope.twaddles = [];
  $scope.newTwaddle = {creator: '', text: '', created: ''};

  $scope.twaddle = function() {
    $scope.newTwaddle.created = Date.now();
    $scope.twaddles.push($scope.newTwaddle);
    $scope.newTwaddle = {creator: '', text: '', created: ''};
  };
});

// twaddler.config(function($stateProvider, $urlRouterProvider) {
//   $stateProvider.state('home', {
//     url: "",
//     views: {
//       'header': {
//         templateUrl: "templates/header.html",
//         controller: "headersCtrl"
//       }
//       'form': {
//         templateUrl: "templates/form.html",
//         controller: "mainCtrl"
//       },
//       'feed': {
//         templateUrl: "templates/feed.html",
//         controller: "mainCtrl"
//       }
//     }
//   });
//
// });
