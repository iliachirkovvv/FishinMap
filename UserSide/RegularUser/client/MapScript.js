  var map = L.map('map', {
    center: [32.329, 34.858],
    zoom: 9,
    maxZoom: 10,
    minZoom: 2
  });

  // Base map:
  L.tileLayer('https://services.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, National Geographic, DeLorme, HERE, Geonames.org, and others'
  }).addTo(map);
  // Marine features overlay
  L.tileLayer('https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; OpenSeaMap contributors'
  }).addTo(map);
