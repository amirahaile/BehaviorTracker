// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://coffeescript.org/

$(function() {
  $("#locate").click(function(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(save_location, handle_error,
      { enableHighAccuracy: true, timeout: 5000 }
    );
  });

  $("#watch").click(function(event) {
    event.preventDefault();
    var watchNum = navigator.geolocation.watchPosition(
      track_location, handle_error, { enableHighAccuracy: true }
    );
  });
});

// SAVE TARGET LOCATION
function save_location(position) {
  var url = "/locations";
  var coordinates = {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
    heading: position.coords.heading
  };

  $.post(url, coordinates, function(){
    // TODO: change this bit to a disappearing "pop" animation
    // removes 'locate' button
    $("#locate").css("display", "none");

    // TODO: Convert coordinates to an address
    // https://developers.google.com/maps/documentation/javascript/geocoding

    // replaces it with a confirmation
    // NOTE: Maybe this should be done in the HTML file and just toggle the display on and off…?
    var successMessage = $("<h2></h2>");
    successMessage.text("Sweet! Your location was saved.");
    successMessage.addClass("text-center");

    var successMark = $("<div></div>");
    successMark.addClass("col-xs-6")
               .addClass("no-float")
               .addClass("center-block")
               .addClass("success-mark");

    var checkmarkGlyph = $("<span><span>");
    checkmarkGlyph.addClass("glyphicon")
                  .addClass("glyphicon-ok")
                  .addClass("checkmark-glyph");
    checkmarkGlyph.attr("aria-hidden", "true");
    successMark.append(checkmarkGlyph);

    $("body").append(successMessage).append(successMark);

    // redirects after 30 sec
    setTimeout(function() { window.location.replace(url); }, 2500);
  });
}

// WATCH LOCATION FOR GAMEPLAY
// every time it gets a new position
function track_location(position) {
  // determine the distance between the saved location and this new position
  var lat1  = parseFloat($.trim($("#latitude").text()));
  var long1 = parseFloat($.trim($("#longitude").text()));
  var location1 = { latitude: lat1, longitude: long1 };
  var lat2  = position.coords.latitude;
  var long2 = position.coords.longitude;
  var location2 = { latitude: lat2, longitude: long2 };
  console.log(location1, location2);

  var distance = calcDistance(location1, location2); // miles to the hundredths
  console.log(distance);
  // if it's closer, send a positive message (hot)
    // if it's within x feet of saved location give x message of intensity
      // change background gradient
      // change status message
      // whatever animations
  // if it's farther, send a negative message (cold)
    // if it's within x feet of saved location give x message of intensity
      // change background gradient
      // change status message
      // whatever animations
  // if it's farther than the fail distance send a fail message
  // if it's within x feet of saved location send success message
}

// thanks @segdeha - http://andrew.hedges.name/experiments/haversine/
// and http://www.movable-type.co.uk/scripts/latlong.html
function calcDistance(location1, location2) {
  // convert to radians
  lat1  = deg2Radian(location1.latitude);
  long1 = deg2Radian(location1.longitude);
  lat2  = deg2Radian(location2.latitude);
  long2 = deg2Radian(location2.longitude);

  // find difference
  lat_distance  = lat2 - lat1;
  long_distance = long2 - long1;

  // Haversine formula
  R = 3959; // earth's radius in miles
  a = Math.pow(Math.sin(lat_distance / 2), 2) +
      Math.cos(lat1) * Math.cos(lat2) *
      Math.pow(Math.sin(long_distance / 2), 2);
  c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  distance = R * c;
  // rounds to the nearest thousandths
  distance = round(distance);

  return distance;
}

function deg2Radian(degree) {
  // 360deg / 2 = 180deg
  radian = degree * Math.PI / 180;
  return radian;
}

function round(num) {
  return Math.round(num * 1000) / 1000;
}

// EROR HANDLING
function handle_error(error) {
  console.log(error.code);
  // TODO: error handling for GPS finder
  if (error.code == 1) {
    // permission denied
  } else if (error.code == 2) {
    // position unavailable
  } else if (error.code == 3) {
    // timeout
  }
}
