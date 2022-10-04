'use strict';

// Selecting elements:
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
const score0Element = document.querySelector('#score--0');
const score1Element = document.getElementById('score--1');
const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');

const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing; // we let variables live out here and then reassign their values in the initialization function below:
// declaring variables is not the same as assigning them a value!!! in the function below we only assign them a value, but they still live outside in line above, that's why they are then accessible in every function everywhere.

// Starting conditions:
const initialization = function () {
  scores = [0, 0]; //this means the game starts with 0 points for both players
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0Element.textContent = 0; //this sets the game starting score to 0
  score1Element.textContent = 0; //this sets the game starting score to 0
  current0Element.textContent = 0;
  current1Element.textContent = 0;

  diceElement.classList.add('hidden'); //this adds class "hidden" to dice element
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
  player0Element.classList.add('player--active');
  player1Element.classList.remove('player--active');
};
initialization();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; //This allows to switch active players.
  player0Element.classList.toggle('player--active'); //this switches the white background to the active player side
  player1Element.classList.toggle('player--active'); //this switches the white background to the active player side
};

/* Starting to implement game functionality:
Rolling dice functionality: */
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.Generating a random dice roll:
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2.Display the rolled dice on screen:
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${dice}.png`;

    //3.If the player rolled 1, switch to next player:
    if (dice !== 1) {
      //IF the rolled DICE IS NOT 1...
      currentScore += dice; //..add dice score to current score!
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //IF the rolled DICE IS 1, switch to the next player:
      switchPlayer();
    }
  }
});
//Holding the score. So player rolls the dice, gets a score and to not lose the score [in case player rolls 1], they can hold it and next time add to the score
btnHold.addEventListener('click', function () {
  if (playing) {
    //1.add current score to active players total score
    scores[activePlayer] += currentScore; // <== scores[1] = scores[1] + currentScore <-- player1 score equals player1 score + currentScore(the one player1 just rolled on dice)
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2.Check if player's score is >= 100 <-- at least 100
    if (scores[activePlayer] >= 100) {
      //Finish game
      playing = false;
      diceElement.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //Switch to next player if score is not atleast 100
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', initialization);