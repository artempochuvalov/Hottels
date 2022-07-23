mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: hotel.geometry.coordinates,
    zoom: 10,
    projection: 'globe'
});

new mapboxgl.Marker()
    .setLngLat(hotel.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 30 })
        .setHTML(
            `<h5>${hotel.title}</h5><p>${hotel.location}</p>`
        )
    )
    .addTo(map);

map.on('style.load', () => {
    map.setFog({});
});
