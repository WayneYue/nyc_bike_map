// Calling methods with javascript libraries
// 
// Mapbox GL JS 	mapboxgl.METHOD
// Leaflet 			L.METHOD
// jQuery			jQuery.METHOD  or $('selector').METHOD
// d3				d3.METHOD


// Provide access token
mapboxgl.accessToken = 'pk.eyJ1IjoiMTM3Nzc3MjYxMzMiLCJhIjoiY2o3MHVmMHNqMDJzdTMzbXdxbHZsdzh5MSJ9.MO-yvYAhWg3TAGn1yh-oVQ';  // replace with your own access token

// Link to a mapbox studio style
var map = new mapboxgl.Map({
	container: 'map',
	minZoom: 10,
	maxZoom: 17,
	style: 'mapbox://styles/13777726133/cj8n4fi6e7ev32soro0kewsky' 
});


//Create a custom layer switcher to display different datasets
map.on('load', function () {
    map.addSource('startpoint', {
        type: 'vector',
        url: 'mapbox://13777726133.aruiio16'
    });
    map.addLayer({
        'id': 'startpoint',
        'type': 'circle',
        'source': 'startpoint',
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'circle-radius': 5,
            'circle-color': 'rgba(219,36,60,0.2)'
        },
        'source-layer': '20170901-Filtered-Morning-Rus-559sek'
    });

    map.addSource('endpoint', {
        type: 'vector',
        url: 'mapbox://13777726133.aruiio16'
    });
    map.addLayer({
        'id': 'endpoint',
        'type': 'circle',
        'source': 'endpoint',
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'circle-radius': 5,
            'circle-color': 'rgba(143,227,135,0.11)'
        },
        'source-layer': '20170901-Filtered-Morning-Rus-559sek'
    });

    // map.addSource('contours', {
    //     type: 'vector',
    //     url: 'mapbox://mapbox.mapbox-terrain-v2'
    // });
    // map.addLayer({
    //     'id': 'contours',
    //     'type': 'line',
    //     'source': 'contours',
    //     'source-layer': 'contour',
    //     'layout': {
    //         'visibility': 'visible',
    //         'line-join': 'round',
    //         'line-cap': 'round'
    //     },
    //     'paint': {
    //         'line-color': '#877b59',
    //         'line-width': 1
    //     }
    // });
});

var toggleableLayerIds = [ 'startpoint', 'endpoint' ];

for (var i = 0; i < toggleableLayerIds.length; i++) {
    var id = toggleableLayerIds[i];

    var link = document.createElement('a');
    link.href = '#';
    link.className = 'active';
    link.textContent = id;

    link.onclick = function (e) {
        var clickedLayer = this.textContent;
        e.preventDefault();
        e.stopPropagation();

        var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

        if (visibility === 'visible') {
            map.setLayoutProperty(clickedLayer, 'visibility', 'none');
            this.className = '';
        } else {
            this.className = 'active';
            map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
        }
    };

    var layers = document.getElementById('menu');
    layers.appendChild(link);
}


// // Create a heat map layer
// map.on('load', function() {
//     //Add a geojson point source.  
//     //Heatmap layers also work with a vector tile source.
//     map.addSource('earthquakes', {
//         "type": "geojson",
//         "data": "https://www.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"
//     });

//     map.addLayer({
//         "id": "earthquakes-heat",
//         "type": "heatmap",
//         "source": "earthquakes",
//         "maxzoom": 9,
//         "paint": {
//             //Increase the heatmap weight based on frequency and property magnitude
//             "heatmap-weight": {
//                 "property": "mag",
//                 "type": "exponential",
//                 "stops": [
//                     [0, 0],
//                     [6, 1]
//                 ]
//             },
//             //Increase the heatmap color weight weight by zoom level
//             //heatmap-ntensity is a multiplier on top of heatmap-weight
//             "heatmap-intensity": {
//                 "stops": [
//                     [0, 1],
//                     [9, 3]
//                 ]
//             },
//             //Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
//             //Begin color ramp at 0-stop with a 0-transparancy color
//             //to create a blur-like effect.
//             "heatmap-color": {
//                 "stops": [
//                     [0, "rgba(33,102,172,0)"],
//                     [0.2, "rgb(103,169,207)"],
//                     [0.4, "rgb(209,229,240)"],
//                     [0.6, "rgb(253,219,199)"],
//                     [0.8, "rgb(239,138,98)"],
//                     [1, "rgb(178,24,43)"]
//                 ]
//             },
//             //Adjust the heatmap radius by zoom level
//             "heatmap-radius": {
//                 "stops": [
//                     [0, 2],
//                     [9, 20]
//                 ]
//             },
//             //Transition from heatmap to circle layer by zoom level
//             "heatmap-opacity": {
//                 "default": 1,
//                 "stops": [
//                     [7, 1],
//                     [9, 0]
//                 ]
//             },
//         }
//     }, 'waterway-label');

