$(function() {
  $("#locate").click(function(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(saveLocation, handleError,
      { enableHighAccuracy: true, timeout: 5000 }
    );
  });

  var watchNum;

  $("#watch").click(function(event) {
    event.preventDefault();
    watchNum = navigator.geolocation.watchPosition(
      trackLocation, handleError, { enableHighAccuracy: true }
    );

    $(this).remove();
    $("#kill-tracker").removeClass("hidden");
  });

  $("#kill-tracker").click(function(event) {
    event.preventDefault();
    stopTracking("failure", watchNum);
  });
});

// SAVE TARGET LOCATION
function saveLocation(position) {
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
var distances = [];
function trackLocation(position) {
  // determine the distance between the saved location and this new position
  var lat1  = parseFloat($.trim($("#latitude").text()));
  var long1 = parseFloat($.trim($("#longitude").text()));
  var location1 = { latitude: lat1, longitude: long1 };

  var lat2  = position.coords.latitude;
  var long2 = position.coords.longitude;
  var location2 = { latitude: lat2, longitude: long2 };
  // returns miles to the hundredths
  var distance = calcDistance(location1, location2);
  distances.push(distance);

  // determines what type of message to send
  var lastPosition = distances[distances.length - 2];
  var currentPosition = distances[distances.length - 1];

  // NOTE: Might need to set a minimum difference between the last & current distance so that you're not firing off messages every second and run out?
  {
    // user is closer
    if (currentPosition < lastPosition) { moved("closer"); }
    // user is farther
    if (currentPosition > lastPosition) { moved("farther"); }
    // user found location - 0.009 is arbitrary
    if (currentPosition < 0.009) { stopTracking("success"); }
    // if user is farther than fail distance?
  } if (lastPosition !== undefined);
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

// ERROR HANDLING
function handleError(error) {
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
