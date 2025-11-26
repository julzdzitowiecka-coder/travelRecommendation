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
        data.countries.forEach(element => {
            const city = element.cities.find(item => item.description.toLowerCase().includes(input));
            if (city) {
                countries.push({
                    country: element.country,
                    city: city.name,
                    description: city.description,
                    imageUrl: city.imageUrl 
                });
            }
        });
        if (countries.length > 0)  {
            displayResults(countries);
        } else {
            resuts.innerHTML = '<p>No results found. Please try a different search term.</p>';
        }
    });
}
function displayResults(countries) {
    resuts.innerHTML = '';
    countries.forEach(item => {
        const countryDiv = document.createElement('div');
        countryDiv.classList.add('country-result');
        countryDiv.innerHTML = `
            <h2>${item.country} - ${item.city}</h2>
            <p>${item.description}</p>
            <img src="${item.imageUrl}" alt="${item.city}" />
        `;
        resuts.appendChild(countryDiv);
    });
}