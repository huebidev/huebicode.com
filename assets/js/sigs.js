const searchWrapper = document.getElementById('search-bar-wrapper')
const searchInput = document.getElementById('search-input')

searchInput.addEventListener('focus', () => {
    searchWrapper.classList.add('input-focused')
})

searchInput.addEventListener('blur', () => {
    searchWrapper.classList.remove('input-focused')
})

var xhr = new XMLHttpRequest()
xhr.open('GET', 'sigs.xml', true)
xhr.send()

let list = []
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        let xmlDoc = xhr.responseXML
        let offsetElements = xmlDoc.getElementsByTagName('offset')

        for (let i = 0; i < offsetElements.length; i++) {
            let offset = offsetElements[i].getAttribute('at')
            let matchElements = offsetElements[i].getElementsByTagName('match')

            for (let j = 0; j < matchElements.length; j++) {
                list.push({
                    offset: offset,
                    bytes: matchElements[j].getAttribute('bytes'),
                    info: matchElements[j].getAttribute('info'),
                    cat: matchElements[j].getAttribute('cat'),
                    os: matchElements[j].getAttribute('os'),
                    ext: matchElements[j].getAttribute('ext')
                })
            }
        }
        onSigsLoaded()
    }
}

let gridApi
function onSigsLoaded() {
    const gridOptions = {
        rowData: list,
        animateRows: false,

        defaultColDef: {
            flex: 1,
            filter: true,
        },
        
        columnDefs: [
            { field: "offset", cellStyle: { 'text-align': 'left' }, flex: 1, comparator: (a, b) => parseInt(a) - parseInt(b)},
            { field: "bytes", cellStyle: { 'text-align': 'left' }, flex: 3, sort: 'asc'},
            { field: "info", cellStyle: { 'text-align': 'left' }, flex: 3},
            { field: "cat", cellStyle: { 'text-align': 'left' }, headerName: 'Category'},
            { field: "os", cellStyle: { 'text-align': 'left' }, headerName: 'OS'},
            { field: "ext", cellStyle: { 'text-align': 'left' }, headerName: 'Extension'}
        ],

        onGridReady: function (params) {
            gridApi = params.api
            updateRowCount()

            document.getElementById('search-input').addEventListener('input', function() {
                gridApi.setGridOption('quickFilterText', this.value)
            })
        },

        onFilterChanged: updateRowCount,
       }
    
    const myGridElement = document.querySelector('#myGrid')
    agGrid.createGrid(myGridElement, gridOptions)
}

function updateRowCount() {
    const rowCount = gridApi.getDisplayedRowCount();
    const text = rowCount === 1 ? 'file signature' : 'file signatures';
    document.getElementById('file-sigs-count').innerHTML = `${rowCount} ${text}`;
}
