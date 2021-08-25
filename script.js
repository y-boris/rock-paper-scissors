const btnShowModal = document.querySelector(".button"),
      btnCloseModal = document.querySelector(".modal__dialog-button"),
      modal = document.querySelector(".modal")

// show & hide the rules modal
function toggleModal() {
  modal.classList.toggle("modal-open")
}

// hide the rules when user clicks outside the modal window
function windowOnClick(event) {
  if(event.target === modal){
      toggleModal()
  }
}

// add function when the buttons/window are clicked
btnShowModal.addEventListener("click", toggleModal)
btnCloseModal.addEventListener("click", toggleModal)
window.addEventListener("click", windowOnClick)

////////// GAME //////////

// create game elements

const gameButtons = Array.from(document.querySelector(".game__board").children)
const gameBoard = document.querySelector(".game__board")
const resultBoard = document.querySelector(".result__board")
const resultBox = document.querySelector(".result__box")
const playerSelectionButton = document.querySelector(".player")
const computerSelectionButton = document.querySelector(".computer")
const restartButton = document.querySelector(".result__box-btn")
const loader = document.querySelector(".result__board-wait")
const resultText = document.querySelector(".result__box-text")
const gameScore = document.querySelector(".score__board-number")
const resetScoreButton = document.querySelector(".reset-score")

let playerSelection, computerSelection
let result = false
let score = 0

// console.log(gameButtons) // !! TESTING

// play the round when button is clicked
for (let elem of gameButtons) {
  elem.addEventListener("click", playGame)
}

// get player selection and run game
function playGame(event) {
  playerSelection = event.currentTarget.className
  computerSelection = computerPlay()
  getResultGame(playerSelection, computerSelection)
  renderResultScreen()

  // console.log("player - ", playerSelection) // !! TESTING
  // console.log("computer - ", computerSelection) // !! TESTING
}

// get computer selection
function computerPlay() {
  random = Math.floor(Math.random() * gameButtons.length)
  computerSelection = gameButtons[random].className
  return computerSelection
}

// compare the selections and get the result
function getResultGame(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    result = undefined
  } else if (playerSelection === "paper" && computerSelection === "rock") {
    result = true
  } else if (playerSelection === "rock" && computerSelection === "scissors") {
    result = true
  } else if (playerSelection === "scissors" && computerSelection === "paper") {
    result = true
  } else {
    result = false
  }

  return result
}

// print the result and increment score for win, decrement score for loss
function showResultGame() {
  switch(result) {
    case undefined:
      resultText.textContent = "Draw"
      break
    case true:
      resultText.textContent = "You Win"
      playerSelectionButton.classList.add("is-winner")
      score++
      gameScore.textContent = score
      break
    case false:
      resultText.textContent = "You Lose"
      computerSelectionButton.classList.add("is-winner")
      score--
      gameScore.textContent = score
      break
  }
}

function renderResultScreen() {
  gameBoard.style.display = "none"
  resultBoard.style.display = "flex"

  // add selected button to player selection
  playerSelectionButton.classList.add(`${playerSelection}`)
  // console.log("###### player pick:", playerSelection) // !! TESTING

  // add computer selection after a delay
  setTimeout(function () {
    loader.style.display = "none"
    computerSelectionButton.style.display = "flex"
    computerSelectionButton.classList.add(`${computerSelection}`)
    // console.log("###### computer pick:", computerSelection) // !! TESTING

    // show result box after another delay
    setTimeout(function () {
      showResultGame()
      resultBoard.classList.add("result__finish")
      resultBox.style.display = "flex"
      // console.log("#### RESULT GAME:", result) // !! TESTING
      // console.log("#### RESULT TEXT:", resultText.textContent) // !! TESTING
    }, 200)
  }, 200)
}

// play another game when "play again" is clicked
restartButton.addEventListener("click", restartGame)

// hide result screen and reset all to default screen
function restartGame() {
  gameBoard.style.display = ""
  resultBoard.style.display = ""
  loader.style.display = ""
  computerSelectionButton.style.display = ""
  resultBox.style.display = ""

  playerSelectionButton.classList.remove(`${playerSelection}`)
  computerSelectionButton.classList.remove(`${computerSelection}`)

  resultBoard.classList.remove("result__finish")
  computerSelectionButton.classList.remove("is-winner")
  playerSelectionButton.classList.remove("is-winner")
}

// reset score when reset button is clicked
resetScoreButton.addEventListener('click', resetScore);

function resetScore() {
  score = 0
  gameScore.textContent = score
}
