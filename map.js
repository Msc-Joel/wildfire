mapboxgl.accessToken =
  "pk.eyJ1Ijoiam9lbGtvbm9wbyIsImEiOiJjbDN1OG16cjkyNjJzM2NyeHljZnQ1bjJsIn0.9ot6HAPQ1SZXqWAKLd67BQ";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/joelkonopo/cl4vs1oma000015t7m5ooda39",
  center: [-97, 41],
  zoom: 3.5,
  maxZoom: 6,
  minZoom: 3,
  projection: 'albers',
});
map.on('load', function () {
  // This is the function that finds the first symbol layer
  let layers = map.getStyle().layers;
  let firstSymbolId;
  for (var i = 0; i < layers.length; i++) {
  if (layers[i].type === 'symbol') {
  firstSymbolId = layers[i].id;
  break;
  }
  }
  map.addLayer(
  {
  id: "wildfire-outline",
  type: "line",
  source: {
  type: "geojson",
  data: "data/wildstateData.geojson",
  },
  paint: {
  "line-color": "#ffffff",
  "line-width": 1.0,
  },
  },
  "waterway-label" // Here's where we tell Mapbox where to slot this new layer
  );
  
  map.addLayer(
  {
  id: "wildfire-polygon",
  type: "fill",
  source: {
  type: "geojson",
  data: "data/wildstateData.geojson",
  },
  minzoom: .5,
  paint: {
  "fill-color": [
  'interpolate',
  ['linear'],
  ['get', 'Mean BP percentile within state'],
  0,
  '#b8b894',
  20,
  '#0CF6EF',
  40,
  '#701EF3',
  60,
  '#D35400',
  80,
  '#F8C471',
  100,
  '#58D68D',
  ],
  "fill-opacity": 0.6
  }
  },
  "wildfire-outline"
  ); 
})

  // Create the popup
  map.on('click', 'wildfire-units', function (e) {
    var stateName = e.features[0].properties.NAME;
    var totalUnits = e.features[0].properties['Mean BP percentile within state'];
    totalUnits = totalUnits.toLocaleString();
    stateName = stateName.toUpperCase();
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<h4>'+stateName+'</h4>'
            +'<p>'+totalUnits+
            ' housing units in the state were exposed to wild fire'+'</p>')
        .addTo(map);
  });// Create the popup
  map.on('click', 'meanWHP', function (e) {
      var meanWHP = e.features[0].properties['Mean WHP'];
      var meanWHPStatePerc =  e.features[0].properties['Mean WHP percentile within state'];
      var county =  e.features[0].properties['NAME_x'];
      
      meanWHP = meanWHP;
      meanWHPStatePerc = (meanWHPStatePerc * 100).toFixed(0);
      county = county;
  
      htmlcode = '<h2>'+county+' County'+'</h2>'
      +'<h4>'+'Mean Wildfire Hazard: '+meanWHP+'</h4>'
      +'<h4>'+'Mean Wildfire Hazard Percentile within Georgia '+meanWHPStatePerc+'%'+'</h4>'
    
      popup
          .setLngLat(e.lngLat)
          .setHTML(htmlcode
              )
          .addTo(map);
  });
  map.on('click', 'consvLands', function (e) {
    if (popup.isOpen()){
      console.log("popup is open");
    }
    var administration = e.features[0].properties['managing_a'];
    htmlcode = htmlcode + '<h4>'+'Administration: '+administration+'</h4>'
    popup
        .setHTML(htmlcode
            )
        .addTo(map);
  });
  // Change the cursor to a pointer when the mouse is over the us_states_elections layer.
  map.on('mouseenter', 'meanWHP', function () {
      map.getCanvas().style.cursor = 'pointer';
  });
  // Change it back to a pointer when it leaves.
  map.on('mouseleave', 'meanWHP', function () {
      map.getCanvas().style.cursor = '';
  });

// map.on("load", function () {
//   map.addLayer({
//     id: "wildfire",
//     type: "line",
//     source: {
//       type: "geojson",
//       data: "data/wildstateData.geojson",
//     },
//     paint: {
//       "line-color": "#ffffff",
//       "line-width": 0.7,
//     },
//   });
// });

// map.addLayer({
//   id: "us_states_elections",
//   type: "fill",
//   source: {
//     type: "geojson",
//     data: "data/wildstateData.geojson",
//   },
//   paint: {
//     "fill-color": [
//       "match",
//       ["get", "Mean BP percentile within state"],
//       "#ffffff",
//     ],
//     "fill-outline-color": "#ffffff",
//   },
// });
//     //     'circle-radius':
//     // ['interpolate', ['linear'], ['zoom'],
//     //     3, ['max', ['/', ['sqrt', ['abs', ['-', ['get', 'Violence against civilians'], ['get', 'Protests'], ['get','Strategic developments'],['get','Riots'],['get','Explosions/Remote violence'],['get','Battles']]]], 40], 1],
//     //     9, ['max', ['/', ['sqrt', ['abs', ['-', ['get', 'Violence against civilians'], ['get', 'Protests'],['get','Strategic developments'],['get','Riots'],['get','Explosions/Remote violence'],['get','Battles']]]], 15], 5],
//     // ],
//     // "circle-radius": 2,
//     // "circle-color": [
//     //   "match",
//     //   ["get", "EVENT_TYPE"],
//     //   "Violence against civilians","#e62e00",
//     //   "Protests","#ac7339",
//     //   "Strategic developments","#0000ff",
//     //   "Riots","#ff9900",
//     //   "Explosions/Remote violence","#661a00",
//     //   "Battles","#008080",
//     //   "#ffffff"
//     //  ],
//       // "circle-stroke-color": "#000000",
//       // "circle-stroke-width": 0.5,
// //     },
// //     // minzoom: 3,
// //   },
// //   "waterway-label"
// //   );
// //  });






//  map.addLayer(
//   {
//     id: "us_states_elections",
//     type: "fill",
//     source: {
//       type: "geojson",
//       data: "data/statesElections.geojson",
//     },
//     paint: {
//       "fill-color": [
//         "match",
//         ["get", "Winner"],
//         "Donald J Trump", "#cf635d",
//         "Joseph R Biden Jr", "#6193c7",
//         "Other", "#91b66e",
//         "#ffffff",
//       ],
//       "fill-outline-color": "#ffffff",
//       "fill-opacity": [
//           "step",
//           ["get", "WnrPerc"],
//           0.3,
//           0.4,
//           0.5,
//           0.5,
//           0.7,
//           0.6,
//           0.9,
//         ],
//     },
//   },
//   "us_states_elections_outline"
// );

// // Pop up
// map.on("click", "political-demo", function (e) {
//   var location = e.features[0].properties['LOCATION'];
//   var totalevents = e.features[0].properties.EVENT_ID_NO_CNTY;
//   console.log(location);
//   new mapboxgl.Popup()
//     .setLngLat(e.lngLat)
//     .setHTML(
//       "<h4>" 
//       + "location:" 
//       + "</h4>" 
//       + "<hr>"
//       + "<h6>" 
//       + location
//       + "</h6>"
//       + "<h4>" 
//       + "No.of events: " 
//       + totalevents 
//       + "</h4>"
//     )
//     .addTo(map);
//   });

// map.on("mouseenter", "political-demo", function () {
// map.getCanvas().style.cursor = "pointer";});
// map.on("mouseleave", "political-demo", function () {
// map.getCanvas().style.cursor = ""; });


