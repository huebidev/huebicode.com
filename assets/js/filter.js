// show aside-wrapper when javascript available
let jsActiveAsideWrapper = document.getElementById("js-active-aside-wrapper")
jsActiveAsideWrapper.style.display = 'block'
let filterButton = document.getElementById("filter-button")
filterButton.style.display = ""

// mobile filter button
function toggle_filter() {
    if (jsActiveAsideWrapper.style.maxHeight === "1000px") {
        filterButton.style.color = "rgb(220,220,220)"
        jsActiveAsideWrapper.style.maxHeight = 0
        jsActiveAsideWrapper.style.transition = "max-height 0.3s ease-out"
        clear_filter()
    }
    else {
        filterButton.style.color = "rgb(23,182,255)"
        jsActiveAsideWrapper.style.maxHeight = "1000px"
        jsActiveAsideWrapper.style.transition = "max-height 0.3s ease-in"
    }
}

// reset search bar
window.addEventListener('pageshow', function() {
    var searchInputs = document.querySelectorAll('input[type="search"]')

    searchInputs.forEach(function(searchInput) {
        searchInput.value = ''
    })
})


// focus wrapper on search input click
const searchWrapper = document.getElementById('search-bar-wrapper')
const searchInput = document.getElementById('search-input')

searchInput.addEventListener('focus', () => {
    searchWrapper.classList.add('input-focused')
    clear_filter()
})

searchInput.addEventListener('blur', () => {
    searchWrapper.classList.remove('input-focused')
})

const blogWrapper = document.getElementById('blog-wrapper')
const searchResultsContainer = document.getElementById('search-results-container')
searchInput.addEventListener('input', () => {
    if (searchInput.value) {
        clearButton.classList.add('visible')
        blogWrapper.setAttribute('hidden', '')
        searchResultsContainer.removeAttribute('hidden')
    } else {
        clearButton.classList.remove('visible')
        searchResultsContainer.setAttribute('hidden', '')
        blogWrapper.removeAttribute('hidden')
    }
})


// search buttons
const glassButton = document.getElementById('glass-button')
const clearButton = document.getElementById('clear-button')

glassButton.addEventListener('click', () => {
    searchInput.focus()
})

clearButton.addEventListener('click', () => {
    emulateUserInput(searchInput, '')
    searchInput.focus()
})

function emulateUserInput(element, newValue) {
    element.value = newValue

    const event = new Event('input', { bubbles: true, cancelable: true })
    element.dispatchEvent(event)
}


// checkboxes
const checkboxes = document.querySelectorAll('input[type="checkbox"]')

window.addEventListener('pageshow', () => {
    resetCheckboxes()
})

function resetCheckboxes() {
    checkboxes.forEach(function(checkbox) {
        checkbox.checked = false
    })
}


const tagHover = document.getElementsByClassName("tag")
for(let i = 0; i < tagHover.length; i++) {
    tagHover[i].style.pointerEvents = "auto"
}


const filterTagLabels = document.getElementById("filter-ul-tags").getElementsByTagName("label")
const filterTagCheckboxes = document.getElementById("filter-ul-tags").getElementsByTagName("input")
const filterYearLabels = document.getElementById("filter-ul-years").getElementsByTagName("label")
const filterYearCheckboxes = document.getElementById("filter-ul-years").getElementsByTagName("input")

const h2 = document.getElementsByClassName("blog-year")
const blogEntries = document.getElementsByClassName("blog-post")

const tagsArr = new Array()
get_all_tags()

const yearsArr = new Array()
get_all_years()

let yearsArrChbx = new Array()
let tagsArrChbx = new Array()

add_years_filterbox()
add_tags_filterbox()


const nothingFoundDiv = document.getElementById("nothing-found")
nothingFoundDiv.style.display = 'none'

