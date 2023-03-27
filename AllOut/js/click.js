document.addEventListener('click', () => {
    const audioo = new Audio('sounds/click.mp3');
    audioo.play();
});

const links = document.querySelectorAll('a[href]');
links.forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        setTimeout(() => {
            window.location.href = link.getAttribute('href');
        }, 200);
    });
});
