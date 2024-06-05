document.getElementById('searchButton').addEventListener('click', function() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    console.log(`Searching for: ${query}`);  // Log the search query
    fetch('dataset_crawler-google-places_2024-06-03_16-39-31-904 (1).json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Data fetched:', data);  // Log the fetched data
            const filteredRestaurants = data.filter(restaurant => 
                restaurant.title.toLowerCase().includes(query)
            );

            // Sort the filtered restaurants by rating from highest to lowest
            filteredRestaurants.sort((a, b) => b.totalScore - a.totalScore);

            console.log('Filtered and Sorted Restaurants:', filteredRestaurants);  // Log the filtered and sorted data
            displayRecommendations(filteredRestaurants);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});

function displayRecommendations(restaurants) {
    const recommendationsSection = document.getElementById('recommendations');
    recommendationsSection.innerHTML = '';
    if (restaurants.length === 0) {
        recommendationsSection.innerHTML = '<p>No restaurants found.</p>';
        return;
    }
    restaurants.forEach(restaurant => {
        const card = document.createElement('div');
        card.className = 'recommendation-card';

        // Generate coffee beans based on the rating
        const coffeeBeans = '☕'.repeat(Math.round(restaurant.totalScore));

        card.innerHTML = `
            <h2>${restaurant.title}</h2>
            <img src="${restaurant.images.length > 0 ? restaurant.images[0].imageUrl : 'https://via.placeholder.com/300'}" alt="${restaurant.title}">
            <p>Rating: ${restaurant.totalScore} (${restaurant.reviewsCount} reviews)</p>
            <p>${coffeeBeans}</p>
            <p>${restaurant.street}, ${restaurant.state}</p>
            <p>Phone: <a href="tel:${restaurant.phone}">${restaurant.phone ? restaurant.phone : 'N/A'}</a></p>
            <a href="${restaurant.url}" target="_blank">View on Map</a>
        `;
        recommendationsSection.appendChild(card);
    });
}
