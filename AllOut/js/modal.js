var modal = document.getElementById('name');
var closeButton = document.querySelector('.modal__close');
var modalLink = document.querySelector('.content a');

// Function to open the modal
function openModal() {
    modal.style.display = "flex";
    modal.classList.add('fade-in');
}

// Function to close the modal
function closeModal() {
    modal.classList.remove('fade-in');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 500);
}

// Add event listeners to open the modal when either link is clicked
modalLink.addEventListener('click', openModal);

// Add event listeners to close the modal
closeButton.addEventListener('click', closeModal);
window.addEventListener('click', function (event) {
    if (event.target == modal) {
        closeModal();
    }
});

