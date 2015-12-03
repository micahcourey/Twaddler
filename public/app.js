var twaddler = angular.module('twaddler', ['ngRoute', 'ngResource', 'angular.filter']).run(function($rootScope, $http) {
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

twaddler.directive('xref',function($route, $location){
  return {
    link: function(scope, elm,attr){
      elm.on('click',function(){
        if ( $location.path() === attr.xref ) {
          $route.reload();
        } else {
          scope.$apply(function(){
            $location.path(attr.xref);
          });
        }
      });
    }
  };
});

twaddler.factory('postFactory', function($resource) {
  return $resource('/api/posts/:id');
});

twaddler.controller('mainCtrl', function(postFactory, $scope, $rootScope) {
  $scope.posts = postFactory.query();
	$scope.newPost = {created_by: '', text: '', created_at: ''};

	$scope.post = function() {
	  $scope.newPost.created_by = $rootScope.current_user;
	  $scope.newPost.created_at = Date.now();
	  postFactory.save($scope.newPost, function(){
	    $scope.posts = postFactory.query();
	    $scope.newPost = {created_by: '', text: '', created_at: ''};
	  });
	};
  $scope.delete = function(post)	{
		postFactory.delete({id: post._id});
		$scope.posts = postFactory.query();
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
