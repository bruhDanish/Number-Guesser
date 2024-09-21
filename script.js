let randomNum = parseInt(Math.random()*10 + 1);
console.log(randomNum);

const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowHigh= document.querySelector('.lowOrHigh');
const startOver= document.querySelector('.resultParas');

const p = document.createElement('p');

let prevGuess = [];

let numGuesses = 0;

let playGame = true;

if (playGame) {
    submit.addEventListener('click', function (e){
        e.preventDefault();
        const guess = parseInt(userInput.value);
        console.log(guess);
        
        validateGuess(guess);    
    })
}

function validateGuess(guess){
    if (isNaN(guess)) {
        alert(`Please enter a valid number`)        
    }else if(guess < 1){
        displayMsg(`Please enter a number greater than 1`)
    }else if(guess > 10){
        displayMsg(`Please enter a number less than 10`)
    }else{
        displayMsg('');
        prevGuess.push(guess);
        
        if(numGuesses === 11 && guess !== randomNum){
            displayGuess(guess);
            displayMsg(`Game over. Random number was, ${randomNum}`);
            endGame();
        }else{
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(guess){
    if (guess === randomNum) {
        displayMsg(`You win!`)
        endGame();
    }else if( guess < randomNum){
        displayMsg('Your guess is much lesser.')
    }else if (guess > randomNum) {
        displayMsg("Your guess is much Greater.")
    }
}

function displayGuess(guess) {
    userInput.value = '';
    guessSlot.innerHTML += `${guess}  `;
    numGuesses++;
    remaining.innerHTML = `${11 - numGuesses}`;
}

function displayMsg(message) {
    lowHigh.innerHTML = `<h2>${message}</h2>`;

    lowHigh.style.padding = '10px';
    lowHigh.style.backgroundColor = '#777';
    lowHigh.style.borderRadius = '5px';
}

function endGame(){
    userInput.value = '';
    userInput.setAttribute('disabled', '');
    p.classList.add('button');
    p.innerHTML = `<h2 id='newGame'>Start new game</h2>`;
    startOver.appendChild(p);
    playGame = false;

    p.style.backgroundColor = '#777'
    p.style.padding = '10px';
    p.style.borderRadius = '5px';
    p.style.cursor = 'pointer';

    newGame();
}

function newGame() {
    const newGame = document.querySelector('#newGame');
    newGame.addEventListener('click', function(e) {
        randomNum = parseInt(Math.random()*10 + 1);
        console.log(randomNum);
        
        prevGuess = [];
        numGuesses = 0;
        guessSlot.innerHTML = '';
        remaining.innerHTML = `${11 - numGuesses}`;
        userInput.removeAttribute('disabled');
        startOver.removeChild(p);
        displayMsg('');
        lowHigh.style = '';
        
        playGame = true;        
    })
}
