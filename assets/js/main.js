// mobile sidebar slide gesture
var sidebar = document.getElementById('sidebar-wrapper')
var sidebarCheckbox = document.getElementById('hamburger-menu-checkbox')

let touchStartX = 0
let touchStartY = 0

let touchEndX = 0
let touchEndY = 0

let swipeThresholdX = 75
let swipeThresholdY = 50

document.addEventListener('touchstart', ev => {
    touchStartX = ev.changedTouches[0].screenX
    touchStartY = ev.changedTouches[0].screenY
}, false)

document.addEventListener('touchend', ev => {
    touchEndX = ev.changedTouches[0].screenX
    touchEndY = ev.changedTouches[0].screenY
    handleSwipeGesture()
}, false)

function handleSwipeGesture() {
    const swipeDistanceX = touchEndX - touchStartX
    const swipeDistanceY = Math.abs(touchEndY - touchStartY)

    if (swipeDistanceY < swipeThresholdY) {
        if (swipeDistanceX < -swipeThresholdX) {
            sidebarCheckbox.checked = false;
        } else if (swipeDistanceX > swipeThresholdX) {
            sidebarCheckbox.checked = true;
        }
    }
}

var sidebarOverlay = document.getElementById('sidebar-overlay')

sidebarOverlay.addEventListener('click', function () {
    sidebarCheckbox.checked = false
})
