// if it's within x feet of saved location give x message of intensity
  // change background gradient
  // whatever animations

// the transition messages are only used when the user changes direction
// i.e. moved farther away, but then changed and got closer
var coldTransitions = [
  "Watch out! It's getting chilly."
];
var hotTransitions = [
  "On track! It's heating up."
];
var coldMessages = [
  "Brrr – it's cold in here.",
  "Say adiós to those toes. Frostbite is on its way.",
  "Looks like Abominable Snowman territory…"
];
var hotMessages = [
  "It's gettin' hot, hot, hot.",
  "You're burning up!",
  "You're on fire!"
];

var pastDirections = [];
var lastDirection = pastDirections[pastDirections.length - 1];


function moved(currentDirection) {
  pastDirections.push(currentDirection);
  var messageArray;

  // check if the last message was in a different direction
  if (lastDirection != currentDirection) {
    if (currentDirection === "closer") { messageArray = coldTransitions; }
    if (currentDirection === "farther") { messageArray = hotTransitions; }
  } else {
    if (currentDirection === "closer") { messageArray = hotMessages; }
    if (currentDirection === "farther") { messageArray = coldMessages; }
  }

  // randomize a corresponding message
  var randIndex = Math.floor(Math.random() * (messageArray.length - 1));
  var message = messageArray[randIndex];
}

function updateMessage(message) {
  // TODO: cool animations
  $("#message").html(
    "<p class='text-center'>" + message + "</p>"
  );
}

function stopTracking(outcome, watchNum) {
  navigator.geolocation.clearWatch(watchNum); // ends the tracking
  var message;

  // determines the message
  if (outcome === "success") { message = "Here it is!"; }
  if (outcome === "failure") { message = "Dude… So sorry we lost you…"; }

  $("#kill-tracker").remove();
  // TODO: cool animations
  $("#message").html(
    "<p class='text-center'>" + message + "</p>"
  );
}
