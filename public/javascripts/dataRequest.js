mapBoxToken = mapToken

const geocoder = new MapboxGeocoder({
    accessToken: mapBoxToken,
    types: 'country,region,place,postcode,locality,neighborhood'
});

geocoder.addTo('#geocoder');

// Get the geocoder results container.
const results = document.getElementById('result');

// Add geocoder result to container.
geocoder.on('result', function (e) {
    const [longitude, latitude] = e.result.geometry.coordinates;
    console.log(longitude, latitude)
    // geocoder.innerText = "";
});