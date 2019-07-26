
const p1 = { x: 0, y: 0 };
const p2 = { x: 7, y: 7 };

window.onload = function () {
  startGame();
};

function startGame () {
  const p1keys = document.getElementById('player1').getElementsByTagName('button');
  const p2keys = document.getElementById('player2').getElementsByTagName('button');

  // console.log(p1keys.getElementsByTagName('button')[0]);

  for (let i = 0; i < p1keys.length; i++) {
    console.log(p1keys[i].getAttribute('data-direction'));
    console.log(p1keys[i]);
    p1keys[i].addEventListener('click', function () {
      move('player1', p1keys[i].getAttribute('data-direction'));
    });
  }

  for (let i = 0; i < p2keys.length; i++) {
    console.log(p2keys[i].getAttribute('data-direction'));
    console.log(p2keys[i]);
    p2keys[i].addEventListener('click', function () {
      move('player2', p2keys[i].getAttribute('data-direction'));
    });
  }

  const board = document.getElementsByTagName('td');
  for (let i = 0; i < board.length; i++) {
    board[i].innerHTML = ('<img id="tile" src="img/tile.png" alt="tile"/>');
    if (board[i].getAttribute('data-x') === '0' && board[i].getAttribute('data-y') === '0') {
      board[i].innerHTML = ('<img id="sprite-dino" src="img/dino.png" alt="dino"/>');
    }
    if (board[i].getAttribute('data-x') === '7' && board[i].getAttribute('data-y') === '7') {
      board[i].innerHTML = ('<img id="sprite-santa" src="img/santa.png" alt="santa"/>');
    }
  }
  document.addEventListener('keypress', function (e) {
    if (e.key === 'w') {
      move('player1', 'up');
      console.log('player1 move up');
    } else if (e.key === 'a') {
      move('player1', 'left');
      console.log('player1 move left');
    } else if (e.key === 's') {
      move('player1', 'down');
      console.log('player1 move down');
    } else if (e.key === 'd') {
      move('player1', 'right');
      console.log('player1 move right');
    } else if (e.key === 'i') {
      move('player2', 'up');
      console.log('player2 move up');
    } else if (e.key === 'j') {
      move('player2', 'left');
      console.log('player2 move left');
    } else if (e.key === 'k') {
      move('player2', 'down');
      console.log('player2 move down');
    } else if (e.key === 'l') {
      move('player2', 'right');
      console.log('player2 move right');
    }
  });
}

function move (player, direction) {
  // const cells = grid.getElementsByTagName('td');

  let oldx = 0;
  let oldy = 0;

  if (player === 'player1') {
    oldx = p1.x;
    oldy = p1.y;
  }
  if (player === 'player2') {
    oldx = p2.x;
    oldy = p2.y;
  }

  let newx = oldx;
  let newy = oldy;

  if (direction === 'down') {
    newy += 1;
  }
  if (direction === 'up') {
    newy -= 1;
  }
  if (direction === 'left') {
    newx -= 1;
  }
  if (direction === 'right') {
    newx += 1;
  }

  if (legalMove(newx, newy)) {
    replace('hi', oldx, oldy);
    replace(player, newx, newy);
    if (player === 'player1') {
      p1.x = newx;
      p1.y = newy;
    }
    if (player === 'player2') {
      p2.x = newx;
      p2.y = newy;
    }
  }
}

function legalMove (newx, newy) {
  return !((p1.x === newx && p1.y === newy) || (p2.x === newx && p2.y === newy) ||
          newx < 0 || newx > 7 || newy < 0 || newy > 7);
}

function replace (type, x, y) {
  let toReplace = ('<img id="tile" src="img/tile.png" alt="tile"/>');
  if (type === 'player1') {
    toReplace = ('<img id="sprite-dino" src="img/dino.png" alt="dino"/>');
  }
  if (type === 'player2') {
    toReplace = ('<img id="sprite-santa" src="img/santa.png" alt="santa"/>');
  }

  const board = document.getElementsByTagName('td');
  for (let i = 0; i < board.length; i++) {
    if (board[i].getAttribute('data-x') === x.toString(10) && board[i].getAttribute('data-y') === y.toString(10)) {
      console.log('yes');
      board[i].innerHTML = toReplace;
    }
  }
}
