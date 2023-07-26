console.log("hello world")

/*----- constants -----*/
const PLAYERS = {
    '1': {
        name: 'Player 1',
        symbol: 'X',
        color: 'red'
    },
    '-1': {
        name: 'Player 2',
        symbol: 'O',
        color: 'blue'
    }
}

const WIN_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]


/*----- app's state (variables) -----*/
let turn, board, win 

/*----- cached element references -----*/
const h2El = document.querySelector('h2')
const boardEl = document.getElementById("board")
const resetButtonEl = document.createElement('button')


/*----- event listeners -----*/
boardEl.addEventListener('click', handleBoardClick)
resetButtonEl.addEventListener('click', handleReset)


/*----- functions -----*/
function init() {
    turn = 1
    board = [null, null, null, null, null, null, null, null, null]
    winner = null 
    render()
}

function render() {
    renderMessage()
    renderBoard()
    if (winner || !board.includes(null)) {
        renderResetBtn()
    }
}

function handleBoardClick(evt) {
    const idx = evt.target.id[4]
    if (!board[idx] && !winner) {
        board[idx] = turn 
        checkWinner()
        if (!winner) changeTurn()
        render()
    } else {
        console.log('This tile is not empty or game over')
    }
} 

function changeTurn () {
    turn *= -1
}

function checkWinner() {
    for (let combo of WIN_COMBOS) {
        const score = Math.abs(board[combo[0]] + board[combo[1]] + board[combo[2]])
        if (score === 3) {
            winner = turn
            break
        }
    }
}

function renderMessage() {
    if (winner) {
        h2El.innerText = `${PLAYERS[winner].name} won the game!`
    } else if (!winner && !board.includes(null)) {
        h2El.innerText = `it's a cats game`
    } else {
        h2El.innerText = `It is ${PLAYERS[turn].name}'s turn`
    }
}

function renderBoard() {
    for (let square of boardEl.children) {
        const idx = square.id[4]
        square.innerText = board[idx] ? PLAYERS[board[idx]].symbol : ' '
    }
}

function renderResetBtn() {
    resetButtonEl.innerText = 'PLAY AGAIN'
    document.querySelector('body').append(resetButtonEl)
}

function handleReset() {
    resetButtonEl.remove()
    init()
}

init()