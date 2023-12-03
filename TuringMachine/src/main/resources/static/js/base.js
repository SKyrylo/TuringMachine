let tape = [];
let currentIndex = 0;
let tapeCells;

function initTapeCells() {
    tapeCells = document.querySelectorAll('.tape-cell-input');
}

function updateTapeView() {
    for (let i = 0; i < tapeCells.length; i++) {
        const cellIndex = currentIndex + i - Math.floor(tapeCells.length / 2);
        tapeCells[i].value = tape[cellIndex] || '';
    }
}

function insertWordIntoTape() {
    const wordInput = document.getElementById('input-word-box');

    // Clear the tape
    tape = [];

    // Calculate the starting index for centering the word
    const startIndex = Math.floor(tapeCells.length / 2) - Math.floor(wordInput.value.length / 2);

    // Insert the word into the tape starting from the calculated index
    for (let i = 0; i < wordInput.value.length; i++) {
        tape[startIndex + i] = wordInput.value[i];
    }

    // Set the currentIndex to the middle of the tape
    currentIndex = Math.floor(tapeCells.length / 2);

    // Update the tape view
    updateTapeView();
}

function clearTape() {
    tape = [];
    currentIndex = 0;
    updateTapeView();
}

function moveTapeLeft() {
    currentIndex++;
    updateTapeView();
}

function moveTapeRight() {
    currentIndex--;
    updateTapeView();
}

// Initialize tapeCells and set up the initial state
initTapeCells();
updateTapeView();