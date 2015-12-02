var twaddler = angular.module('twaddler', ['ngRoute', 'ngResource']).run(function($rootScope, $http) {
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
      controller: 'authCtrl'
    })
    .when('/signup', {
      templateUrl: 'templates/signup.html',
      controller: 'authCtrl'
    });
});

twaddler.directive('navbar', function() {
  return {
    templateUrl: "templates/navbar.html"
  }
});

twaddler.factory('postService', function($resource) {
  return $resource('/api/posts/:id');
});

twaddler.controller('mainCtrl', function($rootScope, $scope, postService) {
  $scope.posts = postService.query();
	$scope.newPost = {created_by: '', text: '', created: ''};

	$scope.post = function() {
	  $scope.newPost.created_by = $rootScope.current_user;
	  $scope.newPost.created = Date.now();
	  postService.save($scope.newPost, function(){
	    $scope.posts = postService.query();
	    $scope.newPost = {created_by: '', text: '', created: ''};
	  });
	};
  $scope.delete = function(post)	{
		postService.delete({id: post._id});
		$scope.posts = postService.query();
	};
});

twaddler.controller('authCtrl', function($rootScope, $scope, $http, $location) {
  $scope.user = {username: '', password: ''};
  $scope.error_message = '';

  $scope.login = function() {
    $http.post('/auth/login', $scope.user).success(function(data){
      if(data.state == 'success'){
        $rootScope.authenticated = true;
        $rootScope.current_user = data.user.username;
        $location.path('/');
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
