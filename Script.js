document.addEventListener('DOMContentLoaded', function () {
    const cells = document.querySelectorAll('.cell');
    const status = document.getElementById('status');
    const restartButton = document.getElementById('restart');

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function checkWin() {
        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                gameActive = false;
                return gameBoard[a];
            }
        }
        return null;
    }

    function checkDraw() {
        return gameBoard.every(cell => cell !== '');
    }

    function handleClick(e) {
        const cellIndex = e.target.dataset.index;

        if (gameBoard[cellIndex] !== '' || !gameActive) return;

        gameBoard[cellIndex] = currentPlayer;
        e.target.textContent = currentPlayer;

        const winner = checkWin();
        if (winner) {
            status.textContent = `Player ${winner} wins!`;
            gameActive = false;
            restartButton.classList.remove('hidden');
            return;
        }

        if (checkDraw()) {
            status.textContent = 'It\'s a draw!';
            gameActive = false;
            restartButton.classList.remove('hidden');
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Player ${currentPlayer}'s turn`;
    }

    function restartGame() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        currentPlayer = 'X';
        status.textContent = `Player ${currentPlayer}'s turn`;
        cells.forEach(cell => {
            cell.textContent = '';
        });
        restartButton.classList.add('hidden');
    }

    cells.forEach(cell => cell.addEventListener('click', handleClick));
    restartButton.addEventListener('click', restartGame);
});
