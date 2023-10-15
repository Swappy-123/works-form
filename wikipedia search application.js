let inputEl = document.getElementById('searchInput');
let conEl = document.getElementById('searchResults');
let spinnerEl = document.getElementById('spinner');

function createAndAppend(result) {
    //creating item container 
    let containerEl = document.createElement('div');
    containerEl.classList.add('result-item');
    conEl.appendChild(containerEl);

    //creating title 
    let {
        link,
        title,
        description
    } = result;
    let titleEl = document.createElement('a');
    titleEl.href = link;
    titleEl.target = '_blank';
    titleEl.textContent = title;
    titleEl.classList.add('result-title');
    containerEl.appendChild(titleEl);

    //creating break
    let titlebreakEl = document.createElement('br');
    containerEl.appendChild(titlebreakEl);

    //creating url
    let urlEl = document.createElement('a');
    urlEl.href = link;
    urlEl.target = '_blank';
    urlEl.ttextContent = link;
    urlEl.classList.add('result-url');
    containerEl.appendChild(urlEl);

    //creating break
    let urlbreakEl = document.createElement('br');
    containerEl.appendChild(urlbreakEl);

    //creating description
    let desEl = document.createElement('p');
    desEl.textContent = description;
    desEl.classList.add('link-description');
    containerEl.appendChild(desEl)
}

function displayResults(search) {
    spinnerEl.classList.toggle('d-none')
    for (let result of search) {
        createAndAppend(result);
    }
}

function wikipedia(event) {
    if (event.key === 'Enter') {
        spinnerEl.classList.toggle('d-none')
        conEl.textContent = '';
        let searchInput = inputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        };

        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });
    }
}

inputEl.addEventListener('keydown', wikipedia);