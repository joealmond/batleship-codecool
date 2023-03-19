/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */

function selectGame(data) {
  data = JSON.parse(data);
  const currentGame = data;
  const board = generateBoard(data);
  place(currentGame.s, board, 'ship');
  displayBoard({boardnumber: 1, board: board});
  displayBoard({boardnumber: 2, board: board});
  displayMessage(JSON.stringify(data), 'black');
  return {board: board, currentGame: currentGame};
}

function handleClick(data) {
  // console.log(data.gameState)
  displayMessage(data.x + data.y + data.clickType);
  const dataCoordToObj = {s1:`${data.x.toLowerCase()}${data.y}`};
  place(dataCoordToObj, data.gameState.board, 'shoot');
  displayBoard({boardnumber: 1, board: data.gameState.board});
  displayBoard({boardnumber: 2, board: data.gameState.board});
}

function resetGame(gameState) {
  for (let i = 0; i < gameState.board.length; i++) {
    for (let k = 0; k < gameState.board[i].length; k++) {
      gameState.board[i][k] = '';
    }
  }
  displayBoard({boardnumber: 1, board: gameState.board});
  displayBoard({boardnumber: 2, board: gameState.board});
  selectGame(JSON.stringify(gameState.currentGame));
}

function generateBoard(data) {
  const board = Array(data.size).fill().map(() => Array(data.size).fill(''));
  return board;
}

function place(coordObj, board, item) {
  if (item === 'ship') item = 'S';
  if (item === 'shoot') item = 'X';
  // const shipTextCoords = [];
  for (const shipTextCoord in coordObj) {
    if (Object.hasOwnProperty.call(coordObj, shipTextCoord)) {
      if (coordObj[shipTextCoord].length <= 2) {
        // shipTextCoords.push(convertCoords(coordObj[shipTextCoord]));
        const [x, y] = convertCoords(coordObj[shipTextCoord]);
        board[x][y] = item;
      } else {
        for (let i = 0; i < coordObj[shipTextCoord].length; i += 2) {
          // shipTextCoords.push(convertCoords(coordObj[shipTextCoord].substr(i, 2)));
          const [x, y] = convertCoords(coordObj[shipTextCoord].substr(i, 2));
          board[x][y] = item;
        }
      }
    }
  }
}

function convertCoords(textCoords) {
  textCoords = textCoords.split('');
  const x = textCoords[0].charCodeAt(0) - 97;
  const y = textCoords[1] - 1;
  return [x, y];
}

function changePhase() {
}

function playerSoot() {
}

function aiShoot(data) {
  // x: String.fromCharCode(Math.floor(Math.random() * board.length + 65)),
  // y: Math.floor(Math.random() * board.length + 1),
}


displayMessage('message', 'green');
displayTextMessage('text message', 'red');
