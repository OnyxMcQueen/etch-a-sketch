const gridContainer = document.querySelector('#container');
const resetButton = document.querySelector('#reset-button');

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

// Run the function after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  generateGrid();
});

// Add event listener to the container to listen for mouseover movements on the squares
gridContainer.addEventListener('mouseover', (e) => {
  if(e.target.classList.contains('square') && e.target.style.backgroundColor === ''){
    e.target.style.backgroundColor = rgbGenerator();
  }
})
// Event listener for reset button, to reset all square colors
resetButton.addEventListener('click', (e) => {
  resetGridColor();
})