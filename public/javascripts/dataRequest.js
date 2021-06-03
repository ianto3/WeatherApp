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
    const location = e.result.text;
    fetch("/weather", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            longitude: longitude,
            latitude: latitude
        })
    })
        .then(res => res.json())
        .then(data => {
            setValues(data, location);
        });
});

// Initialize with Madrid weather info
fetch("/weather", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify({
        longitude: -3.69194,
        latitude: 40.41889
    })
})
    .then(res => res.json())
    .then(data => {
        setValues(data, "Madrid");
    });