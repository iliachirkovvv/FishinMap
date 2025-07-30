  var map = L.map('map', {
    center: [32.329, 34.858],
    zoom: 8,         // Start at a reasonable ocean zoom
    maxZoom: 10,     // Prevent zooming in too far for this basemap
    minZoom: 2       // Optional: prevent zooming too far out
  });

  // Base map:
  L.tileLayer('https://services.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, National Geographic, DeLorme, HERE, Geonames.org, and others'
  }).addTo(map);
  // Marine features overlay
  L.tileLayer('https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; OpenSeaMap contributors'
  }).addTo(map);

  // Store reference to the input
  var marker = null;
  var coordInput = document.getElementById('coordInput');

  // Standard Leaflet marker icon, with explicit anchor for bottom center
  var standardIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [11,90], // bottom center
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  // Handle map clicks
  map.on('click', function(e) {
    var lat = e.latlng.lat.toFixed(6);
    var lng = e.latlng.lng.toFixed(6);

    // Place or move marker
    if (!marker) {
      marker = L.marker(e.latlng, { icon: standardIcon, draggable: true }).addTo(map);
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
        map.setView([lat, lng], map.getZoom());
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