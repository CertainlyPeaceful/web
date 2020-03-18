class tictactoe {
    constructor(gameboard, cells, textElement, result, container) {
        this.gameboard = gameboard;
        this.cells = cells;
        this.textElement = textElement;
        this.result = result;
        this.container = container;
        this.circleTurn = false;
    }
    game_preparation() {
        this.circleTurn = false;
        this.remove_class_from_board();
        this.add_class_to_board();
        this.container.classList.remove("visible");
        this.cells.forEach(cell => {
            cell.classList.remove("x");
            cell.classList.remove("o");
            cell.removeEventListener("click", get_click, { once: true });
            cell.addEventListener("click", get_click, { once: true });
        })
    }
    add_class_to_board() {
        this.circleTurn ? this.gameboard.classList.add("o") : this.gameboard.classList.add("x");
    }
    remove_class_from_board() {
        this.gameboard.classList.remove("x");
        this.gameboard.classList.remove("o");
    }
    switch_turn() {
        this.circleTurn = !this.circleTurn;
    }
    add_class_to_cell(cell) {
        this.circleTurn ? cell.classList.add("o") : cell.classList.add("x");
    }
    gameOver() {
        return this.is_draw() || this.is_winner();
    }
    is_draw() {
        let condition = true;
        this.cells.forEach(cell => {
            condition = condition && (cell.classList.contains("x") || cell.classList.contains("o"));
        });
        return condition;
    }
    is_winner() {
        let key = this.circleTurn ? "o" : "x";
        return winning_array.some(subarray => {
            return subarray.every(index => {
                return this.cells[index].classList.contains(key);
            })
        });
    }
    end_game() {
        if (this.is_winner())
            this.result.innerText = `${this.circleTurn ? "O" : "X"} wins!`;
        else if (this.is_draw())
            this.result.innerText = "Draw!";
        this.container.classList.add("visible"); // toggle overlay
    }
};

// Function
function get_click(e) {
    game.add_class_to_cell(e.target);
    if (!game.gameOver()) {
        game.switch_turn();
        game.remove_class_from_board();
        game.add_class_to_board();
    }
    else
        game.end_game();
}

// Doms
const gameboard = document.querySelector(".gameboard");
const cells = document.querySelectorAll(".cell");
const textElement = document.querySelector(".text-element");
const result = document.querySelector(".result");
const resetButton = document.querySelector("#reset");
const container = document.querySelector(".container");

// Other variables
const winning_array = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
];
const game = new tictactoe(gameboard, cells, textElement, result, container);

game.game_preparation(); // initialize game

// Event listener
resetButton.addEventListener("click", () => {
    game.game_preparation();
});