//     map.addLayer({
//         "id": "earthquakes-point",
//         "type": "circle",
//         "source": "earthquakes",
//         "minzoom": 7,
//         "paint": {
//             //Size circle raidus by earthquake magnitude and zoom level
//             "circle-radius": {
//                 "property": "mag",
//                 "type": "exponential",
//                 "stops": [
//                     [{ zoom: 7, value: 1 }, 1],
//                     [{ zoom: 7, value: 6 }, 4],
//                     [{ zoom: 16, value: 1 }, 5],
//                     [{ zoom: 16, value: 6 }, 50],
//                 ]
//             },
//             //Color circle by earthquake magnitude
//             "circle-color": {
//                 "property": "mag",
//                 "type": "exponential",
//                 "stops": [
//                     [1, "rgba(33,102,172,0)"],
//                     [2, "rgb(103,169,207)"],
//                     [3, "rgb(209,229,240)"],
//                     [4, "rgb(253,219,199)"],
//                     [5, "rgb(239,138,98)"],
//                     [6, "rgb(178,24,43)"]
//                 ]
//             },
//             "circle-stroke-color": "white",
//             "circle-stroke-width": 1,
//             //Transition from heatmap to circle layer by zoom level
//             "circle-opacity": {
//                 "stops": [
//                     [7, 0],
//                     [8, 1]
//                 ]
//             }
//         }
//     }, 'waterway-label');
// });



