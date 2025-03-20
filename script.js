const container = document.querySelector(".container");

let gridSize = 16;

let gridColor = 'black';

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

        if(gridColor == 'black'){
            cell.addEventListener("mouseover", changeToBlack);
        }
        else{
            cell.addEventListener("mouseover", changeColor);
        }
    }
}

function getRGBNumber(max) {
    return Math.floor(Math.random() * max);
  }
  
function changeColor(event) {
    let red = getRGBNumber(255)
    let green = getRGBNumber(255)
    let blue = getRGBNumber(255)

    event.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`


    /*event.target.style.backgroundColor = "black";*/
}

function changeToBlack(event) {
    let cell = event.target;
    let currentColor = cell.style.backgroundColor;

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


function resetGrid(){
    let cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.style.backgroundColor = "white";
    });
}

function promptGridSize(){
    gridSize = prompt("Input the size of the grid (max: 100)")
    if (gridSize < 1 || gridSize > 100){
        alert("Please enter a number between 1 and 100.");
    }
    else{
        createGrid(gridSize)
    }
}

function createBlackGrid(){
    gridColor = 'black'
    createGrid(gridSize);
}

function createMultiGrid(){
    gridColor = 'multi'
    createGrid(gridSize);
}



createGrid(gridSize);


document.getElementById("reset").addEventListener("click", resetGrid);

document.getElementById("btn-size").addEventListener("click", promptGridSize);

document.getElementById("multi").addEventListener("click", ()=> createMultiGrid(gridSize));
document.getElementById("black").addEventListener("click", ()=> createBlackGrid(gridSize));


