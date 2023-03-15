let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";


const cells = document.querySelectorAll(".cell ");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restart");
const condizioniVittoria = [
    [0, 1, 2] ,
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

initializeGame();

function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    
    running = true;
}

function setHover(){
    cells.forEach((cell)=>{
        cell.classList.remove("x");
        cell.classList.remove("o")
    });

}


function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] != "" || !running){
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}
function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}
function cambioGiocatori(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `TURNO ${currentPlayer}`;
}
function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < condizioniVittoria.length; i++){
        const condition = condizioniVittoria[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        statusText.textContent = `VITTORIA!`;
        running = false;
    }
    else if(!options.includes("")){
        statusText.textContent = `PATTA!`;
        running = false;
    }
    else{
        cambioGiocatori();
    }
}
function restartGame(){
    if(currentPlayer = "X"){
        running = true;
    }else
        running = false;
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}`;
    cells.forEach(cell => cell.textContent = "");
   
}
