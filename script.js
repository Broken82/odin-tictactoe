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

    let moveCount = 0
    

    function play(player){
        const cords = prompt('Tell me coordinates! x,y: ')

        const [x,y] = cords.split(',');

        if(gameboard.board[x][y] === 'X' || gameboard.board[x][y] === 'O'){
            return console.log('Its taken!');
        }
        gameboard.board[x][y] = player.sign;
        console.log(`${player.name} has placed ${player.sign}`);
        moveCount = moveCount + 1;

        //print board
        console.log(gameboard)


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

        return {play}
}

const gameBoard = createGameboard();
const player1 = createPlayer('Szefa', 'X');
const player2 = createPlayer('Xana', 'O');
const game = createGame(gameBoard);