var map;
var marker = null;
var userLat = null;
var userLng = null;
var requestURL;
var output;

function initMap() {
  var london = {lat:51.316302085018876,lng:-0.1139043506334474}
  map = new google.maps.Map(document.getElementById('map'), {
    zoom:3,
    center: london,
    mapTypeId: 'terrain'
  });

  // Listen for click on map calls addMarker function
  map.addListener('click', function(event) {
    marker.setMap(null);
    addMarker(event.latLng);
    if (output) {
      output.innerHTML = null;
    }

  });
  addMarker(london);
}

// Removes current marker and adds new marker
function addMarker(location){
  marker = new google.maps.Marker({
    position: location,
    map: map,
  });
  // Assign lat and lng to variable, log to console
  // and use in URL for GET request
  userLat = marker.getPosition().lat();
  userLng = marker.getPosition().lng();
  document.getElementById('currentLat').innerHTML = "Latitude: " + userLat;
  document.getElementById('currentLng').innerHTML = "Longitude: " + userLng;
}
