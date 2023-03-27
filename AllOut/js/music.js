
function beat(audio) {
    var x = document.getElementById(audio);
    var icon = document.querySelector('.mute-icon i');

    if (x.paused || x.ended) {
        x.play();
        icon.classList.remove('fa-volume-mute');
        icon.classList.add('fa-volume-up');
    } else {
        x.pause();
        icon.classList.remove('fa-volume-up');
        icon.classList.add('fa-volume-mute');
    }
}
document.querySelector('.mute-icon').addEventListener('click', function () {
    beat('bg-music');

});
/* Ha leáll a zene újrakezdi */
document.getElementById('bg-music').addEventListener('ended', function () {
    this.currentTime = 0;
    this.play();
});
