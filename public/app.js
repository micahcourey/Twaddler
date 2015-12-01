var twaddler = angular.module('twaddler', ['ngRoute']).run(function($rootScope, $http) {
  $rootScope.authenticated = false;
  $rootScope.current_user = '';

  $rootScope.signout = function() {
    $http.get('auth/signout');
    $rootScope.authenticated = false;
    $rootScope.current_user = '';
  };
});

twaddler.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'templates/main.html',
      controller: 'mainCtrl'
    })
    .when('/login', {
      templateUrl: 'templates/login.html',
      controller: 'authController'
    })
    .when('/signup', {
      templateUrl: 'templates/signup.html',
      controller: 'authController'
    });
});

twaddler.directive('navbar', function() {
  return {
    templateUrl: "templates/navbar.html"
  }
});

twaddler.factory('postService', function($http) {
  var baseUrl = "/api/posts";
  var factory = {};
  factory.getAll = function() {
    return $http.get(baseUrl);
  }
  return factory;
});

twaddler.controller('mainCtrl', function($scope, postService) {
  $scope.twaddles = postService.query();
  $scope.newTwaddle = {creator: '', text: '', created: ''};

  $scope.twaddle = function() {
    $scope.newTwaddle.creator = $rootScope.current_user;
    $scope.newTwaddle.created = Date.now();
    postService.save($scope.newPost, function(){
      $scope.twaddles = postService.query();
      $scope.newTwaddle = {creator: '', text: '', created: ''};
    });
  };
});

twaddler.controller('authCtrl', function($scope, $http, $rootScope, $location) {
  $scope.user = {username: '', password: ''};
  $scope.error_message = '';

  $scope.login = function() {
    $http.post('/auth/login', $scope.user).success(function(data){
      if(data.state == 'success'){
        $rootScope.authenticated = true;
        $rootScope.current_user = data.user.username;
      } else {
        $scope.error_message = data.message;
      }
    });
  };

  $scope.signup = function() {
    $http.post('auth/signup', $scope.user).success(function(data){
      if(data.state == 'success'){
        $rootScope.authenticated = true;
        $rootScope.current_user = data.user.username;
        $location.path('/');
      } else {
        $scope.error_message = data.message
      }
    });
  };
});
