const gridWrapper = document.querySelector('.grid-wrapper'); // Wrapper for the grid cells
const clearButton = document.querySelector('#clear-button'); // Button used to return all colors to default value
const gridSlider = document.getElementById('slider'); // Slider which determines size of grid
const colorWheel = document.getElementById('colorpicker'); // Color picker for different colors
const sliderLabel = document.getElementById('slider-label'); // Slider label that displays the current slider value
const colorButton = document.getElementById('color-mode-button'); // Button to select color mode
const eraser = document.getElementById('eraser-button'); // button to select eraser mode
const randomButton = document.getElementById('random-mode-button'); // button to select random mode
let mouseDown = false; // Left-click is pressed
let mouseUp = true; // Left-click is not pressed
let drawMode = 'color'; // different drawing modes
let color = colorWheel.value; // Currently selected color from color wheel
let gridCells = 16; // Number of grid cells to divide the grid into
// Tracks the previous cell, prevents colours being drawn to the same cell
// multiple times if cell size is large
let prevCell = 0;  // I can initlize to 0 which signifies no prev cell


// Set event listeners for all different modes of drawing
colorButton.addEventListener('click', () => changeColor('color'));
randomButton.addEventListener('click', () => changeColor('random'));
eraser.addEventListener('click', () => changeColor('erase'));

// Changes drawing mode and resets prevCell so that square can be selected again
function changeColor(newMode) {
    drawMode = newMode;
    prevCell = 0;
}

// Event listener for the slider to change grid size
gridSlider.addEventListener('input', () => {
    gridCells = gridSlider.value;
    console.log(gridCells);
    clearGrid();
    createGrid();
    sliderLabel.textContent = `${gridCells} x ${gridCells}`;
});

clearButton.addEventListener('click', clearGrid);

// Event listener for the slider to change color of grid
colorWheel.addEventListener('input', () => {
    color = colorWheel.value;
});

// Event listener is added for document because
// I should be able to click outside the grid and 
// move into the grid and it should still work

// Detects whether mouse is moving
document.addEventListener('mousemove', mouseEnterGrid);
// Detects whether mouse is down
document.addEventListener('mousedown', handleMouseDown);
// Detects whether mouse is up
document.addEventListener('mouseup', handleMouseUp);

// Handles the logic of Mouse up
function handleMouseUp() {
    mouseUp = true;
    mouseDown = false;
}

// Handles the logic of Mouse down
function handleMouseDown() {
    mouseDown = true;
    mouseUp = false;
}

// This function ensures that the mouse can be moved into
// the grid from outside and it should still color
function mouseEnterGrid(e) {
    if (mouseDown) {
        if (e.target.classList.contains('grid-cell') && e.target != prevCell) {
            if (drawMode == 'color') {
                e.target.style.backgroundColor = color;
            } else if (drawMode == 'erase') {
                e.target.style.backgroundColor = '';
            } else if (drawMode == 'random') {
                e.target.style.backgroundColor = '#'+Math.floor(Math.random()*0xffffff).toString(16);
            }

            prevCell = e.target;
        } 
    }
}

// Function to create grid dynamically
function createGrid() {
    // These 2 lines use "grid" mode in CSS which is specifically designed
    // to handle these type of 2 dimensional grids

    // `repeat(${gridCells}, 1fr)` 
    // Generates a CSS Grid `repeat` function string that will create a grid
    // with `gridCells` number of equally sized columns or rows. 
    gridWrapper.style.gridTemplateColumns = `repeat(${gridCells}, 1fr)`;
    gridWrapper.style.gridTemplateRows = `repeat(${gridCells}, 1fr)`;
    for (let i = 0; i < gridCells*gridCells; i++) {
        let cell = document.createElement('div');
        cell.classList.add('grid-cell');
        cell.style.width = (gridWrapper.width / gridCells);
        cell.style.height = cell.style.width;
        gridWrapper.appendChild(cell);
    }
}

function clearGrid() {
    const cells = document.querySelectorAll('.grid-cell');
    cells.forEach(cell => {
        cell.style.backgroundColor = '';
    });
}

// Prevents dragging on the whole document
document.addEventListener('dragstart', function (event) {
    event.preventDefault();
});

createGrid();