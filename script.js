const container = document.querySelector(".container");

let gridSize = 16;
let lastColor = 'black';
let isPainting = false;

function createGrid(size) {
    container.innerHTML = ''; 
    let squareSize = 400 / size;
    let widthSize = 560/size;
    for (let i = 0; i < size * size; i++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        container.appendChild(cell);
        cell.style.width = `${widthSize}px`;
        cell.style.height = `${squareSize}px`;
    }

    if(lastColor === 'black'){
        createBlackGrid()
    }
    else if (lastColor === 'multi'){
        createMultiGrid()
    }
    else if (lastColor === 'white'){
        erasingGrid()
    }
}

function getRGBNumber(max) {
    return Math.floor(Math.random() * max);
  }
  
function changeColor(event) {
    if (isPainting == true){
        let red = getRGBNumber(255)
        let green = getRGBNumber(255)
        let blue = getRGBNumber(255)
    
        event.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`
    }
}

function changeToBlack(event) {
    let cell = event.target;
    let currentColor = cell.style.backgroundColor;

    if (isPainting == true){
        if (!currentColor || currentColor === "white") {
            // If it's the first hover, start at 10% darkness
            cell.style.backgroundColor = `rgba(0, 0, 0, 0.1)`;
        } else {
            // Extract RGBA values from the current color
            let rgbaMatch = currentColor.match(/rgba?\((\d+), (\d+), (\d+), ([\d.]+)\)/);

            if (rgbaMatch) {
                let currentOpacity = parseFloat(rgbaMatch[4]); // Get the current opacity

                // Increase opacity by 10% but cap at 1.0 (fully black)
                let newOpacity = Math.min(currentOpacity + 0.1, 1.0);

                // Apply the new darker color
                cell.style.backgroundColor = `rgba(0, 0, 0, ${newOpacity})`;
            }
        }
    }

}


function changeToWhite(event) {
    event.target.style.backgroundColor = 'white'
}

function resetGrid(){
    let cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.style.backgroundColor = "white";
    });
}

function promptGridSize(){
    const newSize = prompt("Input the size of the grid (max: 100)")
    if (newSize < 1 || newSize > 100){
        alert("Please enter a number between 1 and 100.");
    }
    else{
        gridSize = newSize
        createGrid(gridSize)
    }
}

function createBlackGrid(){
    for (let child of container.children) {
        child.removeEventListener("mouseover", changeToWhite);
        child.removeEventListener("mouseover", changeColor);

        child.addEventListener("mouseover", changeToBlack)
    }
    lastColor = 'black';
}

function createMultiGrid(){
    for (let child of container.children) {
        child.removeEventListener("mouseover", changeToWhite);
        child.removeEventListener("mouseover", changeToBlack);

        child.addEventListener("mouseover", changeColor)
    }
    lastColor = 'multi';
}

function erasingGrid(){
    for (let child of container.children) {
        child.removeEventListener("mouseover", changeToBlack);
        child.removeEventListener("mouseover", changeColor);

        child.addEventListener("mouseover", changeToWhite)
    }
   lastColor = 'white'
}


createGrid(gridSize);


container.addEventListener("mousedown", () => isPainting = true);
container.addEventListener("mouseup", () => isPainting = false);

document.getElementById("reset").addEventListener("click", resetGrid);

document.getElementById("btn-size").addEventListener("click", promptGridSize);

document.getElementById("multi").addEventListener("click", ()=> createMultiGrid());
document.getElementById("black").addEventListener("click", ()=> createBlackGrid());
document.getElementById("eraser").addEventListener("click", ()=> erasingGrid());


