const gridWrapper = document.querySelector('.grid-wrapper');
const clearButton = document.querySelector('#clear-button');
const gridSlider = document.getElementById('slider');
const colorWheel = document.getElementById('colorpicker');
const sliderLabel = document.getElementById('slider-label');
let mouseDown = false;
let mouseUp = true;
let colorMode = true;
let randomMode = false;
let color = colorWheel.value;
let gridCells = 16;

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

document.addEventListener('mousemove', mouseEnterGrid);
document.addEventListener('mousedown', handleMouseDown);
document.addEventListener('mouseup', handleMouseUp);

function handleMouseUp() {
    mouseUp = true;
    mouseDown = false;
}

function handleMouseDown() {
    mouseDown = true;
    mouseUp = false;
}

function mouseEnterGrid(e) {
    if (mouseDown) {
        e.target.style.backgroundColor = color;
    }
}

// Function to create grid dynamically
function createGrid() {
    gridWrapper.style.gridTemplateColumns = `repeat(${gridCells}, 1fr)`;
    gridWrapper.style.gridTemplateRows = `repeat(${gridCells}, 1fr)`;
    for (let i = 0; i < gridCells*gridCells; i++) {
        let cell = document.createElement('div');
        cell.classList.add('grid-cell');
        cell.style.width = (gridWrapper.width / gridCells);
        cell.style.height = cell.style.width;
        gridWrapper.appendChild(cell);
        cell.addEventListener('mouseover', changeColor);
    }
}

function changeColor(e) {
    e.target.style.backgroundColor = color;
}

function clearGrid() {
    const cells = document.querySelectorAll('.grid-cell');
    cells.forEach(cell => {
        cell.style.backgroundColor = '';
    });
}

createGrid();