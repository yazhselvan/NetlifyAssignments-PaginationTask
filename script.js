let currentPage = 1;
const url = "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json"
const data = fetchData(url);
const itemsPerPage = 10;

function fetchData(url) {
    return fetch(url)
      .then(response => response.json())
      .catch(error => console.error('Error fetching data:', error));
}

function fetchDataAndDisplay() {
    fetchData("https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json")
        .then(data => {
            if (data) {
                displayTableData(data);
                setupPagination(data.length);
            }
        });
}

function createTableAndHeaders(){
    const Heading = document.createElement('h1');
    Heading.innerHTML = "Pagination Task";
    Heading.id = "title";

    const taskDescription = document.createElement('p');
    taskDescription.id = 'description';
    taskDescription.innerHTML = `The below table fetches data from the given URL and displays in Pagination style.`

    const urlLinkParagraph = document.createElement('p');
    const urlLink = document.createElement("a");
    urlLink.setAttribute("href", url);
    urlLink.setAttribute("target", "_blank")
    urlLink.innerText = "Click this to navigate to the JSON data"
    urlLinkParagraph.append(urlLink);


    const tableHolder = document.createElement('div');
    tableHolder.className = "table-responsive";


    const masterTable = document.createElement("table");
    masterTable.className = 'table table-bordered table-success';
    masterTable.id = "table"
    

    const tableHeader = document.createElement("thead");
    const tableBody = document.createElement("tbody");
    
    
    const tableRow = document.createElement("tr");
    tableRow.className = "table-active";

    const tableHeaderData_memberID = document.createElement('th');
    tableHeaderData_memberID.setAttribute("scope", "col");
    tableHeaderData_memberID.innerHTML = "ID"

    const tableHeaderData_name = document.createElement('th');
    tableHeaderData_name.setAttribute("scope", "col");
    tableHeaderData_name.innerHTML = "Name"

    const tableHeaderData_email = document.createElement('th');
    tableHeaderData_email.setAttribute("scope", "col");
    tableHeaderData_email.innerHTML = "Email ID"

    tableHolder.append(masterTable);
    masterTable.append(tableHeader, tableBody);
    tableHeader.append(tableRow);
    tableRow.append(tableHeaderData_memberID, tableHeaderData_name, tableHeaderData_email);
    document.body.append(Heading,taskDescription, urlLinkParagraph, tableHolder);
}

function createPagination(){
    const paginationElement = document.createElement("div");
    paginationElement.className = "d-flex justify-content-center";
    paginationElement.id = "buttons";
    document.body.append(paginationElement);
}

async function displayTableData(data) {
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const tbody = document.querySelector("#table tbody");

    tbody.innerHTML = '';

    for (let i = startIndex; i < endIndex && i < data.length; i++) {
        const item = data[i];
        const row = document.createElement('tr');
        row.innerHTML = `<td>${item.id}</td><td>${item.name}</td><td>${item.email}</td>`;
        tbody.appendChild(row);
    }
}  

async function setupPagination(totalItems) {
    
    const paginationElement = document.getElementById('buttons');
    paginationElement.innerHTML = '';

    const firstButton = document.createElement('li');
        firstButton.classList.add('page-item');
        const firstLink = document.createElement('a');
        firstLink.classList.add('page-link');
        firstLink.href = '#';
        firstLink.innerText = 'First';
        firstLink.addEventListener('click', () => {
            currentPage = 1;
            fetchDataAndDisplay();
        });
        firstButton.appendChild(firstLink);
        paginationElement.appendChild(firstButton);

    const prevButton = document.createElement('li');
        prevButton.classList.add('page-item');
        const prevLink = document.createElement('a');
        prevLink.classList.add('page-link');
        prevLink.href = '#';
        prevLink.innerText = 'Previous';
        prevLink.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                fetchDataAndDisplay();
            }
        });
        prevButton.appendChild(prevLink);
        paginationElement.appendChild(prevButton);

    

    const nextButton = document.createElement('li');
    nextButton.classList.add('page-item');
    const nextLink = document.createElement('a');
    nextLink.classList.add('page-link');
    nextLink.href = '#';
    nextLink.innerText = 'Next';
    nextLink.addEventListener('click', () => {
        if (currentPage < pageCount) {
            currentPage++;
            fetchDataAndDisplay();
        }
    });
    nextButton.appendChild(nextLink);
    paginationElement.appendChild(nextButton);

    const pageCount = Math.ceil(totalItems / itemsPerPage);
    const lastButton = document.createElement('li');
        lastButton.classList.add('page-item');
        const lastLink = document.createElement('a');
        lastLink.classList.add('page-link');
        lastLink.href = '#';
        lastLink.innerText = 'Last';
        lastLink.addEventListener('click', () => {
            currentPage = pageCount;
            fetchDataAndDisplay();
        });
        lastButton.appendChild(lastLink);
        paginationElement.appendChild(lastButton);
}

function highlightActiveButton() {
    const paginationButtons = document.querySelectorAll('.pagination button');
    paginationButtons.forEach(button => {
        button.classList.remove('active');
        if (parseInt(button.innerText) === currentPage) {
            button.classList.add('active');
        }
    });
}

createTableAndHeaders();
createPagination();
fetchDataAndDisplay();

