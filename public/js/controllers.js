/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, socket) {
    socket.on('send:name', function (data) {
      $scope.name = data.name;
    });
  }).
  controller('MyCtrl1', function ($scope, socket) {
    $scope.tictacs = [
      {position: 'tl', status: 0},
      {position: 'tm', status: 0},
      {position: 'tr', status: 0},
      {position: 'cl', status: 0},
      {position: 'cm', status: 0},
      {position: 'cr', status: 0},
      {position: 'bl', status: 0},
      {position: 'bm', status: 0},
      {position: 'br', status: 0}
    ];
    $scope.isUnchanged = function(tictacs) {
      console.log(tictacs);
      console.log($scope.tictacs);
      return angular.equals(tictacs, $scope.tictacs);
    };
    $scope.processTurn = function() {
      console.log($scope);
      // socket.emit('send:name', {
      //   name: 'Bob'
      // });
    };
    socket.on('send:time', function (data) {
      $scope.time = data.time;

    });
  }).
  controller('MyCtrl2', function ($scope) {
    // write Ctrl here
  });
