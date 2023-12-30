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

// highlight the current section in a table of contents outline
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('h3, h4')
    const navLinks = document.querySelectorAll('#outline dt a, #outline dd a')

    const scrolled = window.scrollY
    const viewportHeight = window.innerHeight
    const totalHeight = document.documentElement.scrollHeight
    let bottomReached = false

    if (scrolled + viewportHeight >= totalHeight) {
        bottomReached = true
    }

    let currentSection = ''
    sections.forEach(section => {
        const sectionTop = section.offsetTop
        if (scrolled >= sectionTop - 120) {
            currentSection = section.getAttribute('id')
        }
    })

    if (bottomReached) {
        navLinks.forEach(link => link.classList.remove('active-toc'))
        navLinks[navLinks.length - 1].classList.add('active-toc')
    } else {
        navLinks.forEach(link => {
            link.classList.remove('active-toc')
            if (link.getAttribute('href').substring(1) === currentSection) {
                link.classList.add('active-toc')
            }
        })
    }
})
