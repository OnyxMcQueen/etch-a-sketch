function generateGrid(sizeofOneSide = 16){
  const gridContainer = document.querySelector('#container');

  const amountOfSquares = sizeofOneSide * sizeofOneSide;
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

// Run the function after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  generateGrid();
});