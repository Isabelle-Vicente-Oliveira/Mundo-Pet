const buttonOpen = document.querySelector("#openModal")
const modal = document.querySelector("dialog")
const buttonClose = document.querySelector("dialog button")

buttonOpen.onclick = function () {
    modal.showModal()
}

buttonClose.onclick = function () {
    modal.close()
}

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.close();
    }
});