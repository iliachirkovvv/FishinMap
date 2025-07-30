  var map = L.map('map', {
    center: [32.329, 34.858],
    zoom: 9,
    maxZoom: 10,
    minZoom: 2
  });

  // Base map
  L.tileLayer('https://services.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}').addTo(map);
  // Marine features overlay
  L.tileLayer('https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png').addTo(map);

 function centerMapOnUser() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        map.setView([lat, lng], 10);
      },
      function(error) {
        alert("Could not get your location: " + error.message);
      }
    );
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}

// Attach to your button
document.getElementById('navBtn').addEventListener('click', centerMapOnUser);