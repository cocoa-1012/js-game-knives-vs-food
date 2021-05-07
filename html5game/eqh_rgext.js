// Callbacks handling
var callbacks = [];

function callbackAdd(name, param1 = "", param2 = "", param3 = "") {
  var c = {};
  c["name"] = name;
  c["param1"] = param1;
  c["param2"] = param2;
  c["param3"] = param3;

  callbacks.push(c);
}

function callbacksExec() {
  var arrayLength = callbacks.length;

  if (arrayLength > 0) {
    var c;
    for (var i = 0; i < arrayLength; i++) {
      c = callbacks[i];
      eval("gml_Script_" + c.name + "(null,null)");
    }
    callbacks.length = 0;
  }
}

// arg - string
function RG_sfxHapticFeedback(arg) {
  window.NrgWebApi.sfxHapticFeedback(arg);
}

// initialize
function RG_Init(onGameUpdatedStr, onStartGameIntroStr) {
  function onGameUpdated(updateType, secondsLeft) {
    var gameState = RG_GetGameState();
    eval(
      "gml_Script_" +
        onGameUpdatedStr +
        "(null,null,'" +
        updateType +
        "'," +
        secondsLeft +
        ",'" +
        gameState +
        "')"
    );
  }
  function onStartGameIntro() {
    eval("gml_Script_" + onStartGameIntroStr + "(null,null)");
  }

  window.NrgWebApi.init(onGameUpdated, onStartGameIntro);
}

//Call this when all intro animations have been finished
//and the game is ready to be started
function RG_GameIntroFinished() {
  // Notify the API that the game is ready to be started
  window.NrgWebApi.gameIntroFinished();
}

function RG_GetGameState() {
  return window.NrgWebApi.getGameState();
}

// Call window.NrgWebApi.loaded() once the game is fully loaded
function RG_Loaded() {
  window.NrgWebApi.loaded();
}

function RG_ScoreUpdate(score) {
  // Report updated score
  window.NrgWebApi.reportScoreUpdate(score);
}

function RG_ReportGameResultGameExpired(score) {
  // Report final score.
  // The second parameter is a JSOB object with key/values for any parameters you want to log to document the game result.
  window.NrgWebApi.reportGameResultGameExpired(score, {});
}

function RG_ReportGameResultGameEnded(score, reason) {
  // Report final score, in this example the player collided with an obstacle, so we pass "Collission" as reason in the third parameter
  // The second parameter is a JSOB object with key/values for any parameters you want to log to document the game result.
  window.NrgWebApi.reportGameResultGameEnded(score, {}, reason);
}

function RG_GameScreenFinished() {
  // Notify the API that we finished showing the result and celebrations, and so we can now hide the Game screen and return to the NRG Game App.
  window.NrgWebApi.gameScreenFinished();
}

function RG_GetParam(paramName, defaultValue) {
  return window.NrgWebApi.getParam(paramName, defaultValue);
}

var RGParamsObject = {};

function RG_ReportParam(paramName, value) {
  RGParamsObject[paramName] = value;
}

function RG_ReportGameParams() {
  window.NrgWebApi.reportGameParameters(RGParamsObject);
}

function detectIPhoneX() {
  //return 1;
  return window.iphoneX;
}

function RG_RandomInt(name, mininclusive, maxexclusive) {
  return window.NrgWebApi.getRandomInt(name, mininclusive, maxexclusive);
}

checkIPhoneX(window);

function checkIPhoneX(window) {
  // Really basic check for the ios platform
  // https://stackoverflow.com/questions/9038625/detect-if-device-is-ios
  var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  // Get the device pixel ratio
  var ratio = window.devicePixelRatio || 1;

  // Define the users device screen dimensions
  var screen = {
    width: window.screen.width * ratio,
    height: window.screen.height * ratio,
  };

  // iPhone X Detection
  window.iphoneX = false;
  if (iOS && screen.width == 1125 && screen.height === 2436) {
    // Set a global variable now we've determined the iPhoneX is true
    window.iphoneX = true;

    // Adds a listener for ios devices that checks for orientation changes.
    // window.addEventListener('orientationchange', update);
    // update();
  }

  // Each time the device orientation changes, run this update function
  function update() {
    notch();
    iphoneXChecker();
  }

  // Notch position checker
  function notch() {
    var _notch = "";

    if ("orientation" in window) {
      // Mobile
      if (window.orientation == 90) {
        _notch = "left";
      } else if (window.orientation == -90) {
        _notch = "right";
      }
    } else if ("orientation" in window.screen) {
      // Webkit
      if (screen.orientation.type === "landscape-primary") {
        _notch = "left";
      } else if (screen.orientation.type === "landscape-secondary") {
        _notch = "right";
      }
    } else if ("mozOrientation" in window.screen) {
      // Firefox
      if (screen.mozOrientation === "landscape-primary") {
        _notch = "left";
      } else if (screen.mozOrientation === "landscape-secondary") {
        _notch = "right";
      }
    }

    window.notch = _notch;
  }
}
