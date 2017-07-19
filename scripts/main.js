// alert('Sergio says "It\'s better \nto use double quotes"');

function genRndNum() {
  return Math.floor(Math.random() * 100) + 1;
}

var answer = genRndNum();
console.log(answer);
var guessCount = 10;
var resetButton;

var guessLeft = document.querySelector('.guessLeft')
var guesses = document.querySelector('.guesses');
var lastResult = document.querySelector('.lastResult');
var lowOrHi = document.querySelector('.lowOrHi');

var guessSubmit = document.querySelector('.guessSubmit');
// var resetGame = document.querySelector('.resetGame');
var guessField = document.querySelector('.guessField');
var highscore = document.querySelector('#highscore');

guessField.focus();
// resetGame.style.display = 'none';

function checkGuess() {

  if (guessField.value === "") {
    return;
  }

  var userGuess = Number(guessField.value);

  if (userGuess < 1 || userGuess > 100 || isNaN(userGuess)) {
    lastResult.textContent = "You did not enter a valid guess."
    lastResult.style.backgroundColor = 'red';
    textInputReset();
    return;
  }

  if (guessCount === 10) {
    guesses.textContent = "Previous guess(es): ";
  };
  guesses.textContent += userGuess + ' ';


  if (answer === userGuess) {
    lastResult.textContent = "Congratulations!  You got it right!";
    lastResult.style.backgroundColor = 'green';
    lowOrHi.textContent = "";
    if (Number(highscore.textContent) < guessCount) {
      highscore.textContent = guessCount;
      lastResult.textContent += " You set a highscore!!"
    }
    setGameOver();
  } else if (guessCount === 1) {
      lastResult.textContent = "!!!!GAME OVER!!!!!!!";
      lastResult.style.backgroundColor = 'red';
      lowOrHi.textContent = "";
      setGameOver();
  } else {
    lastResult.textContent = "You guessed wrong!!"
    lastResult.style.backgroundColor = 'red';
    if (userGuess < answer) {
        lowOrHi.textContent = "Your guess is too low!";
    } else {
        lowOrHi.textContent = "Your guess is too high!";
    }
  }
  guessCount--;
  guessLeft.textContent = "You have " + guessCount + " guess(es) left."
  textInputReset();
}

function setGameOver() {
  guessSubmit.disabled = true;
  guessField.disabled = true;
  // resetGame.style.display = 'inline-block';
  resetButton = document.createElement('button');
  resetButton.textContent = "Start new game";
  document.querySelector('.form').appendChild(resetButton);
  // document.body.appendChild(resetButton);
  // document.getElementsByClassName('form')[0].appendChild(resetButton);
  resetButton.addEventListener('click', gameReset);
  resetButton.focus();
}

function gameReset() {
  // location.reload();
  // event.preventDefault();
  // event.stopImmediatePropagation();
  answer = genRndNum();
  console.log(answer);
  guessCount = 10;
  var resetParas = document.querySelectorAll('.resultParas p');
  for (var i = 0; i < resetParas.length; i++) {
    resetParas[i].textContent = "";
  }
  // guesses.textContent = '';
  // guessLeft.textContent = '';
  // lowOrHi.textContent = '';
  // lastResult.textContent = '';
  lastResult.style.backgroundColor = 'white';
  guessSubmit.disabled = false;
  guessField.disabled = false;
  guessField.value = "";
  guessField.focus();
  resetButton.parentNode.removeChild(resetButton); //parentNode calls the parent of the element.  Only the parent can remove the child.
  // document.querySelector('.form').removeChild(resetButton);
}

function enterSubmit(event) {
  // console.log("A Key Down event occurred " + event.keyCode);
  //if the key press was "Enter"
  event.preventDefault();
  if (event.keyCode === 13) {
    // console.log("Enter Key Up");
    guessSubmit.click();
  }
}

function textInputReset() {
  guessField.value = "";
  guessField.focus();
}

guessField.addEventListener('keyup', enterSubmit);
guessSubmit.addEventListener('click', checkGuess);
