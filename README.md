# 🧩 Sudoku Solver

A modern, interactive web-based Sudoku solver with an intuitive interface for inputting and automatically solving puzzles. Built with HTML5, CSS3, and JavaScript for optimal performance and simplicity.

## ✨ Features

### 🎮 Interactive Gameplay
- **Interactive 9×9 Grid**: Click cells to select and input numbers using mouse or keyboard
- **Number Pad**: On-screen number pad for easy number input and deletion
- **Keyboard Navigation**: Full arrow key navigation and number input support
- **Visual Feedback**: Real-time validation with color-coded feedback for invalid entries

### 🧠 Smart Solving
- **Backtracking Algorithm**: Efficient solving using recursive backtracking with constraint checking
- **Hint System**: Get hints for individual cells when stuck
- **Puzzle Validation**: Check if your current puzzle state is valid according to Sudoku rules
- **Sample Puzzles**: Pre-loaded puzzles in three difficulty levels (Easy, Medium, Hard)

### ⏱️ Timer & Progress
- **Built-in Timer**: Track your solving time with play/pause functionality
- **Timer Controls**: Start, pause, and reset timer as needed
- **Progress Tracking**: Visual indicators for original, user-filled, and hint cells

### 🎨 User Experience
- **Dark/Light Theme**: Toggle between themes with smooth transitions
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Toast Notifications**: Helpful feedback messages for user actions
- **Loading Indicators**: Visual feedback during puzzle solving operations

## 🚀 Live Demo

[View Live Demo](https://soumyadip204.github.io/sudoku-solver/)

## 📱 Screenshots

### Desktop View
![Desktop Interface](screenshot-desktop.png) *(Add actual screenshot)*

### Mobile View
![Mobile Interface](screenshot-mobile.png) *(Add actual screenshot)*

### Dark Theme
![Dark Theme](screenshot-dark.png) *(Add actual screenshot)*

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: CSS Grid, Flexbox, CSS Variables for theming
- **Icons**: Font Awesome for UI icons
- **Fonts**: Google Fonts (Roboto)
- **No Framework Dependencies**: Pure JavaScript for optimal performance

## 🎯 How to Use

### Basic Operations
1. **Load a Puzzle**: Click Easy, Medium, or Hard to load a sample puzzle
2. **Input Numbers**: Click a cell and use the number pad or keyboard (1-9)
3. **Delete Numbers**: Use the delete button or press Backspace/Delete
4. **Navigate**: Use arrow keys to move between cells

### Advanced Features
- **Get Hint**: Click "Get Hint" to reveal a random cell when stuck
- **Validate**: Check if your current puzzle state follows Sudoku rules
- **Solve**: Automatically solve the entire puzzle using the backtracking algorithm
- **Timer**: Use play/pause/reset to track your solving time
- **Theme**: Toggle between light and dark themes

### Keyboard Shortcuts
- **1-9**: Input numbers in selected cell
- **0, Delete, Backspace**: Clear selected cell
- **Arrow Keys**: Navigate between cells
- **Escape**: Deselect current cell

## 🧮 Algorithm Details

### Sudoku Solving Algorithm
The solver uses a **recursive backtracking algorithm**:

1. **Find Empty Cell**: Locate the next empty cell in the grid
2. **Try Numbers**: Attempt to place numbers 1-9 in the cell
3. **Validate**: Check if the placement violates Sudoku constraints
4. **Recurse**: If valid, recursively solve the rest of the puzzle
5. **Backtrack**: If no valid number works, backtrack and try the next option

### Validation Logic
The validation checks three Sudoku constraints:
- **Row Constraint**: No duplicate numbers in any row
- **Column Constraint**: No duplicate numbers in any column
- **Box Constraint**: No duplicate numbers in any 3×3 box

### Time Complexity
- **Worst Case**: O(9^(n²)) where n=9 for a 9×9 grid
- **Average Case**: Much better due to constraint pruning
- **Space Complexity**: O(n²) for the recursion stack

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Test thoroughly**
5. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Development Guidelines
- Follow existing code style and conventions
- Test on multiple browsers and devices
- Ensure accessibility standards are maintained
- Add comments for complex logic
- Update documentation for new features

## 🐛 Known Issues & Limitations

- **Performance**: Very difficult puzzles may take a few seconds to solve
- **Browser Compatibility**: Requires modern browsers with CSS Grid support
- **Persistence**: Puzzle state is not saved between sessions
- **Puzzle Generation**: Currently uses pre-defined puzzles (no dynamic generation)

## 📋 Future Enhancements

- [ ] **Puzzle Generator**: Implement dynamic puzzle generation with guaranteed unique solutions
- [ ] **Save/Load**: Add ability to save and resume puzzles
- [ ] **Statistics**: Track solving times and success rates
- [ ] **Hints Enhancement**: Strategic hints based on solving techniques
- [ ] **Multiplayer**: Real-time collaborative solving
- [ ] **Difficulty Analysis**: Algorithmic difficulty assessment
- [ ] **Step-by-Step Solver**: Show solving steps and techniques
- [ ] **Export/Import**: Share puzzles via URL or file

## 🙏 Acknowledgments

- **Algorithm Inspiration**: Classic backtracking algorithm for constraint satisfaction problems
- **UI Design**: Inspired by popular Sudoku apps

## 📞 Contact

- **Email**: sahasoumyadip1802@gmail.com

---

⭐ **Star this repository if you found it helpful!**

*Built with ❤️*
