  var map = L.map('map', {
    center: [32.329, 34.858],
    zoom: 8,
    maxZoom: 10,
    minZoom: 2
  });

  // Base map
  L.tileLayer('https://services.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}').addTo(map);
  // Marine features overlay
  L.tileLayer('https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png').addTo(map);

  const fishIcon = L.icon({
    iconUrl: './images/fish.png', // Flaticon fish image
    iconSize:     [40, 40], // width, height
    iconAnchor:   [20, 40], // point of the icon which corresponds to marker location
    popupAnchor:  [0, -40]  // where popup opens relative to iconAnchor
  });

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

// Fetch posts and show as markers
fetch('/api/fish-locations') // or your actual endpoint, e.g. '/api/posts'
  .then(res => res.json())
  .then(posts => {
    posts.forEach(post => {
      if (post.location) {
        // Split "lat,lng" string
        const [lat, lng] = post.location.split(',').map(Number);
        // Validate numbers
        if (!isNaN(lat) && !isNaN(lng)) {
          // Only show approved posts, or change logic as needed
          if (post.__v == 1) {
            const marker = L.marker([lat, lng], { icon: fishIcon }).addTo(map)
              .bindPopup(
                `<b>${post.fishType || 'Unknown Fish'}</b><br>
                 ${post.catchDate ? new Date(post.catchDate).toLocaleDateString() : ''}
                 ${post.fishWeight ? '<br>Weight: ' + post.fishWeight : ''}
                 ${post.fishLength ? '<br>Length: ' + post.fishLength : ''}
                 ${post.photoSrc ? '<br><img src="' + post.photoSrc + '" style="max-width:100px;max-height:80px;"/>' : ''}
                `
              );
              marker.on('mouseover', function(e) { this.openPopup(); });
              marker.on('mouseout', function(e) { this.closePopup(); });
          }
        }
      }
    });
  })
  .catch(err => {
    console.error('Failed to fetch locations:', err);
  });

  fetch('/api/expert-fish-locations')
  .then(res => res.json())
  .then(posts => {
    posts.forEach(post => {
      if (post.location) {
        // Split "lat,lng" string
        const [lat, lng] = post.location.split(',').map(Number);
        // Validate numbers
        if (!isNaN(lat) && !isNaN(lng)) {
          // Only show approved posts, or change logic as needed
          if (post.status == 1) {
            const marker = L.marker([lat, lng], { icon: fishIcon }).addTo(map)
              .bindPopup(
                `<b>Expert post!</b><br>
                 ${post.fishType || 'Unknown Fish'}</b><br>
                 ${post.catchDate ? new Date(post.catchDate).toLocaleDateString() : ''}
                 ${post.fishWeight ? '<br>Average Weight: ' + post.fishWeight : ''}
                 ${post.fishLength ? '<br>Average Length: ' + post.fishLength : ''}
                 ${post.amount ? '<br>Amount: ' + post.amount : ''}
                 ${post.photoSrc ? '<br><img src="' + post.photoSrc + '" style="max-width:100px;max-height:80px;"/>' : ''}
                `
              );
              marker.on('mouseover', function(e) { this.openPopup(); });
              marker.on('mouseout', function(e) { this.closePopup(); });
          }
        }
      }
    });
  })
  .catch(err => {
    console.error('Failed to fetch locations:', err);
  });

