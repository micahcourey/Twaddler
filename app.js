var twaddler = angular.module('twaddler', [])

.directive('navbar', function() {
  return {
    templateUrl: "templates/navbar.html"
  }
})

twaddler.controller('mainCtrl', function($scope) {

  $scope.twaddles = [];
  $scope.newTwaddle = {creator: '', text: '', created: ''};

  $scope.twaddle = function() {
    $scope.newTwaddle.created = Date.now();
    $scope.twaddles.push($scope.newTwaddle);
    $scope.newTwaddle = {creator: '', text: '', created: ''};
  };
});

twaddler.controller('authCtrl', function($scope) {
  $scope.user = {username: '', password: ''};
  $scope.error_message = '';

  $scope.login = function() {
    $scope.error_message = 'login request for ' + $scope.user.username;
  };

  $scope.signup = function() {
    $scope.error_message = 'signup request for ' + $scope.user.username;
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
