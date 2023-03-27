const fileInput = document.getElementById('fileInput');
const container = document.getElementById('container');

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];

    // check if file is an image
    if (!file.type.startsWith('image/')) {
        window.alert('Csak képet tölthetsz fel!');
        return;
    }

    const reader = new FileReader();

    reader.addEventListener('load', (event) => {
        container.style.backgroundImage = `url(${event.target.result})`;
    });

    reader.readAsDataURL(file);
});
