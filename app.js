const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let move = 0;
let points1 = 0;
let points2 = 0;

let c1 = document.getElementById('1');
let c2 = document.getElementById('2');
let c3 = document.getElementById('3');
let c4 = document.getElementById('4');
let c5 = document.getElementById('5');
let c6 = document.getElementById('6');
let c7 = document.getElementById('7');
let c8 = document.getElementById('8');
let c9 = document.getElementById('9');

const winCombos = [
    [c1, c2, c3],
    [c4, c5, c6],
    [c7, c8, c9],
    [c1, c5, c9],
    [c3, c5, c7],
    [c1, c4, c7],
    [c2, c5, c8],
    [c3, c6, c9]
];

//Cycles thru all the cells & adds click event
cells.forEach(function(cell) {
    cell.addEventListener('click', cellClicked);

});

//Checks for blank cell
//Increases move with every click
function cellClicked(e) {
    if (e.target.textContent == " ") {
        e.target.textContent = currentPlayer;
        move++;

        //After every click I call these functions
        checkWin();
        switchPlayer();
        computerMove();
        draw();
    }  
};

//Switches between player symbols
function switchPlayer() {
    if(currentPlayer == 'O') {
        currentPlayer = 'X';
    } else {
        currentPlayer = 'O';
    }
}

//Computer player move
function computerMove() {
    let emptyCells = [];
    let random;

    //Looks for all empty cells then adds them to emptyCells array
    cells.forEach(function(cell){
      if (cell.textContent == " ") {
        emptyCells.push(cell);
      }
    });

    //Computer marks a random empty cell
    random = Math.ceil(Math.random() * emptyCells.length) - 1;
    emptyCells[random].textContent = currentPlayer;
    move++;
    checkWin();
    switchPlayer();
    draw();
};

//Checks for winning conditions
function checkWin() {
    //Iterates thru winCombos array
    for (var i = 0; i < winCombos.length; i++) {
        let counter = 0;
        let wins = winCombos[i].length;
        //Iterates thru possible wins in the winCombos array
        for (var j = 0; j < wins; j++) {
            let winCell = winCombos[i][j].textContent;
            if (winCell == currentPlayer) {
                counter++;
                if (counter == 3) {
                    //Increases player score, resets move, & resets game
                    if (currentPlayer == 'X'){
                        points1++
                        document.getElementById("player1").innerHTML = points1;
                        resetMove();
                        reset();
                    } else {
                        points2++
                        document.getElementById("player2").innerHTML = points2;
                        resetMove();
                        reset();
                    }
                }
            }
        }
    }
};

//Resets move to 0 after a win
function resetMove() {
    move = 0;
};

//Resets game & moves after draw
function draw() {
    if(move == 9) {
        reset();
        resetMove();
        alert('Draw Game');
    }
};

//Resets game board to blank
function reset() {
    for (var i = 0; i < cells.length; i++) {
        cells[i].textContent = " "; 
    }
};