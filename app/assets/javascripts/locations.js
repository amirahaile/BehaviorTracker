// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://coffeescript.org/

$(function() {
  $("#locate").click(function(event) {
    event.preventDefault();

    navigator.geolocation.getCurrentPosition(save_location, handle_error,
      { enableHighAccuracy: true, timeout: 30000 }
    );
  });
});

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
  });
}

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
