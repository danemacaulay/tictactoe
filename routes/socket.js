/*
 * Serve content over a socket
 */

module.exports = function (socket) {
  socket.on('player:join', function (data) {
    socket.emit('server:turn', {
      tictacs : [
        {position: 'tl', status: false, disabled: false},
        {position: 'tm', status: false, disabled: false},
        {position: 'tr', status: false, disabled: false},
        {position: 'cl', status: false, disabled: false},
        {position: 'cm', status: false, disabled: false},
        {position: 'cr', status: false, disabled: false},
        {position: 'bl', status: false, disabled: false},
        {position: 'bm', status: false, disabled: false},
        {position: 'br', status: false, disabled: false}
      ],
      players: []
    });
  });

  socket.on('player:turn', function (data) {
    socket.broadcast.emit('server:turn', {
      tictacs: data
    });
  });
};
