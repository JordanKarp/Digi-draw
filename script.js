const DEFAULT_COLOR = 'rgb(0,0,0)'
const DEFAULT_SIZE = 16

let currentColor = DEFAULT_COLOR
let currentSize = DEFAULT_SIZE

const previewSquare = document.getElementById('previewSquare')

const redSlider = document.getElementById('rgbSliderR')
const redValue = document.getElementById('redValue')
const greenSlider = document.getElementById('rgbSliderG')
const greenValue = document.getElementById('greenValue')
const blueSlider = document.getElementById('rgbSliderB')
const blueValue = document.getElementById('blueValue')
const sizeSlider = document.getElementById('sizeSlider')
const sizeValue = document.getElementById('sizeValue')

const gridBtn = document.getElementById('gridBtn')
const clearBtn = document.getElementById('clearBtn')
const resetBtn = document.getElementById('resetBtn')

const grid = document.getElementById('grid')

redSlider.onchange = () => setColor()
redSlider.onmousemove = (e) => updateRedValue(e.target.value)
greenSlider.onchange = () => setColor()
greenSlider.onmousemove = (e) => updateGreenValue(e.target.value)
blueSlider.onchange = () => setColor()
blueSlider.onmousemove = (e) => updateBlueValue(e.target.value)
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value)
sizeSlider.onchange = (e) => changeSize(e.target.value)
gridBtn.onclick = () => toggleGridColor()
clearBtn.onclick = () => reloadGrid(currentSize)
resetBtn.onclick = () => reset(currentSize)


let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)


function setColor() {
    currentColor = `rgb(${redSlider.value}, ${greenSlider.value}, ${blueSlider.value})`
    previewSquare.style.backgroundColor = currentColor
}

function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) {
        return
    }
    e.target.style.backgroundColor = currentColor
}

function updateRedValue(value) {
    redValue.innerText = value;
}

function updateGreenValue(value) {
    greenValue.innerText = value;
}

function updateBlueValue(value) {
    blueValue.innerText = value;
}


function changeSize(value) {
    currentSize = value
    updateSizeValue(value)
    reloadGrid(value)
}

function updateSizeValue(value) {
    sizeValue.innerText = value
}

function reset(size) {
    redSlider.value = 0
    greenSlider.value = 0
    blueSlider.value = 0
    sizeSlider.style.accentColor = 'rgb(0,0,0)'
    reloadGrid(size)
}

function toggleGridColor(){
    const r = document.querySelector(':root');
    if (gridBtn.checked) {
        r.style.setProperty('--grid-color', 'grey')
    } else {
        r.style.setProperty('--grid-color', 'white')
    }
}

function reloadGrid(size) {
    clearGrid()
    setupGrid(size)
}

function clearGrid() {
    grid.innerHTML = ''
}

function setupGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`

    for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div')
        square.classList.add('square')
        square.addEventListener('mouseover', changeColor)
        square.addEventListener('mousedown', changeColor)
        grid.appendChild(square)
    }
}

window.onload = () => {
    setupGrid(currentSize)
}