// PARKS - INFO WINDOW CHANGES ON HOVER
// code to add interactivity once map loads
map.on('load', function() {	// the event listener that does some code after the map loads
	
	// the categories we created from the cville-parks map layer
	// #a1daed 1 bike lane
	// #4d9be6 2 bike lanes
	// #2052c1 3 bike lanes
	// #0a169c 4 bike lanes

	var layers = [
		'1 bike lane', 
		'2 bike lanes', 
		'3 bike lanes', 
		'4 bike lanes'
	];
	
	// the colors we chose to style the parks on the map for each category


	var colors = [
		'#a1daed', 
		'#4d9be6', 
		'#2052c1', 
		'#0a169c'
	];

	// add a legend to the map
	for (i = 0; i < layers.length; i++) {
	  var layer = layers[i];
	  var color = colors[i];
	  var item = document.createElement('div');
	  var key = document.createElement('span');
	  key.className = 'legend-key';
	  key.style.backgroundColor = color;

	  var value = document.createElement('span');
	  value.innerHTML = layer;
	  item.appendChild(key);
	  item.appendChild(value);
	  legend.appendChild(item);
	}

	// replace contents of info window when user hovers on a state
	map.on('mousemove', function(e) {	// event listener to do some code when the mouse moves

	  var lanes = map.queryRenderedFeatures(e.point, {
	    layers: ['nyc-bike-routes-1-bike-lane', 'nyc-bike-routes-2-bike-lane', 'nyc-bike-routes-3-bike-lane copy', 'nyc-bike-routes-4-bike-lane copy 1']	// replace 'cville-parks' with the name of your layer, if using a different layer
	  });

	  if (lanes.length > 0) {	// if statement to make sure the following code is only added to the info window if the mouse moves over a state
	    document.getElementById('info-window-body').innerHTML = '<h3><strong>' + parseInt(lanes[0].properties.lanecount + 1) + ' bike lane each direction</strong></h3>';
	  } else {
	    document.getElementById('info-window-body').innerHTML = '<p>Hover over a bike lane or click on a bike station to learn more about it.</p>';
	  }
	
	});


// 		Hao's code for toggle layers

// function openMenu(evt, menuName) {
//     var i, tabcontent, tablinks;
//     tabcontent = document.getElementsByClassName("tabcontent");
//     for (i = 0; i < tabcontent.length; i++) {
//         tabcontent[i].style.display = "none";
//     };
//     tablinks = document.getElementsByClassName("tablinks");
//     for (i = 0; i < tablinks.length; i++) {
//         tablinks[i].className = tablinks[i].className.replace(" active", "");
//     }
//     document.getElementById(menuName).style.display = "block";
//     evt.currentTarget.className += " active";
// };

// document.getElementById('defaultOpen').click();


// //toggle layers
// var toggleableLayerIds = ['startpoint', 'endpoint', 'parks', 'national_park', 'nyc-bike-routes-3-bike-lane copy'];

// for (var i = 0; i < toggleableLayerIds.length; i++) {
//     var id = toggleableLayerIds[i];
//     var container = document.createElement('div');
//     container.setAttribute('class', 'layer')
//     container.innerHTML = id;
//     var input = document.createElement('input');
//     input.id = id;
//     input.type = 'checkbox';


//     var inputContainer = document.createElement('div');
//     inputContainer.setAttribute('class', 'inputContainer');



//     var label = document.createElement('label');
//     label.setAttribute('for', id)
//     label.className = 'toggleLayers';

//     inputContainer.appendChild(input);
//     inputContainer.appendChild(label);

//     input.addEventListener('change', function (e) {
//         map.setLayoutProperty(this.id, 'visibility',
//             e.target.checked ? 'visible' : 'none');

//     });

//     var layers = document.getElementById('layer-container');
//     container.appendChild(inputContainer);
//     layers.appendChild(container);
// }




// --------------------------------------------------------------------
	// BUS STOPS - POPUPS
	// code to add popups
    // event listener for clicks on map
    map.on('click', function(e) {
      var stops = map.queryRenderedFeatures(e.point, {
        layers: ['endpoint'] // replace this with the name of the layer
      });

      console.log(stops);

      // if the layer is empty, this if statement will return NULL, exiting the function (no popups created) -- this is a failsafe to avoid endless loops
      if (!stops.length) {
        return;
      }

      // Sets the current feature equal to the clicked-on feature using array notation, in which the first item in the array is selected using arrayName[0]. The event listener above ("var stops = map...") returns an array of clicked-on bus stops, and even though the array might only have one item, we need to isolate it by using array notation as follows below.
      var stop = stops[0];
      
      // Initiate the popup
      var popup = new mapboxgl.Popup({ 
        closeButton: true, // If true, a close button will appear in the top right corner of the popup. Default = true
        closeOnClick: true, // If true, the popup will automatically close if the user clicks anywhere on the map. Default = true
        anchor: 'bottom', // The popup's location relative to the feature. Options are 'top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left' and 'bottom-right'. If not set, the popup's location will be set dynamically to make sure it is always visible in the map container.
        offset: [0, -15] // A pixel offset from the centerpoint of the feature. Can be a single number, an [x,y] coordinate, or an object of [x,y] coordinates specifying an offset for each of the different anchor options (e.g. 'top' and 'bottom'). Negative numbers indicate left and up.
      });

      // Set the popup location based on each feature
      popup.setLngLat(stop.geometry.coordinates);

      // Set the contents of the popup window
      popup.setHTML('<h3>End Station Name: ' + stop.properties.end_station_name   // 'stop_id' field of the dataset will become the title of the popup
                           + '</h3><p>Trip Duration: ' + stop.properties.tripduration // 'stop_name' field of the dataset will become the body of the popup
                           + 's</p>');

      // Add the popup to the map
      popup.addTo(map);  // replace "map" with the name of the variable in line 28, if different
    });

});






// Show "About this Map" modal when clicking on button
$('#about').on('click', function() {

	$('#screen').fadeToggle();  // toggles visibility of background screen when clicked (shows if hidden, hides if visible)

	$('.modal').fadeToggle();  // toggles visibility of background screen when clicked (shows if hidden, hides if visible)	                        
	
});

// Close "About this Map" modal when close button in modal is clicked
$('.modal .close-button').on('click', function() {

	$('#screen').fadeToggle();  // toggles visibility of background screen when clicked (shows if hidden, hides if visible)

	$('.modal').fadeToggle();  // toggles visibility of background screen when clicked (shows if hidden, hides if visible)	                        
	
});


