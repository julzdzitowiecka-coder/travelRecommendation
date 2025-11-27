const SearchForm = document.getElementById('SearchForm');
const resuts = document.getElementById('resuts');

SearchForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const query = SearchForm.querySelector('input[type="search"]').value;
    if (query) {
        generateReport(query);
    } else {
        alert('Please enter a search term.');
    }
});

function generateReport(query) {
    const input = query.trim().toLowerCase();
    fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
        const countries = [];  
        switch (input) {
            case 'beaches': 
                data.beaches.forEach(element => {
                    countries.push({
                        city: element.name,
                        description: element.description,
                        imageUrl: element.imageUrl
                    });
                });
                break;
            case 'temples': 
                data.temples.forEach(element => {
                    countries.push({
                        city: element.name,
                        description: element.description,
                        imageUrl: element.imageUrl
                    });
                });
                break;
            default: {
                const country = data.countries.find(item => item.name.toLowerCase().includes(input));
                country.cities.forEach(element => {
                    countries.push({
                        city: element.name,
                        description: element.description,
                        imageUrl: element.imageUrl 
                    });
                });
            }
        }

        
        if (countries.length > 0)  {
            displayResults(countries);
        } else {
            resuts.innerHTML = '<p>No results found. Please try a different search term.</p>';
        }
    });
}
function displayResults(arrays) {
    resuts.innerHTML = '';
    arrays.forEach(item => {
        const countryDiv = document.createElement('div');
        countryDiv.classList.add('country-result');
        countryDiv.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.city}" />
            <h2>${item.city} </h2>
            <p>${item.description}</p>
            <p><a href="#" class="btn btn-outline-primary">Visit</a></p>
        `;
        resuts.appendChild(countryDiv);
    });
}