function filter_blog(filter_year_arr, filter_tags_arr) {
    const updateBlogView = () => {
        
        for (let i = 0; i < h2.length; i++) {
            h2[i].style.display = "none"
        }
    
        if (filter_tags_arr.length !== 0 || filter_year_arr.length !== 0) {
    
            for (let i = 0; i < blogEntries.length; i++) {
    
                blogEntries[i].style.display = "none"
    
                const arrContainsAllElems = (srcArr, dstArr) => dstArr.every(v => srcArr.includes(v))
    
                const localTags = blogEntries[i].getElementsByClassName("tag")
                const localYear = blogEntries[i].getElementsByTagName("time")[0].innerText.trim()
                const localTagsArr = []
    
                for (let j = 0; j < localTags.length; j++) {
                    localTagsArr.push(localTags[j].innerText.trim())
                }
    
                if (filter_year_arr.length !== 0) {
                    for (let yarr = 0; yarr < filter_year_arr.length; yarr++) {
                        if (arrContainsAllElems(localTagsArr, filter_tags_arr) && localYear.includes(filter_year_arr[yarr])) {
                            blogEntries[i].style.display = ""
                        }
                    }
                }
                else {
                    if (arrContainsAllElems(localTagsArr, filter_tags_arr)) {
                        blogEntries[i].style.display = ""
                    }
                }
            }
        }
        else {
            for (let i = 0; i < blogEntries.length; i++) {
                blogEntries[i].style.display = ""
            }
        }
    
        let visibleCounter = 0;
        for (let i = 0; i < blogEntries.length; i++) {
            if (blogEntries[i].style.display === "") {
                visibleCounter++;
                let dateFilter = blogEntries[i].getElementsByTagName("time")[0].dateTime.substring(0, 4)
                for (let j = 0; j < h2.length; j++) {
                    if (h2[j].innerText.trim().includes(dateFilter)) {
                        h2[j].style.display = ""
                    }
                }
            }
        }
        if (visibleCounter === 0) {
            nothingFoundDiv.style.display = ''
            blogWrapper.setAttribute('hidden', '')
        } else {
            nothingFoundDiv.style.display = 'none'
            blogWrapper.removeAttribute('hidden')
        }
    }

    if (document.startViewTransition) {
        document.startViewTransition(updateBlogView)
    } else {
        updateBlogView()
    }
}


function get_all_tags() {

    const tagSet = new Set()

    for (let i = 0; i < blogEntries.length; i++) {
        for (let j = 0; j < blogEntries[i].getElementsByClassName("tag").length; j++) {
            tagSet.add(blogEntries[i].getElementsByClassName("tag")[j].innerText.trim())
        }
    }

    for (let key of tagSet) {
        tagsArr.push(key)
    }

    tagsArr.sort()
}


function get_all_years() {
    for (let i = 0; i < h2.length; i++) {
        yearsArr.push(h2[i].innerText.trim())
    }
}


function filter_tags(element) {
    clear_filter()
    toggle_filter()
    tagsArrChbx.push(element.innerText.trim())
    
    const elementArr = [element.innerText.trim()]
    
    for (let i = 0; i < filterTagCheckboxes.length; i++) {
        if (filterTagCheckboxes[i].id === element.innerText.trim()) {
            filterTagCheckboxes[i].checked = true
            filterTagLabels[i].className = "filter-label-checked"
        }
    }

    filter_blog([], elementArr)
}


function clear_filter() {
    for (let i = 0; i < filterTagCheckboxes.length; i++) {
        filterTagCheckboxes[i].checked = false
        filterTagLabels[i].className = "filter-label-unchecked"
    }

    for(let i = 0; i < filterYearCheckboxes.length; i++){
        filterYearCheckboxes[i].checked = false
        filterYearLabels[i].className = "filter-label-unchecked"
    }

    yearsArrChbx.length = 0
    tagsArrChbx.length = 0
    filter_blog(yearsArrChbx, tagsArrChbx)
}

function createFilterBox(arrayType, arrayChbx, ulId) {
    const ul = document.getElementById(ulId)

    arrayType.forEach( item => {
        const li = document.createElement("li")

        const checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        checkbox.id = item
        checkbox.className = "checkbox-filter"
        checkbox.name = item

        const label = document.createElement("label")
        label.htmlFor = item
        label.className = "filter-label-unchecked"
        label.appendChild(document.createTextNode(item))

        const anchor = document.createElement("a")
        anchor.appendChild(label)

        li.appendChild(checkbox)
        li.appendChild(anchor)
        ul.appendChild(li)

        checkbox.addEventListener('change', function() {
            if (checkbox.checked) {
                emulateUserInput(searchInput, '')
                label.className = "filter-label-checked"
                if (!arrayChbx.includes(item)) {
                    arrayChbx.push(item);
                }
            } else {
                label.className = "filter-label-unchecked"
                const index = arrayChbx.indexOf(item)
                if (index > -1) {
                    arrayChbx.splice(index, 1)
                }
            }
            filter_blog(yearsArrChbx, tagsArrChbx)
        })
    })
}

function add_years_filterbox() {
    createFilterBox(yearsArr, yearsArrChbx, "filter-ul-years");
}

function add_tags_filterbox() {
    createFilterBox(tagsArr, tagsArrChbx, "filter-ul-tags");
}

function areAllCheckboxesUnchecked() {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    return Array.from(checkboxes).every(checkbox => !checkbox.checked);
}