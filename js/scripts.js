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

// adding zoom and panning control
var nav = new mapboxgl.NavigationControl()
map.addControl(nav, 'top-left')

// source geojson hosted on github
var busesUrl = 'https://raw.githubusercontent.com/nikikokkinos/Data/master/QueensBusRoutes.geojson'
var bikelaneUrl = 'https://raw.githubusercontent.com/nikikokkinos/Data/master/QueensProtectedBikeLanes.geojson'
var citibikeUrl = 'https://raw.githubusercontent.com/nikikokkinos/Data/master/QnsCitiBike_Stations.geojson'
var subwaylineUrl = 'https://raw.githubusercontent.com/nikikokkinos/Data/master/QueensSubwayLines.geojson'
var subwaystopUrl = 'https://raw.githubusercontent.com/nikikokkinos/Data/master/QueensSubwayStops.geojson'

// functions to be performed on load
// adding external data sources
map.on('load', function() {

  map.addSource('bus', {
    'type': 'geojson',
    'data': busesUrl
    })

  map.addSource('bike', {
    'type': 'geojson',
    'data': bikelaneUrl
    })

  map.addSource('citiBike', {
    'type': 'geojson',
    'data': citibikeUrl
    })

  map.addSource('subwaylines', {
    'type': 'geojson',
    'data':subwaylineUrl
  })

  map.addSource('subwaystops', {
    'type': 'geojson',
    'data': subwaystopUrl
  })

  map.getCanvas().style.cursor = 'default'

  // adding source layers
  map.addLayer({
    'id': 'Buses',
    'type': 'line',
    'source': 'bus',
    'layout': {
      'line-join': 'round',
      'line-cap': 'round',
      'visibility': 'visible',
      },
    'paint': {
        'line-color': {
          'property': 'Yr2018',
          'stops': [
            [3000000, '#ffffff'],
            [6000000, '#6baed6'],
            [9000000, '#3182bd'],
            [10000000,'#08519c'],
          ]
        },
        'line-width': 2.5,
        // ['case',
        // ['boolean', ['properties', 'hover'], false],
        // 4,
        // 2.5
        // ]
      },
  })

  // grabbing the html div holding the busridershipstatbox
  var lineDisplay = document.getElementById('line')
  var ridershipDisplay = document.getElementById('ridership')


  map.on('mouseenter', 'Buses', (e) => {
    map.getCanvas().style.cursor = 'pointer'

    // grabbing the properties from bus source
    var busLineDisplay = e.features[0].properties.route_shor
    var annualRidershipDisplay = e.features[0].properties.Yr2018

    // loop text content is shown on mouseenter
    if (e.features.length > 0) {
      lineDisplay.textContent = busLineDisplay
      ridershipDisplay.textContent = annualRidershipDisplay
      map.setPaintProperty('Buses', 'line-width', 6)
    }

    map.on('mouseleave', 'Buses', function() {
      // Remove the information from the previously hovered feature from the sidebar
      busLineDisplay.textContent = ''
      ridershipDisplay.textContent = ''
      // Reset the cursor style
      map.getCanvas().style.cursor = ''
      // reset line-width
      map.setPaintProperty('Buses', 'line-width', 2.5)
    })
  })

  map.addLayer({
    'id': 'Bikes',
    'type': 'line',
    'source': 'bike',
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
      'circle-color': '#79bcdb'
    }
})

  map.addLayer({
    'id': 'SubwayLines',
    'type': 'line',
    'source': 'subwaylines',
    'layout': {
      'line-join': 'round',
      'line-cap': 'round',
      'visibility': 'none',
      },
    'paint': {
      'line-width': 2.5,
      'line-color': ['match', ['get', 'name'],
          'M', '#ff9500',
          'F', '#ff9500',
          'F-M', '#ff9500',
          'A', '#0008ff',
          'E', '#0008ff',
          'J', '#633701',
          'J-Z', '#633701',
          'N', '#ffe940',
          'W', '#ffe940',
          'N-W', '#ffe940',
          'N-W-R', '#ffe940',
          'R', '#ffe940',
          'L', '#575757',
          'G', '#7ec261',
          '7', '#cd75d9',
          'S', '#575757',
          '#ccc'
        ]
      }
    })

  var linepopup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    })

  map.on('mouseenter', 'SubwayLines', function(e) {

    var trainline = e.features[0].properties.name

     linepopup
        .setLngLat(e.lngLat)
        .setHTML('MTA NYCT' + ' ' + trainline )
        .addTo(map)
      })

      map.on('mouseleave', 'SubwayLines', function() {
        map.getCanvas().style.cursor = '';
        linepopup.remove();
        })

  map.addLayer({
    'id': 'SubwayStops',
    'type': 'circle',
    'source': 'subwaystops',
    'layout': {
      'visibility': 'none',
    },
    'paint': {
      'circle-radius': 4,
      'circle-color': '#000000'
    }
  })

  var stoppopup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
  })

  map.on('mouseenter', 'SubwayStops', function(e) {

    var trainstop = e.features[0].properties.name

    stoppopup
    .setLngLat(e.lngLat)
    .setHTML('MTA NYCT' + ' ' + trainstop )
    .addTo(map)
    })

    map.on('mouseleave', 'SubwayStops', function() {
      map.getCanvas().style.cursor = '';
      stoppopup.remove();
      })

  var radioButton = $('#layerToggle')

  radioButton.on("click", function () {
    if (document.getElementById('buses').checked) {
        map.setLayoutProperty('Buses', 'visibility', 'visible')
    } else { map.setLayoutProperty('Buses', 'visibility', 'none')
    } if (document.getElementById('bikelanes').checked) {
        map.setLayoutProperty('Bikes', 'visibility', 'visible')
    } else { map.setLayoutProperty('Bikes', 'visibility', 'none')
    } if (document.getElementById('citibike').checked) {
        map.setLayoutProperty('CitiBike', 'visibility', 'visible')
    } else { map.setLayoutProperty('CitiBike', 'visibility', 'none')}
    if (document.getElementById('subwaylines').checked) {
        map.setLayoutProperty('SubwayLines', 'visibility', 'visible')
    } else { map.setLayoutProperty('SubwayLines', 'visibility', 'none')
    } if (document.getElementById('subwaystops').checked) {
        map.setLayoutProperty('SubwayStops', 'visibility', 'visible')
    } else { map.setLayoutProperty('SubwayStops', 'visibility', 'none')
    }
  })

})
