const btnShowModal = document.querySelector(".button"),
      btnCloseModal = document.querySelector(".modal__dialog-button"),
      modal = document.querySelector(".modal")

// show / hide the rules modal
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
window.addEventListener('click', windowOnClick)

////////// GAME //////////

// create game elements
const gameElements = {
  gameButtons: Array.from(document.querySelector(".game__board").children)
};

let RESULT = 0

console.log(gameElements.gameButtons) // !! TESTING

// play the round when button is clicked
for (let elem of gameElements.gameButtons) {
  elem.addEventListener("click", function() {
    console.log("clicked")
  });
}
