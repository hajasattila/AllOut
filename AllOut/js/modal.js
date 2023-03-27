var modal = document.getElementById('name');
var closeButton = document.querySelector('.modal__close');
var modalLink = document.querySelector('.content a');
// When the user clicks on the link, open the modal
document.querySelector('.content a').onclick = function () {
    modal.style.display = "flex";
    modal.classList.add('fade-in');
}

// When the user clicks outside of the modal or the close button, close it
window.onclick = function (event) {
    if (event.target == modal || event.target == closeButton) {
        modal.classList.remove('fade-in');
        modal.style.display = "none";
        modal.classList.remove('fade-in');
    }
}