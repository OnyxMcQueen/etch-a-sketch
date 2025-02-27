const gridContainer = document.querySelector('#container');
const resetButton = document.querySelector('#reset-button');
const changeGridSizeButton = document.querySelector('#change-size-button');

let isMousePressed;

function generateGrid(sizeofOneSide = 16){

  const amountOfSquares = sizeofOneSide * sizeofOneSide;
  // 956 represents the pixels of content area the grid has, due to border-box the borders take 4px, 
  // which is why the content area we actually have is 956.
  const squareSize = calculateSizeOfSquare(sizeofOneSide, 956);

  for(let i = 1; i <= amountOfSquares; i++){
    let square = document.createElement('div');
    square.classList.add('square');
    square.style.height = `${squareSize}px`;
    square.style.width = `${squareSize}px`;

    gridContainer.appendChild(square);
  }
}

function calculateSizeOfSquare(amountPerOneSide, containerWidth){
  return containerWidth / amountPerOneSide;
}

function rgbGenerator(){
  let rgbValues = [];

  for(let i = 1; i <= 3; i++){
    rgbValues.push(Math.floor(Math.random() * 256));
  }
  return `rgb(${rgbValues.join(',')})`;
}

function resetGridColor() {
  const allSquares = document.querySelectorAll('.square');

  allSquares.forEach((square) => {
    square.style.backgroundColor = '';
  })
}

function clearGrid(){
  gridContainer.innerHTML = '';
}

function validateUserInput(input){
  if(input === ''){
    return false;
  }

  if(!isNaN(input) && (input >= 2 && input <= 100)){
    return true;
  } else {
    return false;
  }
}

function isItNull(userInput){
  if(userInput === null){
    return true;
  } else {
    return false;
  }
}

// Run the function after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  generateGrid();
});

// When the user clicks the mouse and holds it will start coloring.
gridContainer.addEventListener('mousedown', (e) => {
  if(e.button === 0){
    e.preventDefault();
    isMousePressed = true;
    if(e.target.classList.contains('square') && e.target.style.backgroundColor === ''){
      e.target.style.backgroundColor = rgbGenerator();
    }
  }
})

// Add event listener to the container to listen for mouseover movements on the squares
gridContainer.addEventListener('mouseover', (e) => {
  if(isMousePressed){
    if(e.target.classList.contains('square') && e.target.style.backgroundColor === ''){
      e.target.style.backgroundColor = rgbGenerator();
    }
  }
})

// Ensure that when the user releases the mouse button, it will stop coloring squares. 
// Even if released outside grid.
document.addEventListener('mouseup', (e) => {
  isMousePressed = false;
})

// Event listener for reset button, to reset all square colors
resetButton.addEventListener('click', (e) => {
  resetGridColor();
})

// Event listener to prompt user for customizable grid size
changeGridSizeButton.addEventListener('click', (e) => {
  let userInput = prompt('How many tiles should be in each row/column of the grid? (2–100)');

  if(isItNull(userInput)){
    return;
  }

  userInput = Number(userInput);

  if(validateUserInput(userInput)){
    clearGrid();
    generateGrid(userInput);
  } else {
    let retryAttempt = prompt('How many tiles should be in each row/column of the grid? (2–100)');

    if(isItNull(retryAttempt)){
      return;
    }

    retryAttempt = Number(retryAttempt);

    while(!validateUserInput(retryAttempt)){
      retryAttempt = prompt('How many tiles should be in each row/column of the grid? (2–100)');

      if(isItNull(retryAttempt)){
        return;
      }

      retryAttempt = Number(retryAttempt); 
    }

    clearGrid();
    generateGrid(retryAttempt);
  }

})