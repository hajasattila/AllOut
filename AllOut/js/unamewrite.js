const usernameElement = document.getElementById("username"); // az adott HTML elem, amibe be akarod írni a tárolt adatot
const storedUsername = localStorage.getItem("uname"); // lekérjük a tárolt adatot
usernameElement.textContent = storedUsername; // beillesztjük a tárolt adatot az elembe