// Display Last Modified Date
var lastUpdated = document.lastModified;
document.getElementById('lastModified').textContent = lastUpdated;

// Shell Sort Algorithm and Step Display
document.getElementById('sortButton').addEventListener('click', async function () {
    // Retrieve the array from user input
    let inputArray = document.getElementById('arrayInput').value.split(',').map(Number);
    let arrayRow = document.getElementById('arrayRow');
    arrayRow.innerHTML = '';  // Clear previous array display
    document.getElementById('result').innerHTML = '';  // Clear previous result

    if (inputArray.some(isNaN)) {
        document.getElementById('result').innerHTML = `<strong>Error:</strong> Please enter a valid array of numbers.`;
        return;
    }

    // Function to display the current state of the array in boxes
    function displayArray(array) {
        arrayRow.innerHTML = '';  // Clear current display
        array.forEach(num => {
            let box = document.createElement('div');
            box.classList.add('box');
            box.textContent = num;
            arrayRow.appendChild(box);
        });
    }

    // Display initial array in boxes
    displayArray(inputArray);

    // Shell Sort Algorithm with animation
    let n = inputArray.length;
    let delay = 500; // Time delay in milliseconds

    // Function to execute Shell Sort with visualization
    async function shellSort() {
        for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
            for (let i = gap; i < n; i++) {
                let temp = inputArray[i];
                let j;

                for (j = i; j >= gap && inputArray[j - gap] > temp; j -= gap) {
                    // Highlight the elements being swapped
                    let boxCurrent = arrayRow.children[j];
                    let boxPrevious = arrayRow.children[j - gap];

                    // Change color of current and previous box
                    boxCurrent.classList.add('swapping');
                    boxPrevious.classList.add('swapping');

                    // Swap elements in the array
                    inputArray[j] = inputArray[j - gap];

                    // Update display after each swap
                    displayArray([...inputArray]);
                    
                    // Wait for the specified delay before the next iteration
                    await new Promise(resolve => setTimeout(resolve, delay));

                    // Reset the color of current and previous box
                    boxCurrent.classList.remove('swapping');
                    boxPrevious.classList.remove('swapping');
                }

                // Place the current element in its correct position
                inputArray[j] = temp;

                // Update display to reflect the newly sorted element
                displayArray([...inputArray]);

                // Mark the sorted element
                if (j !== i) { // Avoid marking if the current element is already in place
                    arrayRow.children[j].classList.add('sorted'); // Mark as sorted
                }

                // Wait for the specified delay before the next iteration
                await new Promise(resolve => setTimeout(resolve, delay));
            }

            // Display array after each gap iteration
            displayArray([...inputArray]);
            // Wait for the specified delay after each gap iteration
            await new Promise(resolve => setTimeout(resolve, delay));
        }

        // Display final sorted array
        document.getElementById('result').innerHTML = `<strong>Sorted Array:</strong> [${inputArray.join(', ')}]`;
    }

    // Call the shellSort function
    shellSort();
});
