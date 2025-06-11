const confettiContainer = document.querySelector('#confetti-container');
const playerTurn = document.querySelector('#player-turn');
const board = document.querySelector('#board');
const player = ['', 'X', 'O'];

class Game {
    constructor() {
        this.board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
        this.currentPlayer = 1;
        this.gameEnds = false;
        this.renderBoard();
    }

    renderBoard() {
        playerTurn.innerHTML = `Vez do jogador ${this.currentPlayer}`;
        board.innerHTML = '';

        this.board.forEach((row, rowIndex) => {
            board.appendChild(this.createRow(row, rowIndex));
        });

        if (this.playerWins()) {
            playerTurn.innerHTML = `Jogador ${this.currentPlayer} venceu!`;
            this.showConfettis(50);
            this.gameEnds = true;
        }
    }

    createRow(rowColumns, rowIndex) {
        const row = document.createElement('div');
        row.className = 'row';

        rowColumns.forEach((cell, columnIndex) => {
            row.appendChild(this.createCell(cell, rowIndex, columnIndex));
        });

        return row;
    }

    createCell(value, rowIndex, columnIndex) {
        const cell = document.createElement('div');
        cell.innerHTML = player[value];
        cell.className = 'cell';

        cell.addEventListener('click', () => {
            this.play(rowIndex, columnIndex);
        });

        return cell;
    }

    play(rowIndex, columnIndex) {
        if (this.board[rowIndex][columnIndex] === 0 && this.gameEnds === false) {
            this.board[rowIndex][columnIndex] = this.currentPlayer;
            this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
            this.renderBoard();
        }
    }

    playerWins() {
        for (let i = 0; i < 3; i++) {
            //Verifica linhas
            if (this.board[i][0] === this.board[i][1] && this.board[i][1] === this.board[i][2] && this.board[i][0] !== 0) {
                return true;
            }

            //Verifica colunas
            if (this.board[0][i] === this.board[1][i] && this.board[1][i] === this.board[2][i] && this.board[0][i] !== 0) {
                return true;
            }

            //Verifica diagonal 1
            if (this.board[0][0] === this.board[1][1] && this.board[1][1] === this.board[2][2] && this.board[0][0] !== 0) {
                return true;
            }

            //Verifica diagonal 2
            if (this.board[0][2] === this.board[1][1] && this.board[1][1] === this.board[2][0] && this.board[0][2] !== 0) {
                return true;
            }
        }
    }

    showConfettis(count) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                this.createConfetti();
            }, i * 200);
        }
    }

    createConfetti() {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.textContent = '🎉';
        confetti.style.left = Math.random() * innerWidth + 'px';
        confettiContainer.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

new Game();