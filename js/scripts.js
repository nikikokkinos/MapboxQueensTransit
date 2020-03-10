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

var bikelaneUrl = 'https://raw.githubusercontent.com/nikikokkinos/Data/master/QueensProtectedBikeLanes.geojson'

var citibikeUrl = 'https://raw.githubusercontent.com/nikikokkinos/Data/master/QnsCitiBike_Stations.geojson'

// functions to be performed on load
map.on('load', function() {

  map.addSource('Bus', {
    'type': 'geojson',
    'data': busesUrl
    });

  map.addSource('Bike', {
    'type': 'geojson',
    'data': bikelaneUrl
    });

  map.addSource('citiBike', {
    'type': 'geojson',
    'data': citibikeUrl
    });

  map.getCanvas().style.cursor = 'default'

  map.addLayer({
    'id': 'Buses',
    'type': 'line',
    'source': 'Bus',
    'layout': {
      'line-join': 'round',
      'line-cap': 'round',
      'visibility': 'visible',
      },
    'paint': {
        'line-color': {
          'property': 'BusRidership18.csvt_Yr2018',
          'stops': [
            [3000000, '#ffffff'],
            [6000000, '#6baed6'],
            [9000000, '#3182bd'],
            [10000000,'#08519c'],
          ]
        },
        'line-width': ['case',['boolean', ['feature-state', 'hover'], false], 2.5, 3.5],
      },
  })

  map.addLayer({
    'id': 'Bikes',
    'type': 'line',
    'source': 'Bike',
    'layout': {
      'line-join': 'round',
      'line-cap': 'round',
      'visibility': 'none',
      },
    'paint': {
      'line-color': '#339966',
      'line-width': 2.5,
      },
  })

  map.addLayer({
    'id': 'CitiBike',
    'type': 'circle',
    'source': 'citiBike',
    'layout': {
      'visibility': 'none',
    },
    'paint': {
      'circle-radius': 3.2,
      'circle-color': '#666699'
    }
})

  var radioButton = $('#layerToggle')

  radioButton.on("click", function () {
    if (document.getElementById('buses').checked) {
        map.setLayoutProperty('Buses', 'visibility', 'visible');
    } else { map.setLayoutProperty('Buses', 'visibility', 'none');
    } if (document.getElementById('bikelanes').checked) {
        map.setLayoutProperty('Bikes', 'visibility', 'visible');
    } else { map.setLayoutProperty('Bikes', 'visibility', 'none');
    } if (document.getElementById('citibike').checked) {
        map.setLayoutProperty('CitiBike', 'visibility', 'visible');
    } else { map.setLayoutProperty('CitiBike', 'visibility', 'none');
    }
  });

  

})
