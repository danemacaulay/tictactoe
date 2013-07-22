/* Controllers */

angular.module('myApp.controllers', []).
  controller('MyCtrl1', function ($scope, socket) {
    socket.on('server:createdUser', function () {
      socket.emit('player:join');
    });
    socket.on('server:turn', function (data) {
      $scope.newtictacs = data.tictacs;
      $scope.tictacs = angular.copy($scope.newtictacs);
    });
    $scope.onlyOne = function(activeTictac) {
      angular.forEach($scope.tictacs, function(tictac){
        // set all disabled if we're checking the checkbox
        tictac.disabled = activeTictac.checked;
        // respect those who are already set
        if(tictac.checked){
          tictac.disabled = true;
        }
      });
      activeTictac.owner = $scope.toggleOwner(activeTictac.owner);
      activeTictac.disabled = false;
    };
    $scope.toggleOwner = function(owner){
      if(owner === null){
        return $scope.user;
      }else if(owner == $scope.user){
        return null;
      }
    };
    $scope.isUnchanged = function() {
      return angular.equals($scope.newtictacs, $scope.tictacs);
    };
    $scope.createUser = function(){
      socket.emit('player:create', $scope.user);
    };
    $scope.processTurn = function() {
      angular.forEach($scope.tictacs, function(tictac){
        tictac.disabled = tictac.checked;
      });
      $scope.myTurn = false;
      socket.emit('player:turn', $scope.tictacs);
    };
  });

