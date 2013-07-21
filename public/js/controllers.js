/* Controllers */

angular.module('myApp.controllers', []).
  controller('MyCtrl1', function ($scope, socket) {
    socket.emit('player:join');
    socket.on('server:turn', function (data) {
      $scope.newtictacs = data.tictacs;
      $scope.tictacs = angular.copy($scope.newtictacs);
    });
    $scope.onlyOne = function(activeTictac) {
      angular.forEach($scope.tictacs, function(tictac){
        // set all disabled if we're checking the checkbox
        tictac.disabled = activeTictac.status;
        // respect those who are already set
        if(tictac.status){
          tictac.disabled = true;
        }
      });
      activeTictac.disabled = false;
    };
    $scope.isUnchanged = function() {
      return angular.equals($scope.newtictacs, $scope.tictacs);
    };
    $scope.processTurn = function() {
      angular.forEach($scope.tictacs, function(tictac){
        tictac.disabled = tictac.status;
      });
      socket.emit('player:turn', $scope.tictacs);
    };
  });

