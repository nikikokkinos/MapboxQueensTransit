// accessToken
mapboxgl.accessToken = 'pk.eyJ1IjoibmlraTEyc3RlcCIsImEiOiJjanZlNGFneWswMm0zNDRxcGYwZXYwcjl2In0.fWV3JfWN5hg9UFqDimwIZw';

// adding mapbox map
var map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/niki12step/ck5zuk3tb03jw1io6ug5okx5k', // my style url
  zoom: 10.3,
  minZoom: 8,
  maxZoom: 15,
  center: [-73.832966,40.694523],
})

// $('#legendCandidate').hide();

// adding zoom and panning control
var nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-left');

// source geojson hosted on github
var busesUrl = 'https://raw.githubusercontent.com/nikikokkinos/Data/master/QueensBusRoutes.geojson'

var citibikeUrl = 'https://raw.githubusercontent.com/nikikokkinos/Data/master/QnsCitiBike_Stations.geojson'

var bikelaneUrl = 'https://raw.githubusercontent.com/nikikokkinos/Data/master/QueensProtectedBikeLanes.geojson'

// functions to be performed on load
map.on('load', function() {

  map.getCanvas().style.cursor = 'default'

  map.addLayer({
    'id': 'Buses',
    'type': 'line',
    'source': {
        'type': 'geojson',
        'data': busesUrl,
      },
    'layout': {
      'line-join': 'round',
      'line-cap': 'round',
      },
    'paint': {
        'line-color': '#0099cc',
        'line-width': .5,
      },
  })

  map.addLayer({
    'id': 'Bikes',
    'type': 'line',
    'source': {
        'type': 'geojson',
        'data': bikelaneUrl,
      },
    'layout': {
      'line-join': 'round',
      'line-cap': 'round',
      },
    'paint': {
        'line-color': '#339966',
        'line-width': 2.5,
      },
  })
})
