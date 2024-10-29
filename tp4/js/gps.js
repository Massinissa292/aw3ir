// demande de la localisation à l'utilisateur
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      document.querySelector("#map").innerHTML =
        "Geolocation is not supported by this browser.";
    }
  }
  
  // Si l"utilisateur l'autorise, on récupère les coordonnées dans l'objet "position"
  function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    // Remplir les coordonnées dans le champ adresse
    document.getElementById("inputAddress").value = `Latitude: ${latitude}, Longitude: ${longitude}`;

    // Afficher la carte centrée sur la position
    var latlon = latitude + "," + longitude;
    var img_url = `https://maps.googleapis.com/maps/api/staticmap?center=${latlon}&zoom=14&size=400x300&key=AIzaSyAkmvI9DazzG9p77IShsz_Di7-5Qn7zkcg`;

    document.querySelector("#map").innerHTML = `<img src='${img_url}'>`;
}

  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        document.querySelector("#map").innerHTML =
          "User denied the request for Geolocation.";
        break;
      case error.POSITION_UNAVAILABLE:
        document.querySelector("#map").innerHTML =
          "Location information is unavailable.";
        break;
      case error.TIMEOUT:
        document.querySelector("#map").innerHTML =
          "The request to get user location timed out.";
        break;
      case error.UNKNOWN_ERROR:
        document.querySelector("#map").innerHTML = "An unknown error occurred.";
        break;
    }
  }