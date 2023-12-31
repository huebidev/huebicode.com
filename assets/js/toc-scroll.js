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
