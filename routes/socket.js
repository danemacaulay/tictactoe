/*
 * Serve content over a socket
 */
_ = require('underscore');
module.exports = function (socket) {
  socket.on('player:join', function (data) {
    socket.get('user', function (err, name) {
      newGame.players.push(name);
    });
    socket.emit('server:turn',newGame);
  });
  socket.on('player:create', function (user) {
    socket.set('user', user, function () {
      socket.emit('server:createdUser');
    });
  });
  socket.on('player:turn', function (data) {
    socket.broadcast.emit('server:turn', {
      tictacs: data
    });
  });
  var newGame = {
    tictacs : [
      {x:1, y: 1, checked: false, disabled: false, magic: 8, owner: null},
      {x:2, y: 1, checked: false, disabled: false, magic: 1, owner: null},
      {x:3, y: 1, checked: false, disabled: false, magic: 6, owner: null},
      {x:1, y: 2, checked: false, disabled: false, magic: 3, owner: null},
      {x:2, y: 2, checked: false, disabled: false, magic: 5, owner: null},
      {x:3, y: 2, checked: false, disabled: false, magic: 7, owner: null},
      {x:1, y: 3, checked: false, disabled: false, magic: 4, owner: null},
      {x:2, y: 3, checked: false, disabled: false, magic: 9, owner: null},
      {x:3, y: 3, checked: false, disabled: false, magic: 2, owner: null}
    ],
    players: [],
    winner: null
  };
  var isWinner = function(gameData){
    _.each(gameData.players, function(player){
      // gather up players rows
      var rows = getPlayersRows(gameData, player);
      // set the winner if we have one
      _.each(rows, function(row){
        gameData.winner = magicNumbers(row) ? player : null;
      });
      return gameData;
    });
  };
  var magicNumbers = function(tictacSeries){
    var count = 0;
    _.each(tictacSeries, function(tictac){
      count += tictac.magic;
    });
    return count == 15 ? true : false;
  };
  var getPlayersRows = function(gameData, player){
    var i, playersTictacs, rows, horizTictacs, count;
    playersTictacs = _.where(gameData.tictacs, {owner: player});
    for(i = 1; i < 4; i++){
      // get all x rows
      rows.push(_.where(playerTictacs, {x:i}));
      // get all y rows
      rows.push(_.where(playerTictacs, {y:i}));
    }
    // get forward slash
    rows.push(_.filter(playerTictacs, forwardSlash));
    // get backward slash
    rows.push(_.filter(playerTictacs, backwardSlash));
  };
  var forwardSlash = function(tictac){
    if(tictac.x == 1 && tictac.y == 1){
      return true;
    }else if(tictac.x == 2 && tictac.y == 2){
      return true;
    }else if(tictac.x == 3 && tictac.y == 3){
      return true;
    }else{
      return false;
    }
  };
  var backwardSlash = function(tictac){
    if(tictac.x == 3 && tictac.y == 1){
      return true;
    }else if(tictac.x == 2 && tictac.y == 2){
      return true;
    }else if(tictac.x == 1 && tictac.y == 3){
      return true;
    }else{
      return false;
    }
  };
};
