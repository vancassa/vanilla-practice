/*
GAME FUNCTION:
- Player must guess a number between a mix and max
- Player gets a certain amount of guesses
- Notify player of the guess remaining
- Notify the player of the correct answer if they lose
- Let the player choose to play again
*/

// Game values,
let min = 1,
    max = 10;
let winningNum = getRandomNum(min, max),
    guessesLeft = 3;
let gameOver = false;

// UI elements
const $game = document.querySelector("#game"),
    $minNum = document.querySelector(".min-num"),
    $maxNum = document.querySelector(".max-num"),
    $guessBtn = document.querySelector("#guess-btn"),
    $guessInput = document.querySelector("#guess-input"),
    $message = document.querySelector(".message");

// Assign UI min and max
$minNum.textContent = min;
$maxNum.textContent = max;

// Listen for guess
$guessBtn.addEventListener("mousedown", () => {
    gameOver ? replay() : gameLogic();
});

function gameLogic() {
    let guess = parseInt($guessInput.value);

    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, "red");
    }

    // Check if won
    if (guess === winningNum) {
        // Game over - won
        setGameOver(true, `${winningNum} is the correct number. Congrats!`);
    } else if (isNaN(guess)) {
        setMessage("Please enter a number", "red");
    } else {
        guessesLeft -= 1;

        if (guessesLeft === 0) {
            // Game over - lost
            setGameOver(false, `Game over. You lost. The correct number was ${winningNum}`);
        } else {
            // Game continues - answer wrong
            $guessInput.style.borderColor = "red";
            setMessage(`${guess} is not correct. No of guesses left: ${guessesLeft}`);
        }
    }
}

function setMessage(msg, color) {
    $message.style.color = color;
    $message.textContent = msg;
}

function setGameOver(won, msg) {
    let color = won === true ? "green" : "red";
    $guessInput.disabled = true;
    $guessInput.style.borderColor = color;
    setMessage(msg, color);
    $guessBtn.value = "Play again?";

    gameOver = true;
}

// Get winning number
function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Play again
function replay() {
    // Reset input
    $guessBtn.value = "Guess";
    $guessInput.value = "";
    $guessInput.disabled = false;
    $guessInput.style.borderColor = "grey";
    setMessage("", "");

    // Reset variables
    winningNum = getRandomNum(min, max);
    guessesLeft = 3;
    gameOver = false;
}
