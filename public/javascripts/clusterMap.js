mapboxgl.accessToken =
  "pk.eyJ1IjoiamNpYW5jaTEiLCJhIjoiY2trZWM2anJmMGF4eDJuano1NzZscjA1NSJ9.RabLwj8ALzY2pJbp35s_hA";
var map = new mapboxgl.Map({
  container: "map", // container id
  style: "mapbox://styles/jcianci1/ckkpts1oy2c3j17ovwrybp73t", // style URL
  center: [12.496366, 41.902782], // starting position [lng, lat]
  zoom: 5, // starting zoom
});

var hoveredReg_istat_code = null;

map.on("load", function () {
  console.log(recipes);
  // Add the source to query. In this example we're using
  // county polygons uploaded as vector tiles
  map.addSource("regions", {
    type: "vector",
    url: "mapbox://jcianci1.ckkn7626311fq22o2wuxuq1l0-71nfu",
  });

  map.addLayer({
    id: "regions-layer",
    type: "fill",
    "source-layer": "ItalyRegions",
    source: "regions",
    paint: {
      "fill-color": "#888c85",
      "fill-outline-color": "#1f211f",
      "fill-opacity": 0,
    },
  });
  console.log(recipes);

  recipes.forEach(function (marker) {
    console.log(marker);
    // create a HTML element for each feature
    var el = document.createElement("div");
    el.className = "marker";

    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el)
      .setLngLat(marker.geometry.coordinates)
      .setLngLat(marker.geometry.coordinates)
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }) // add popups
          .setHTML(
            "<h3>" +
              marker.properties.title +
              "</h3><p>" +
              marker.properties.description +
              "</p>"
          )
      )
      .addTo(map);
  });

  // map.addLayer(
  //     {
  //         'id': 'regions-highlighted',
  //         'type': 'fill',
  //         'source-layer': 'ItalyRegions',
  //         'source': 'regions',
  //         'layout': {},
  //         'paint': {
  //             'fill-color': '#6e599f',
  //             'fill-opacity':
  //                     [
  //                 'case',
  //                 ['boolean', ['feature-state', 'hover'], false],
  //                 1,
  //                 0.5
  //             ]
  //         }
  //     });

  // map.on('mousemove', 'regions-highlighted', function (e) {
  //     console.log('regions-highlighted')
  //         if (e.features.length > 0) {
  //             if (hoveredReg_istat_code) {
  //                 map.setFeatureState(
  //                     { source: 'regions', id: hoveredReg_istat_code },
  //                     { hover: false }
  //                     );
  //                 }
  //                 hoveredReg_istat_code = e.features[0].id;
  //                 map.setFeatureState(
  //                     { source: 'regions', id: hoveredReg_istat_code },
  //                     { hover: true }
  //                     );
  //             }
  //     });

  //     // When the mouse leaves the state-fill layer, update the feature state of the
  //     // previously hovered feature.
  // map.on('mouseleave', 'regions-highlighted', function () {
  //             if (hoveredReg_istat_code) {
  //             map.setFeatureState(
  //             { source: 'regions', id: hoveredReg_istat_code },
  //             { hover: false }
  //             );
  //             }
  //             hoveredReg_istat_code = null;
  //     });

  // When a click event occurs on a feature in the states layer, open a popup at the
  // location of the click, with description HTML from its properties.
  // map.on('click', 'regions-layer', function (e) {
  // const popupMarkup = e.features[0].properties.reg_name;

  //     new mapboxgl.Popup()
  //         .setLngLat(e.lngLat)
  //         .setHTML(popupMarkup)
  //         .addTo(map);
  //     });

  // Change the cursor to a pointer when the mouse is over the states layer.
  map.on("mouseenter", "regions-layer", function () {
    map.getCanvas().style.cursor = "pointer";
  });

  // Change it back to a pointer when it leaves.
  map.on("mouseleave", "regions-layer", function () {
    map.getCanvas().style.cursor = "";
  });

  const popupMarker = e.features[0].properties.reg_name;

  popupMarker.getElement().addEventListener("click", function (e) {
    const derm = e.target.value.toLowerCase();
    const recipes = document.getElementsByTagName("small");
    Array.from(recipes).forEach(function (recipe) {
      const title = recipe.textContent;
      if (title.toLowerCase().indexOf(derm) != -1) {
        recipe.style.display = "block";
      } else {
        recipe.style.display = "none";
      }
    });
  });
});
