const toggle = document.querySelector(".button"),
      modal = document.querySelector(".modal"),
      close = document.querySelector(".modal__dialog-button")

toggle.addEventListener("click", function() {
  modal.classList.add("modal-open")
})

close.addEventListener("click", function() {
  modal.classList.remove("modal-open")
})
