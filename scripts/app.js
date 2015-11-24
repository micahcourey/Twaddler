var twaddler = angular.module('twaddler', [])

twaddler.controller('mainCtrl', function($scope) {
  $scope.twaddles = [];
  $scope.newTwaddle = {creator: '', text: '', created: ''};

  $scope.twaddle = function() {
    $scope.newTwaddle.created = Date.now();
    $scope.twaddles.push($scope.newTwaddle);
    $scope.newTwaddle = {creator: '', text: '', created: ''};
  };
});
