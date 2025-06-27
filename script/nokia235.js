// script/script.js (Content is the same as before)

document.addEventListener('DOMContentLoaded', () => {
    const gridItems = Array.from(document.querySelectorAll('td[id^="grid-"]'));
    const footer = document.getElementById('app-footer');
    const cols = 3;
    let currentRow = 0;
    let currentCol = 0;
    let currentFocusIndex = 0; // Tracks the current focused grid item

    // Initialize focus on the first item
    function initializeFocus() {
        if (gridItems.length > 0) {
            gridItems[0].classList.add('focused');
            updateFooter(gridItems[0]);
        }
    }

    // Update the footer text
    function updateFooter(focusedElement) {
        if (focusedElement) {
            const appName = focusedElement.dataset.appName || 'Unknown App';
            footer.textContent = `Selected: ${appName}`;
        }
    }

    // Handle key presses
    document.addEventListener('keydown', (e) => {
        let newRow = currentRow;
        let newCol = currentCol;

        // Remove focus from the current item
        gridItems[currentFocusIndex].classList.remove('focused');

        switch (e.key) {
            case 'ArrowUp':
            case '2': // Dialpad '2' for Up
                newRow = Math.max(0, currentRow - 1);
                break;
            case 'ArrowDown':
            case '8': // Dialpad '8' for Down
                newRow = Math.min(Math.floor((gridItems.length - 1) / cols), currentRow + 1);
                break;
            case 'ArrowLeft':
            case '4': // Dialpad '4' for Left
                newCol = Math.max(0, currentCol - 1);
                break;
            case 'ArrowRight':
            case '6': // Dialpad '6' for Right
                newCol = Math.min(cols - 1, currentCol + 1);
                break;
            case 'Enter': // Joypad center button / '5' for selecting
            case '5':
                // In a real app, you'd trigger an action here (e.g., navigate to a new page, open a modal)
                const selectedAppName = gridItems[currentFocusIndex].dataset.appName;
                alert(`Launching: ${selectedAppName}`); // Simple placeholder action
                break;
            case '1': // Dialpad 1 (Top-left)
                newRow = 0;
                newCol = 0;
                break;
            case '3': // Dialpad 3 (Top-right)
                newRow = 0;
                newCol = 2;
                break;
            case '7': // Dialpad 7 (Bottom-left)
                newRow = Math.min(Math.floor((gridItems.length - 1) / cols), currentRow + 1); // Go to last row
                newCol = 0;
                break;
            case '9': // Dialpad 9 (Bottom-right)
                newRow = Math.min(Math.floor((gridItems.length - 1) / cols), currentRow + 1); // Go to last row
                newCol = 2;
                break;
            // Add more specific key handlers if needed (e.g., 'C' for clear, etc.)
        }

        // Calculate the new focus index
        let potentialNewIndex = newRow * cols + newCol;

        // Ensure the new index doesn't go beyond the last item if moving right/down
        if (potentialNewIndex >= gridItems.length) {
            // If we try to move right or down past the last item in the grid,
            // we'll try to find the last item in the *current* row or the overall last item.
            // This handles cases where the last row isn't full.
            if (e.key === 'ArrowRight' || e.key === '6') {
                potentialNewIndex = Math.min(gridItems.length - 1, (currentRow * cols) + (cols - 1));
            } else if (e.key === 'ArrowDown' || e.key === '8') {
                 // If moving down and the last row is partial, go to the last item in the actual last row
                 potentialNewIndex = gridItems.length - 1;
            } else {
                 potentialNewIndex = currentFocusIndex; // Stay at current if invalid move
            }
        }


        // Update current position
        currentRow = Math.floor(potentialNewIndex / cols);
        currentCol = potentialNewIndex % cols;
        currentFocusIndex = potentialNewIndex;

        // Add focus to the new item
        gridItems[currentFocusIndex].classList.add('focused');
        updateFooter(gridItems[currentFocusIndex]);
    });

    // Initial setup
    initializeFocus();
});
