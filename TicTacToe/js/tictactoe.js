let activePlayer = 'X'; // keeps track of whose turn it is
let selectedSquares = []; // stores an array of moves; used to determine win conditions

// this function is for placing an X or O in a square
function placeXOrO(squareNumber) {
    //The following condition ensures a square hasn't been selected already
    //Uses the .some() method to check each element of selectedSquare array
    //to see if it contains the square number clicked on.
    if (!selectedSquares.some(element => element.includes(squareNumber))) {
        let select = document.getElementById(squareNumber); //retrieves html element id that was clicked
        
        if (activePlayer === 'X') {
            select.style.backgroundImage = 'url("images/x.png")';
        }
        else {
            select.style.backgroundImage = 'url("images/o.png")';
        }

        //concatenates these two values and adds to array
        selectedSquares.push(squareNumber + activePlayer);

        checkWinConditions();

        //changes active player
        if (activePlayer === 'X') {
            activePlayer = 'O';
        }
        else {
            activePlayer = 'X';
        }

        audio('./media/place.mp3');

        //checks if it is the computer's turn
        if (activePlayer === 'O') { 
            disableClick(); //disables click for computer's turn
            setTimeout(function () { computersTurn(); }, 1000) //waits 1 second before computer places image and enables click
        }

        return true; // needed for computersTurn() function to work
    }

    //function for selecting a random square
    function computersTurn() {
        let success = false; //need for the while loop
        let pickASquare; //stores a random number 0-8

        //will keep checking if a square has already been taken
        while(!success) {
            pickASquare = String(Math.floor(Math.random() * 9)); //picks random number 0-8

            //checks if square has already been selected
            if (placeXOrO(pickASquare)) {
                placeXOrO(pickASquare);
                success = true; //ends the loop
            }
        }
    }
}

//This function parses the selectedSquares array to search for win conditions.
//drawWinLine function is called to draw line if condition is met.
function checkWinConditions() {
    //X conditions
    if      (arrayIncludes('0X', '1X', '2X')) { drawWinLine(50, 100, 558, 100)}
    else if (arrayIncludes('3X', '4X', '5X')) { drawWinLine(50, 304, 558, 304)}
    else if (arrayIncludes('6X', '7X', '8X')) { drawWinLine(50, 508, 558, 508)}
    else if (arrayIncludes('0X', '3X', '6X')) { drawWinLine(100, 50, 100, 558)}
    else if (arrayIncludes('1X', '4X', '7X')) { drawWinLine(304, 50, 304, 558)}
    else if (arrayIncludes('2X', '5X', '8X')) { drawWinLine(508, 50, 508, 558)}
    else if (arrayIncludes('6X', '4X', '2X')) { drawWinLine(100, 508, 510, 90)}
    else if (arrayIncludes('0X', '4X', '8X')) { drawWinLine(100, 100, 520, 520)}
    //O conditions
    else if (arrayIncludes('0O', '1O', '2O')) { drawWinLine(50, 100, 558, 100)}
    else if (arrayIncludes('3O', '4O', '5O')) { drawWinLine(50, 304, 558, 304)}
    else if (arrayIncludes('6O', '7O', '8O')) { drawWinLine(50, 508, 558, 508)}
    else if (arrayIncludes('0O', '3O', '6O')) { drawWinLine(100, 50, 100, 558)}
    else if (arrayIncludes('1O', '4O', '7O')) { drawWinLine(304, 50, 304, 558)}
    else if (arrayIncludes('2O', '5O', '8O')) { drawWinLine(508, 50, 508, 558)}
    else if (arrayIncludes('6O', '4O', '2O')) { drawWinLine(100, 508, 510, 90)}
    else if (arrayIncludes('0O', '4O', '8O')) { drawWinLine(100, 100, 520, 520)}
    //tie condition
    else if (selectedSquares.length >= 9) {
        audio('./media/tie.mp3');
        setTimeout(function () { resetGame(); }, 1000); // timer before resetGame is called
    }

    //Checks if an array includes 3 strings; used to check for each win condition
    function arrayIncludes(squareA, squareB, squareC) {
        const a = selectedSquares.includes(squareA)
        const b = selectedSquares.includes(squareB)
        const c = selectedSquares.includes(squareC)

        if (a === true && b === true && c === true) {return true}
    }
}

//Makes game unclickable for computer's turn.
function disableClick() {
    body.style.pointerEvents = 'none';
    setTimeout(function() {body.style.pointerEvents = 'auto';}, 1000); //re-enables clicking after 1 second
}

//Plays audio when things happen.
function audio(audioURL) {
    let audio = new Audio(audioURL);

    audio.play();
}

//Draws win lines when a player wins
function drawWinLine(coordX1, coordY1, coordX2, coordY2) {
    const canvas = document.getElementById('win-lines')
    const c = canvas.getContext('2d'); //gives access to method & properties to use on canvas

    //x1, y1 indicate starting point on x/y axis; x2, y2 indicate ending point; x, y story temp axis data for animation loop
    let x1 = coordX1, y1 = coordY1, x2 = coordX2, y2 = coordY2, x = x1, y = y1;

    function animateLineDrawing() {
        const animationLoop = requestAnimationFrame(animateLineDrawing); //creates a loop

        c.clearRect(0,0,608,608) //clears content from last loop iteration
        c.beginPath(); //begins new path
        c.moveTo(x1, y1); // moves to starting point for new line
        c.lineTo(x, y); //indicates the end point of the line
        c.lineWidth = 10;
        c.strokeStyle = 'rgba(70,255,33,.8)';
        c.stroke(); //draws the line as indicated above

        //checks if endpoint has been reached
        if (x1 <= x2 && y1 <= y2) {
            if (x < x2) { x += 10;} //adds 10 to previous x endpoint
            if (y < y2) { y += 10;} //adds 10 to previous y endpoint
            
            //cancels animation loop if endpoints are reached
            if (x >= x2 && y >= y2) {cancelAnimationFrame(animationLoop);}
        }

        //as above, but for 6, 4, 2 win condition
        if (x1 <= x2 && y1 >= y2) {
            if (x < x2) { x += 10;}
            if (y > y2) { y -= 10;}
            if (x >= x2 && y <= y2) {cancelAnimationFrame(animationLoop);}
        }
    }

    //clears canvas after win line is drawn
    function clear() {
        const animationLoop = requestAnimationFrame(clear);
        c.clearRect(0,0,608,608);
        cancelAnimationFrame(animationLoop);
    }

    disableClick();
    audio('./media/winGame.mp3');
    animateLineDrawing();
    setTimeout(function () { clear(); resetGame(); }, 1000);
}

//This function will reset the game in the event of a tie or win
function resetGame() {
    //This loop iterates through each HTML square element
    for (let i = 0; i < 9; i++) {
        let square = document.getElementById(String(i)); //gets HTML element of i
        square.style.backgroundImage = ''; //removes elements backgroundImage
    }

    selectedSquares = []; //resets array
}