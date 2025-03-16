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

function createGame(gameboard, player1, player2){

    let moveCount = 0;
    let currentPlayer = player1;


    

    function play(player, cords){

        const [x,y] = cords.split('-');

        if(gameboard.board[x][y] === 'X' || gameboard.board[x][y] === 'O'){
            currentPlayer = player
            return console.log('Its taken!');
        }
        gameboard.board[x][y] = player.sign;
        console.log(`${player.name} has placed ${player.sign}`);
        moveCount = moveCount + 1;

        //print board
        console.log(gameboard)
        //change player
        currentPlayer = currentPlayer == player1 ? player2 : player1;
        console.log('rendering board')
        renderBoard(cords, player)
        console.log('board rendered')


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
                alert(`${player.name} has won!`);
                reload();
            }
        }

        //check rows
        for(let i = 0; i < gameboardSize; i++){
            console.log('checking rows for ' + player.sign)
            if(gameboard.board[i][y] != player.sign){
                break
            }
            if(i == gameboardSize - 1){
                alert(`${player.name} has won!`);
                reload();
            }

        }

        //check diagnolas

        for(let i = 0; i < gameboardSize; i++){
            console.log('checking diagnolas for ' + player.sign)
            if(gameboard.board[i][i] != player.sign) {
                break
            }
            if(i == gameboardSize - 1){
                alert(`${player.name} has won!`);
                reload();
            }
        }

        //check antidiagnolas

        for(let i = 0; i < gameboardSize; i++){
            console.log('checking anti-diagnolas for ' + player.sign)
            if(gameboard.board[i][gameboardSize - 1 - i] != player.sign) {
                break
            }
            if(i == gameboardSize - 1){
                alert(`${player.name} has won!`);
                reload();
            }
        }

        //check tie
        let length = 0
        for (let i = 0; i < gameboardSize; i++) {
            for (let j = 0; j < gameboardSize; j++) {
                if(gameboard.board[i][j] == 'X' || gameboard.board[i][j] == 'O'){
                    length++
                }
                if(length == gameboardSize * gameboardSize){
                    alert('Its a tie!');
                    reload();
                }
                
            }
            
        }

    }

    function renderBoard(cords, player){
        const gridElement = document.querySelector(`[id='${cords}']`);
        gridElement.innerHTML = player.sign;

       document.querySelector('h2').innerHTML = `${currentPlayer.sign}'s turn`
    }

    function registerEventListener(){
        console.log('Game started')
        const gridButtons = document.querySelectorAll('.grid-element')
            gridButtons.forEach(grid => {
                grid.addEventListener('click', (e) =>{
                play(currentPlayer, grid.id)
                })
    
    });

    }

        return {play, registerEventListener}
}

const gameBoard = createGameboard();

const form = document.querySelector('form');

form.addEventListener('submit', (e)=>{
    const input1 = document.querySelector('#player1').value;
    const input2 = document.querySelector('#player2').value;
    const player1 = createPlayer(input1, 'X');
    const player2 = createPlayer(input2, 'O'); 
    setInterval(10);
    const game = createGame(gameBoard, player1, player2);
    game.registerEventListener();
    e.preventDefault()

})

form.addEventListener('reset', () =>{
    reload()
})



function reload(){
    window.location.reload()
}