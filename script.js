document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const sudokuGrid = document.getElementById('sudoku-grid');
    const numberButtons = document.querySelectorAll('.number-button');
    const validateButton = document.getElementById('validate-button');
    const solveButton = document.getElementById('solve-button');
    const clearButton = document.getElementById('clear-button');
    const hintButton = document.getElementById('hint-button');
    const timerElement = document.getElementById('timer');
    const timerToggleButton = document.getElementById('timer-toggle');
    const timerResetButton = document.getElementById('timer-reset');
    const themeToggleButton = document.getElementById('theme-toggle');
    const easyButton = document.getElementById('easy-button');
    const mediumButton = document.getElementById('medium-button');
    const hardButton = document.getElementById('hard-button');
    const validationMessage = document.getElementById('validation-message');
    const infoButton = document.getElementById('info-button');
    const infoModal = document.getElementById('info-modal');
    const closeModalButton = document.querySelector('.close-button');
    const currentYearElement = document.getElementById('current-year');

    // Set current year in footer
    currentYearElement.textContent = new Date().getFullYear();

    // State variables
    let currentGrid = createEmptyGrid();
    let originalGrid = createEmptyGrid();
    let selectedCell = null;
    let solution = null;
    let isSolving = false;

    // Timer state
    let timer = 0;
    let timerInterval = null;
    let isTimerRunning = false;

    // Sample puzzles
    const samplePuzzles = {
        easy: [
            [
                [5, 3, 0, 0, 7, 0, 0, 0, 0],
                [6, 0, 0, 1, 9, 5, 0, 0, 0],
                [0, 9, 8, 0, 0, 0, 0, 6, 0],
                [8, 0, 0, 0, 6, 0, 0, 0, 3],
                [4, 0, 0, 8, 0, 3, 0, 0, 1],
                [7, 0, 0, 0, 2, 0, 0, 0, 6],
                [0, 6, 0, 0, 0, 0, 2, 8, 0],
                [0, 0, 0, 4, 1, 9, 0, 0, 5],
                [0, 0, 0, 0, 8, 0, 0, 7, 9]
            ],
            [
                [0, 0, 0, 2, 6, 0, 7, 0, 1],
                [6, 8, 0, 0, 7, 0, 0, 9, 0],
                [1, 9, 0, 0, 0, 4, 5, 0, 0],
                [8, 2, 0, 1, 0, 0, 0, 4, 0],
                [0, 0, 4, 6, 0, 2, 9, 0, 0],
                [0, 5, 0, 0, 0, 3, 0, 2, 8],
                [0, 0, 9, 3, 0, 0, 0, 7, 4],
                [0, 4, 0, 0, 5, 0, 0, 3, 6],
                [7, 0, 3, 0, 1, 8, 0, 0, 0]
            ]
        ],
        medium: [
            [
                [0, 2, 0, 6, 0, 8, 0, 0, 0],
                [5, 8, 0, 0, 0, 9, 7, 0, 0],
                [0, 0, 0, 0, 4, 0, 0, 0, 0],
                [3, 7, 0, 0, 0, 0, 5, 0, 0],
                [6, 0, 0, 0, 0, 0, 0, 0, 4],
                [0, 0, 8, 0, 0, 0, 0, 1, 3],
                [0, 0, 0, 0, 2, 0, 0, 0, 0],
                [0, 0, 9, 8, 0, 0, 0, 3, 6],
                [0, 0, 0, 3, 0, 6, 0, 9, 0]
            ],
            [
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 3, 0, 8, 5],
                [0, 0, 1, 0, 2, 0, 0, 0, 0],
                [0, 0, 0, 5, 0, 7, 0, 0, 0],
                [0, 0, 4, 0, 0, 0, 1, 0, 0],
                [0, 9, 0, 0, 0, 0, 0, 0, 0],
                [5, 0, 0, 0, 0, 0, 0, 7, 3],
                [0, 0, 2, 0, 1, 0, 0, 0, 0],
                [0, 0, 0, 0, 4, 0, 0, 0, 9]
            ]
        ],
        hard: [
            [
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 3, 0, 8, 5],
                [0, 0, 1, 0, 2, 0, 0, 0, 0],
                [0, 0, 0, 5, 0, 7, 0, 0, 0],
                [0, 0, 4, 0, 0, 0, 1, 0, 0],
                [0, 9, 0, 0, 0, 0, 0, 0, 0],
                [5, 0, 0, 0, 0, 0, 0, 7, 3],
                [0, 0, 2, 0, 1, 0, 0, 0, 0],
                [0, 0, 0, 0, 4, 0, 0, 0, 9]
            ],
            [
                [8, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 3, 6, 0, 0, 0, 0, 0],
                [0, 7, 0, 0, 9, 0, 2, 0, 0],
                [0, 5, 0, 0, 0, 7, 0, 0, 0],
                [0, 0, 0, 0, 4, 5, 7, 0, 0],
                [0, 0, 0, 1, 0, 0, 0, 3, 0],
                [0, 0, 1, 0, 0, 0, 0, 6, 8],
                [0, 0, 8, 5, 0, 0, 0, 1, 0],
                [0, 9, 0, 0, 0, 0, 4, 0, 0]
            ]
        ]
    };

    // Initialize the Sudoku grid
    function initGrid() {
        sudokuGrid.innerHTML = '';

        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.setAttribute('data-row', row);
                cell.setAttribute('data-col', col);
                cell.tabIndex = 0; // Make focusable

                // Add thicker borders for 3x3 boxes
                if (col % 3 === 2 && col < 8) {
                    cell.classList.add('border-right');
                }
                if (row % 3 === 2 && row < 8) {
                    cell.classList.add('border-bottom');
                }

                cell.addEventListener('click', () => {
                    if (isSolving) return;
                    selectCell(cell, row, col);
                });

                // Handle keyboard events when cell is focused
                cell.addEventListener('keydown', (e) => {
                    if (isSolving) return;
                    handleKeyDown(e, row, col);
                });

                sudokuGrid.appendChild(cell);
            }
        }

        updateGridDisplay();
    }

    // Create an empty 9x9 grid filled with zeros
    function createEmptyGrid() {
        return Array(9).fill().map(() => Array(9).fill(0));
    }

    // Select a cell
    function selectCell(cell, row, col) {
        // Remove highlight from previously selected cell
        if (selectedCell) {
            selectedCell.classList.remove('highlighted');
        }

        // Highlight the selected cell
        cell.classList.add('highlighted');
        selectedCell = cell;

        // Start timer when a cell is selected
        if (!isTimerRunning) {
            startTimer();
        }
    }

    // Handle keyboard input
    function handleKeyDown(e, row, col) {
        // Number input (1-9)
        if (/^[1-9]$/.test(e.key)) {
            updateCell(row, col, parseInt(e.key));
        }

        // Delete, Backspace, or 0 to clear cell
        if (e.key === 'Delete' || e.key === 'Backspace' || e.key === '0') {
            updateCell(row, col, 0);
        }

        // Arrow key navigation
        if (e.key.startsWith('Arrow')) {
            e.preventDefault(); // Prevent scrolling

            let newRow = row;
            let newCol = col;

            switch (e.key) {
                case 'ArrowUp':
                    newRow = (newRow - 1 + 9) % 9;
                    break;
                case 'ArrowDown':
                    newRow = (newRow + 1) % 9;
                    break;
                case 'ArrowLeft':
                    newCol = (newCol - 1 + 9) % 9;
                    break;
                case 'ArrowRight':
                    newCol = (newCol + 1) % 9;
                    break;
            }

            // Select the new cell
            const newCell = document.querySelector(`[data-row="${newRow}"][data-col="${newCol}"]`);
            if (newCell) {
                newCell.focus();
                selectCell(newCell, newRow, newCol);
            }
        }
    }

    // Update cell value
    function updateCell(row, col, value) {
        currentGrid[row][col] = value;
        originalGrid[row][col] = value;
        updateGridDisplay();
    }

    // Update the visual display of the grid
    function updateGridDisplay() {
        const cells = sudokuGrid.querySelectorAll('.cell');

        cells.forEach(cell => {
            const row = parseInt(cell.getAttribute('data-row'));
            const col = parseInt(cell.getAttribute('data-col'));
            const value = currentGrid[row][col];

            // Clear previous classes
            cell.classList.remove('prefilled', 'solved', 'hint');

            // Set the cell content
            cell.textContent = value !== 0 ? value : '';

            // Apply styling based on cell state
            if (originalGrid[row][col] !== 0) {
                cell.classList.add('prefilled');
            }
        });
    }

    // Validate the Sudoku puzzle
    function validateSudoku(grid) {
        // Check if the grid violates any Sudoku rules

        // Check rows
        for (let row = 0; row < 9; row++) {
            const rowValues = grid[row].filter(val => val !== 0);
            if (new Set(rowValues).size !== rowValues.length) {
                return {
                    isValid: false,
                    message: `Row ${row + 1} has duplicate values`
                };
            }
        }

        // Check columns
        for (let col = 0; col < 9; col++) {
            const colValues = [];
            for (let row = 0; row < 9; row++) {
                if (grid[row][col] !== 0) {
                    colValues.push(grid[row][col]);
                }
            }
            if (new Set(colValues).size !== colValues.length) {
                return {
                    isValid: false,
                    message: `Column ${col + 1} has duplicate values`
                };
            }
        }

        // Check 3x3 boxes
        for (let boxRow = 0; boxRow < 3; boxRow++) {
            for (let boxCol = 0; boxCol < 3; boxCol++) {
                const boxValues = [];
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        const row = boxRow * 3 + i;
                        const col = boxCol * 3 + j;
                        if (grid[row][col] !== 0) {
                            boxValues.push(grid[row][col]);
                        }
                    }
                }
                if (new Set(boxValues).size !== boxValues.length) {
                    return {
                        isValid: false,
                        message: `Box at position ${boxRow + 1},${boxCol + 1} has duplicate values`
                    };
                }
            }
        }

        return {
            isValid: true,
            message: 'The puzzle is valid'
        };
    }

    // Solve the Sudoku puzzle using backtracking algorithm
    function solveSudoku(grid) {
        // Create a deep copy of the grid to avoid modifying the original
        const workingGrid = grid.map(row => [...row]);

        // Find an empty cell
        function findEmptyCell() {
            for (let row = 0; row < 9; row++) {
                for (let col = 0; col < 9; col++) {
                    if (workingGrid[row][col] === 0) {
                        return [row, col];
                    }
                }
            }
            return null; // No empty cells, puzzle is complete
        }

        // Check if number can be placed at position
        function isValid(row, col, num) {
            // Check row
            for (let i = 0; i < 9; i++) {
                if (workingGrid[row][i] === num) {
                    return false;
                }
            }

            // Check column
            for (let i = 0; i < 9; i++) {
                if (workingGrid[i][col] === num) {
                    return false;
                }
            }

            // Check 3x3 box
            const boxRow = Math.floor(row / 3) * 3;
            const boxCol = Math.floor(col / 3) * 3;

            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (workingGrid[boxRow + i][boxCol + j] === num) {
                        return false;
                    }
                }
            }

            return true;
        }

        // Recursive solve function
        function solve() {
            const emptyCell = findEmptyCell();

            // If no empty cells, puzzle is solved
            if (emptyCell === null) {
                return true;
            }

            const [row, col] = emptyCell;

            // Try placing digits 1-9
            for (let num = 1; num <= 9; num++) {
                if (isValid(row, col, num)) {
                    workingGrid[row][col] = num;

                    // Recursively try to solve the rest
                    if (solve()) {
                        return true;
                    }

                    // If failed, backtrack (undo the placement)
                    workingGrid[row][col] = 0;
                }
            }

            // No solution found with current configuration
            return false;
        }

        // Start solving
        if (solve()) {
            return workingGrid;
        } else {
            return null; // No solution exists
        }
    }

    // Get a hint (reveal one cell)
    function getHint() {
        // Show a loading indicator on the hint button
        const hintButton = document.getElementById('hint-button');
        const originalButtonText = hintButton.innerHTML;
        hintButton.innerHTML = '<span class="spinner"></span>Processing...';
        hintButton.disabled = true;

        // Use setTimeout to allow UI to update before running the computation
        setTimeout(() => {
            try {
                if (!solution) {
                    // We need to solve the puzzle first
                    solution = solveSudoku(currentGrid);

                    if (!solution) {
                        showValidationMessage('Cannot provide hint - puzzle has no valid solution', false);
                        hintButton.innerHTML = originalButtonText;
                        hintButton.disabled = false;
                        return;
                    }
                }

                // Find all empty cells in the current grid
                const emptyCells = [];
                for (let row = 0; row < 9; row++) {
                    for (let col = 0; col < 9; col++) {
                        if (currentGrid[row][col] === 0) {
                            emptyCells.push([row, col]);
                        }
                    }
                }

                // If no empty cells, no hint needed
                if (emptyCells.length === 0) {
                    showToast('No hint available - puzzle is complete!');
                    hintButton.innerHTML = originalButtonText;
                    hintButton.disabled = false;
                    return;
                }

                // Select a random empty cell to reveal
                const randomIndex = Math.floor(Math.random() * emptyCells.length);
                const [row, col] = emptyCells[randomIndex];

                // Reveal the cell
                const hintValue = solution[row][col];
                currentGrid[row][col] = hintValue;
                originalGrid[row][col] = hintValue;

                // Update display and mark as a hint
                updateGridDisplay();
                const hintCell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
                hintCell.classList.add('hint');

                showToast(`Hint provided: ${hintValue} at row ${row + 1}, column ${col + 1}`);

                // Restore button state
                hintButton.innerHTML = originalButtonText;
                hintButton.disabled = false;
            } catch (error) {
                console.error('Error generating hint:', error);
                showToast('Error generating hint. Please try again.');
                hintButton.innerHTML = originalButtonText;
                hintButton.disabled = false;
            }
        }, 50); // Small delay to ensure UI updates
    }

    // Timer functions
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    function startTimer() {
        if (timerInterval !== null) return;

        isTimerRunning = true;
        timerToggleButton.innerHTML = '<i class="fas fa-pause"></i>';

        timerInterval = setInterval(() => {
            timer++;
            timerElement.textContent = formatTime(timer);
        }, 1000);
    }

    function pauseTimer() {
        if (timerInterval === null) return;

        clearInterval(timerInterval);
        timerInterval = null;
        isTimerRunning = false;
        timerToggleButton.innerHTML = '<i class="fas fa-play"></i>';
    }

    function resetTimer() {
        pauseTimer();
        timer = 0;
        timerElement.textContent = formatTime(timer);
    }

    // Load a sample puzzle
    function loadSamplePuzzle(difficulty) {
        // Get random puzzle from the selected difficulty
        const puzzles = samplePuzzles[difficulty];
        const randomIndex = Math.floor(Math.random() * puzzles.length);
        const puzzle = puzzles[randomIndex];

        // Create deep copies
        currentGrid = puzzle.map(row => [...row]);
        originalGrid = puzzle.map(row => [...row]);
        solution = null;

        // Reset the timer
        resetTimer();
        startTimer();

        // Update the grid display
        updateGridDisplay();

        // Show toast message
        const difficultyCapitalized = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
        showToast(`${difficultyCapitalized} puzzle loaded`);
    }

    // Display validation message
    function showValidationMessage(message, isValid) {
        validationMessage.textContent = message;
        validationMessage.className = isValid ? 'valid-message' : 'invalid-message';

        // Clear after 5 seconds
        setTimeout(() => {
            validationMessage.textContent = '';
            validationMessage.className = '';
        }, 5000);
    }

    // Simple toast notification
    function showToast(message) {
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }

        // Create new toast
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;

        document.body.appendChild(toast);

        // Remove toast after animation completes
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    // Event Listeners
    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (!selectedCell || isSolving) return;

            const row = parseInt(selectedCell.getAttribute('data-row'));
            const col = parseInt(selectedCell.getAttribute('data-col'));
            const number = parseInt(button.getAttribute('data-number'));

            updateCell(row, col, number);
        });
    });

    validateButton.addEventListener('click', () => {
        const validationResult = validateSudoku(currentGrid);
        showValidationMessage(validationResult.message, validationResult.isValid);
    });

    solveButton.addEventListener('click', async () => {
        // Validate first
        const validationResult = validateSudoku(currentGrid);
        if (!validationResult.isValid) {
            showValidationMessage(validationResult.message, false);
            return;
        }

        // Show solving state
        isSolving = true;
        solveButton.innerHTML = '<span class="spinner"></span>Solving...';
        showValidationMessage('Solving...', null);

        // Pause to show the solving state and allow UI to update
        await new Promise(resolve => setTimeout(resolve, 100));

        try {
            solution = solveSudoku([...currentGrid]);

            if (solution) {
                currentGrid = solution.map(row => [...row]);
                updateGridDisplay();
                showValidationMessage('Solved!', true);
                pauseTimer();
            } else {
                showValidationMessage('No solution exists for this puzzle', false);
            }
        } catch (error) {
            console.error('Error solving puzzle:', error);
            showValidationMessage('Error solving puzzle', false);
        } finally {
            isSolving = false;
            solveButton.innerHTML = 'Solve Puzzle';
        }
    });

    clearButton.addEventListener('click', () => {
        currentGrid = createEmptyGrid();
        originalGrid = createEmptyGrid();
        solution = null;
        updateGridDisplay();
        resetTimer();
        showValidationMessage('', null);
    });

    hintButton.addEventListener('click', getHint);

    timerToggleButton.addEventListener('click', () => {
        if (isTimerRunning) {
            pauseTimer();
        } else {
            startTimer();
        }
    });

    timerResetButton.addEventListener('click', resetTimer);

    themeToggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');

        const isDarkTheme = document.body.classList.contains('dark-theme');
        themeToggleButton.innerHTML = isDarkTheme ?
            '<i class="fas fa-sun"></i>' :
            '<i class="fas fa-moon"></i>';
    });

    easyButton.addEventListener('click', () => loadSamplePuzzle('easy'));
    mediumButton.addEventListener('click', () => loadSamplePuzzle('medium'));
    hardButton.addEventListener('click', () => loadSamplePuzzle('hard'));

    infoButton.addEventListener('click', () => {
        infoModal.classList.add('show');
    });

    closeModalButton.addEventListener('click', () => {
        infoModal.classList.remove('show');
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === infoModal) {
            infoModal.classList.remove('show');
        }
    });

    // Global keyboard listener for cell navigation
    document.addEventListener('keydown', (e) => {
        if (selectedCell && (e.key === 'Delete' || e.key === 'Backspace' || /^[0-9]$/.test(e.key))) {
            // Don't handle these keys globally, they're handled by the cell listener
            return;
        }
    });

    // Initialize the application
    initGrid();
});
