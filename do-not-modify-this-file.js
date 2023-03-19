// setting default game in current.game
// object because i need reference type
// I had to add a bolean state flag to the dropdown menu, not to multiply them when reinitialising the game
const current = {
  game:'{"size":4,"s":{"s1":"a1","s2":"c4"}}',
  // isDropDownAdded: false,
};
// currentGame parameter will keep the state of the game
// it is needed by reset not to create a gobal board varibale
// i used default function function parameter so when ever initGame called it will have the current.game
// changed to expression
const initGame = function(currentGame = current.game) {
  // I inserted selectGame here to start the page with a default game
  // In gameState I save the currentGame and the board to pass the other functions what are called by eventListeners like reserGame
  // could not manage to declare this object with const...
  let gameState = selectGame(currentGame);
  const resetButton = document.querySelector('#reset');
  // I removed eventListeners because of multiple calling of initGame
  // resetButton.removeEventListener('click', resetGame);
  // I useing a clusure to pass gameState to resetGame callback function as an argument
  resetButton.addEventListener('click', () => resetGame(gameState));
  // I took out aiShoot function's content from here, and put it in index.js
  const aiShootButton = document.querySelector('#aiShoot');
  // I removed eventListeners because of multiple calling of initGame
  // aiShootButton.removeEventListener('click', () => aiShoot);
  aiShootButton.addEventListener('click', () => aiShoot);
  // if (!current.isDropDownAdded) {
  for (const gameNumber in data) {
    document.getElementById('mode').insertAdjacentHTML('beforeend', `
      <option value=${data[gameNumber]}>${gameNumber}</option>
    `);
  }
  //   current.isDropDownAdded = true;
  // }
  // I hand to raise a separate function for the next eventListeners callback
  const selectGameCallback = (e) => {
    // updating current.game

    current.game = e.target.value;
    // I had to reassign this object
    gameState = selectGame(e.target.value);
    //added
    return gameState;
  };
  const modeDropDown = document.querySelector('.mode > select');
  // I removed eventListeners because of multiple calling of initGame
  // modeDropDown.removeEventListener('input', selectGameCallback);
  modeDropDown.addEventListener('input', selectGameCallback);
  //added
  return gameState;
};

function displayBoard(data) {
  const grid = data.board;
  const containerElement = document.querySelector(`.container${data.boardnumber}`);
  containerElement.innerHTML = '';
  containerElement.insertAdjacentHTML('afterbegin', creatHeadRow(grid.length));
  for (let x = 0; x < grid.length; x++) {
    const rowElement = document.createElement('div');
    rowElement.classList.add('row');
    rowElement.insertAdjacentHTML(
      'afterbegin',
      `<div class="head-cell" style='heigth: ${90 / (grid.length + 1)}vh; width: 3vh'>${String.fromCharCode(65 + x)}</div>`,
    );
    for (let y = 0; y < grid[x].length; y++) {
      const cellElement = document.createElement('div');
      cellElement.classList.add('cell');
      cellElement.innerHTML = grid[x][y];
      cellElement.style.width = `${80 / (grid[x].length + 1)}vh`;
      cellElement.style.height = `${80 / (grid[x].length + 1)}vh`;
      cellElement.style.fontSize = `${(80 / (grid[x].length + 1)) - 5}vh`;
      cellElement.dataset.x = String.fromCharCode(65 + x);
      // Added one to be consistent with the coordinates
      cellElement.dataset.y = y + 1;
      cellElement.addEventListener('click', (e) => {
        handleClick({
          x: cellElement.dataset.x,
          y: cellElement.dataset.y,
          clickType: 'left',
          //added
          gameState: data,
        });
      });
      cellElement.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        handleClick({
          x: cellElement.dataset.x,
          y: cellElement.dataset.y,
          clickType: 'right',
          //added
          gameState: data,
        });
      });
      rowElement.appendChild(cellElement);
    }
    containerElement.appendChild(rowElement);
  }
}

function creatHeadRow(length) {
  let result = `<div class='head-row'><div style='width: ${80 / (length + 1)}vh'></div>`;
  for (let i = 1; i <= length; i++) {
    result += `<div class="head-cell" style='width: ${80 / (length + 1)}vh'>${i}</div>`;
  }
  return `${result  }</div>`;
}

function displayMessage(message, color) {
  document.getElementById('display').style.color = color;
  document.getElementById('display').innerHTML = message;
}

function displayTextMessage(message, color) {
  document.getElementById('textDisplay').style.color = color;
  document.getElementById('textDisplay').innerHTML = message;
}

window.addEventListener('load', () => {
  // default game will be called because of the initGame function default value
  initGame();
  // TODO: I made the dropdown default value match the default game's cue number
  document.querySelector('#mode > option:nth-child(1)').removeAttribute('selected');
  document.querySelector('#mode > option:nth-child(2)').setAttribute('selected', 'true');
});

