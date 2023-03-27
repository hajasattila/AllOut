/* jshint esversion: 6 */
document.addEventListener("DOMContentLoaded", () => {
    const input = document.querySelector(".input");
    const acceptButton = document.getElementById("username");
    const medium = document.getElementById("medium");
    const hard = document.getElementById("hard");

    const username = "";

    acceptButton.addEventListener("click", () => {
        const username = input.value;
        if (username.length < 4) {
            shakeScreen(); // Call shakeScreen() function if username is too short
            const toast = document.getElementById("toast"); // Get the toast element
            toast.classList.add("active"); // Add the "active" class to show the toast
            setTimeout(() => {
                toast.classList.remove("active"); // Remove the "active" class after 5 seconds
            }, 2000);
        } else {
            localStorage.setItem("uname", username);
            window.location.href = "game.html";
        }
    });

    medium.addEventListener("click", () => {
        const username = input.value;
        if (username.length < 4) {
            shakeScreen(); // Call shakeScreen() function if username is too short
            const toast = document.getElementById("toast"); // Get the toast element
            toast.classList.add("active"); // Add the "active" class to show the toast
            setTimeout(() => {
                toast.classList.remove("active"); // Remove the "active" class after 5 seconds
            }, 2000);
        } else {
            localStorage.setItem("uname", username);
            window.location.href = "medium.html";
        }
    });
    hard.addEventListener("click", () => {
        const username = input.value;
        if (username.length < 4) {
            shakeScreen(); // Call shakeScreen() function if username is too short
            const toast = document.getElementById("toast"); // Get the toast element
            toast.classList.add("active"); // Add the "active" class to show the toast
            setTimeout(() => {
                toast.classList.remove("active"); // Remove the "active" class after 5 seconds
            }, 2000);
        } else {
            localStorage.setItem("uname", username);
            window.location.href = "hard.html";
        }
    });

    setTimeout(() => {
        if (!localStorage.getItem("uname")) {
            input.classList.add("active");
        }
    }, 1500);
    const audio = new Audio('sounds/error.mp3');
    function shakeScreen() {
        document.body.classList.add("shake"); // Add the "shake" class to the body
        audio.play();
        setTimeout(() => {
            document.body.classList.remove("shake"); // Remove the "shake" class after the animation is complete
            audio.pause(); // stop the sound when the toast message is removed
            audio.currentTime = 0; // reset the sound to the beginning
        }, 1000);
    }
});

/* Toast */
const toast = document.getElementById("toast");
const closeBtn = document.getElementById("close");


openBtn.addEventListener("click", () => {
    if (username.length < 4) {
        toast.classList.add("active");
        setTimeout(() => {
            toast.classList.remove("active");
        }, 2000)
    }
})

closeBtn.addEventListener("click", () => {
    toast.classList.remove("active");
    audio.pause(); // stop the sound when the toast message is removed
    audio.currentTime = 0; // reset the sound to the beginning
})
