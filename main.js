import './style.css';

// Helper function to get user location using geolocation or IP-based fallback
async function getUserLocation() {
  return new Promise((resolve) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        async () => {
          console.warn("Geolocation failed, using IP-based fallback");
          try {
            const response = await fetch("https://ipwho.is/");
            const data = await response.json();
            if (data.success) {
              resolve({ lat: data.latitude, lng: data.longitude });
            } else {
              resolve(null);
            }
          } catch {
            resolve(null);
          }
        }
      );
    } else {
      resolve(null);
    }
  });
}

// Store the history of restaurants
let restaurantHistory = [];
let map;
let currentRestaurant = null;

// Initialize Google Maps
async function initMap() {
  let location = await getUserLocation();
  const defaultLocation = { lat: 47.6062, lng: -122.3321 }; // seattle, WA
  if (!location) location = defaultLocation;

  const { Map } = await google.maps.importLibrary("maps");
  map = new Map(document.getElementById("map"), {
    center: location,
    zoom: 15,
    mapId: '5cf4d80f4e5ae41a49c1a06a'
  });

  const marker = new google.maps.Marker({
    position: location,
    map: map,
  });
  searchRestaurants();
}
  
// }

// Search for restaurants

async function searchRestaurants() {
  try {
    const { Place, SearchNearbyRankPreference, Money } = await google.maps.importLibrary("places");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    let center = map.getCenter();
    const request = {
      // required parameters
      fields: ['displayName', 'formattedAddress', 'location', 'priceRange', 'rating', 'userRatingCount', 'priceLevel'],
      locationRestriction: {
        center: center,
        radius: 2000, // 2km radius
      },
      // optional parameters
      includedPrimaryTypes: ['restaurant'],
      maxResultCount: 20,
      rankPreference: SearchNearbyRankPreference.POPULARITY,
      language: 'en-US',
    };

    const { places } = await Place.searchNearby(request);

    if (places && places.length > 0) {
      const randomIndex = Math.floor(Math.random() * places.length);
      const place = places[randomIndex];
      
      // Update the map
      map.setCenter(place.location);
      
      // Add a marker
      new AdvancedMarkerElement({
        map,
        position: place.location,
        title: place.displayName,
      });

      // Update the restaurant info
      document.querySelector('.restaurant-name').textContent = place.displayName;
      document.querySelector('.restaurant-address').textContent = place.formattedAddress;
      document.querySelector('.restaurant-rating').textContent = 
        `Rating: ${place.rating} ⭐ (${place.userRatingCount} reviews)`;
      document.querySelector('.restaurant-price').textContent = `Price: ${place.priceLevel}`;

      // const photoContainer = document.querySelector('.photo-container');
      // photoContainer.innerHTML = '';
      
      // if (place.photos && place.photos.length > 0 && place.photos[0].programmaticUrls?.thumbnail) {
      //   const photoUrl = place.photos[0].programmaticUrls.thumbnail;
      //   const img = document.createElement('img');
      //   img.src = photoUrl;
      //   img.alt = place.displayName;
      //   img.classList.add('restaurant-photo');
      //   photoContainer.appendChild(img);
      // }
      
      currentRestaurant = place;

      // Update the place data provider with the new place ID
      const placeProvider = document.getElementById('placeProvider');
      if (placeProvider) {
        placeProvider.place = place.id;
      }
    } else {
      console.error('No restaurants found');
    }
  } catch (error) {
    console.error('Error searching for restaurants:', error);
  }
}

initMap();




// async function searchRestaurants() {
//   if (!map) {
//     console.error('Map not initialized');
//     return;
//   }

//   const { PlaceSearch } = await google.maps.importLibrary("places");

//   const center = map.getCenter();
//   const request = {
//     locationBias: center,
//     includedTypes: ["restaurant"],
//     maxResultCount: 20,
//   };

//   try {
//     const placeSearch = new PlaceSearch();
//     const response = await placeSearch.search(request);
//     const results = response.places;

//     if (results && results.length > 0) {
//       const randomIndex = Math.floor(Math.random() * results.length);
//       const place = results[randomIndex];

//       await place.fetchFields(['displayName', 'formattedAddress', 'location', 'rating', 'userRatingCount']);

//       currentRestaurant = place;

//       map.setCenter(place.location);

//       new google.maps.Marker({
//         position: place.location,
//         map: map,
//       });

//       document.querySelector('.restaurant-name').textContent = place.displayName;
//       document.querySelector('.restaurant-address').textContent = place.formattedAddress;
//       document.querySelector('.restaurant-rating').textContent =
//         `Rating: ${place.rating} ⭐ (${place.userRatingCount} reviews)`;
//     } else {
//       console.error('No restaurants found');
//     }
//   } catch (error) {
//     console.error('Error fetching places:', error);
//   }
// }

// // Make initMap available globally
// window.initMap = initMap;

document.querySelector('.button-30').addEventListener('click', () => {
  const button = document.querySelector('.button-30');
  const container = document.querySelector('.container');
  
  button.classList.add('slide-up');
  
  // Initialize map if not already done
  if (!map) {
    initMap();
  }
  
  // Search for restaurants
  searchRestaurants();
  
  // Show container after button slides up
  setTimeout(() => {
    container.classList.remove('hidden');
    setTimeout(() => {
      container.classList.add('visible');
    }, 50);
  }, 500);
});

// Try again button functionality
document.querySelector('.try-again').addEventListener('click', () => {
  const button = document.querySelector('.button-30');
  const container = document.querySelector('.container');
  const title = document.querySelector('.title');
  
  if (!map) {
    initMap();
  }
  
  // Search for restaurants
  searchRestaurants();
  
  // Show container after button slides up
  setTimeout(() => {
    container.classList.remove('hidden');
    setTimeout(() => {
      container.classList.add('visible');
    }, 50);
  }, 500);
});

// That's it! button functionality
document.querySelector('.thats-it').addEventListener('click', () => {
  if (currentRestaurant) {
    // Add current restaurant to history
    restaurantHistory.push({
      name: currentRestaurant.displayName,
      address: currentRestaurant.formattedAddress,
      rating: currentRestaurant.rating,
      timestamp: new Date().toISOString()
    });
    
    // Store the history in localStorage
    localStorage.setItem('restaurantHistory', JSON.stringify(restaurantHistory));
  }
  
  // Reset the interface
  const button = document.querySelector('.button-30');
  const container = document.querySelector('.container');
  const title = document.querySelector('.title');
  
  container.classList.remove('visible');
  setTimeout(() => {
    container.classList.add('hidden');
  }, 500);
  
  button.classList.remove('slide-up');
  title.classList.remove('hidden');
});

// Load history from localStorage when page loads
window.addEventListener('load', () => {
  const savedHistory = localStorage.getItem('restaurantHistory');
  if (savedHistory) {
    restaurantHistory = JSON.parse(savedHistory);
  }
});
