  var map = L.map('map', {
    center: [32.329, 34.858],
    zoom: 8,         // Start at a reasonable ocean zoom
    maxZoom: 10,     // Prevent zooming in too far for this basemap
    minZoom: 2       // Optional: prevent zooming too far out
  });

  // Base map:
  L.tileLayer('https://services.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}').addTo(map);
  // Marine features overlay
  L.tileLayer('https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png').addTo(map);

  // Store reference to the input
  var marker = null;
  var coordInput = document.getElementById('locationInput');

  // Standard Leaflet marker icon, with explicit anchor for bottom center
  const fishIcon = L.icon({
    iconUrl: './images/fish.png', // Flaticon fish image
    iconSize:     [40, 40], // width, height
    iconAnchor:   [20, 15], // point of the icon which corresponds to marker location
    popupAnchor:  [0, -40]  // where popup opens relative to iconAnchor
  });

  // Handle map clicks
  map.on('click', function(e) {
    var lat = e.latlng.lat.toFixed(6);
    var lng = e.latlng.lng.toFixed(6);

    // Place or move marker
    if (!marker) {
      marker = L.marker(e.latlng, { icon: fishIcon, draggable: true }).addTo(map);
      marker.on('dragend', function(ev) {
        var pos = ev.target.getLatLng();
        coordInput.value = pos.lat.toFixed(6) + ', ' + pos.lng.toFixed(6);
      });
    } else {
      marker.setLatLng(e.latlng);
    }
    coordInput.value = lat + ', ' + lng;
  });

  // Handle manual coordinate entry (move marker if valid)
  coordInput.addEventListener('change', function() {
    var val = coordInput.value.split(',');
    if (val.length === 2) {
      var lat = parseFloat(val[0]);
      var lng = parseFloat(val[1]);
      if (!isNaN(lat) && !isNaN(lng)) {
        map.setView([lat, lng], 9);
        if (!marker) {
          marker = L.marker([lat, lng], { icon: standardIcon, draggable: true }).addTo(map);
          marker.on('dragend', function(ev) {
            var pos = ev.target.getLatLng();
            coordInput.value = pos.lat.toFixed(6) + ', ' + pos.lng.toFixed(6);
          });
        } else {
          marker.setLatLng([lat, lng]);
        }
      }
    }
  });