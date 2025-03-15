function createGameboard(){
    let board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    return {board}


}

function createPlayer(name, sign){
    return {name, sign}
}

function createGame(gameboard){

    let moveCount = 0;


    

    function play(player, cords){

        const [x,y] = cords.split('-');

        if(gameboard.board[x][y] === 'X' || gameboard.board[x][y] === 'O'){
            return console.log('Its taken!');
        }
        gameboard.board[x][y] = player.sign;
        console.log(`${player.name} has placed ${player.sign}`);
        moveCount = moveCount + 1;

        //print board
        console.log(gameboard)

        renderBoard(cords, player.sign)




        if(moveCount >= 5){
            checkVictory(player, x, y);
        }

    }

    function checkVictory(player, x, y){

        console.log('checking victory')
        let gameboardSize = gameboard.board.length;


        //check columns
        for(let i = 0; i < gameboardSize; i++){
            console.log('checking columns...')
            if(gameboard.board[x][i] != player.sign){
                break;
            }
            if(i == gameboardSize - 1){
                console.log(`${player.name} has won!`);
            }
        }

        //check rows
        for(let i = 0; i < gameboardSize; i++){
            console.log('checking rows for ' + player.sign)
            if(gameboard.board[i][y] != player.sign){
                break
            }
            if(i == gameboardSize - 1){
                console.log(`${player.name} has won!`);
            }

        }

        //check diagnolas

        for(let i = 0; i < gameboardSize; i++){
            console.log('checking diagnolas for ' + player.sign)
            if(gameboard.board[i][i] != player.sign) {
                break
            }
            if(i == gameboardSize - 1){
                console.log(`${player.name} has won!`);
            }
        }

        //check antidiagnolas

        for(let i = 0; i < gameboardSize; i++){
            console.log('checking anti-diagnolas for ' + player.sign)
            if(gameboard.board[i][gameboardSize - 1 - i] != player.sign) {
                break
            }
            if(i == gameboardSize - 1){
                console.log(`${player.name} has won!`);
            }
        }

    }

    function renderBoard(cords, sign){
        const gridElement = document.querySelector(`[id='${cords}']`);
        gridElement.innerHTML = sign;
    }

        return {play}
}

const gameBoard = createGameboard();
const player1 = createPlayer('Szefa', 'X');
const player2 = createPlayer('Xana', 'O');
const game = createGame(gameBoard);
let currentPlayer = player1;

const gridButtons = document.querySelectorAll('.grid-element')
gridButtons.forEach(grid => {
    grid.addEventListener('click', (e) =>{
        game.play(currentPlayer, grid.id)
        currentPlayer = currentPlayer == player1 ? player2 : player1;
    })
    
});