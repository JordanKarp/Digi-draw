const DEFAULT_COLOR = 'rgb(0,0,0)'
const DEFAULT_SIZE = 16

let currentColor = DEFAULT_COLOR
let currentSize = DEFAULT_SIZE

const redSlider = document.getElementById('rgbSliderR')
const greenSlider = document.getElementById('rgbSliderG')
const blueSlider = document.getElementById('rgbSliderB')
const clearBtn = document.getElementById('clearBtn')
const resetBtn = document.getElementById('resetBtn')
const sizeSlider = document.getElementById('sizeSlider')
const sizeValue = document.getElementById('sizeValue')
const grid = document.getElementById('grid')

redSlider.onchange = () => setColor()
greenSlider.onchange = () => setColor()
blueSlider.onchange = () => setColor()
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value)
sizeSlider.onchange = (e) => changeSize(e.target.value)
clearBtn.onclick = () => reloadGrid(currentSize)
resetBtn.onclick = () => reset(currentSize)


let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)


function setColor() {
    currentColor = `rgb(${redSlider.value}, ${greenSlider.value}, ${blueSlider.value})`
    sizeSlider.style.accentColor = currentColor
}

function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) {
        return
    }
    e.target.style.backgroundColor = currentColor
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