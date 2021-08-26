// modal elements
const showModalButton = document.querySelector(".show-rules"),
      closeModalButton = document.querySelector(".modal__dialog-button"),
      modal = document.querySelector(".modal")

// show & hide modal
function toggleModal() {
  modal.classList.toggle("modal-show")
}

// hide the modal when click outside
function windowOnClick(event) {
  if(event.target === modal){
    toggleModal()
  }
}

// add function when the buttons/window are clicked
showModalButton.addEventListener("click", toggleModal)
closeModalButton.addEventListener("click", toggleModal)
window.addEventListener("click", windowOnClick)

////////// GAME //////////

// game elements
const gameButtons = Array.from(document.querySelector(".game__board").children),
      gameBoard = document.querySelector(".game__board"),
      resultBoard = document.querySelector(".result__board"),
      resultBox = document.querySelector(".result__box"),
      playerSelectionButton = document.querySelector(".player"),
      computerSelectionButton = document.querySelector(".computer"),
      restartButton = document.querySelector(".result__box-btn"),
      loader = document.querySelector(".result__board-wait"),
      resultText = document.querySelector(".result__box-text"),
      gameScore = document.querySelector(".score__board-number"),
      resetScoreButton = document.querySelector(".reset-score")

let playerSelection, computerSelection

// preserve the score on page refresh
let score = localStorage.getItem("score") ? (JSON.parse(localStorage.getItem("score"))) : 0
gameScore.textContent = score

// play the game when button is clicked
for (let elem of gameButtons) {
  elem.addEventListener("click", playGame)
}

if (score > 0) {
  resetScoreButton.style.display = "flex"
}

// get player selection and run game
function playGame(event) {
  playerSelection = event.currentTarget.className
  computerSelection = computerPlay()
  getResultGame(playerSelection, computerSelection)
  renderResultScreen()
}

// get computer selection
function computerPlay() {
  random = Math.floor(Math.random() * gameButtons.length)
  computerSelection = gameButtons[random].className
  return computerSelection
}

function getResultGame(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    result = undefined
  } else if (
      (playerSelection === "paper" && computerSelection === "rock") ||
      (playerSelection === "rock" && computerSelection === "scissors") ||
      (playerSelection === "scissors" && computerSelection === "paper")
    ) {
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
      resetScoreButton.style.display = "flex"
      break
    case false:
      resultText.textContent = "You Lose"
      computerSelectionButton.classList.add("is-winner")
      if (score != 0) {
        score--
        gameScore.textContent = score
      }
      break
  }

  // store the game score to preserve it
  localStorage.setItem("score", JSON.stringify(score))
}

function renderResultScreen() {
  gameBoard.style.display = "none"
  resultBoard.style.display = "flex"

  // add selected button to player selection
  playerSelectionButton.classList.add(`${playerSelection}`)

  // add computer selection after a delay
  setTimeout(function () {
    loader.style.display = "none"
    computerSelectionButton.style.display = "flex"
    computerSelectionButton.classList.add(`${computerSelection}`)

    // show result box after another delay
    setTimeout(function () {
      showResultGame()
      resultBoard.classList.add("result__finish")
      resultBox.style.display = "flex"

      if (score > 0) {
        resetScoreButton.style.display = "flex"
      }
    }, 200)
  }, 1000)
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
resetScoreButton.addEventListener('click', resetScore)

function resetScore() {
  score = 0
  gameScore.textContent = score
  localStorage.clear()
  resetScoreButton.style.display = ""
}
