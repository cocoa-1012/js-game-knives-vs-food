//////////////////// Functionality ////////////////////
var appFocused = true;

function js_init(appBlurGmCallback) {
  window.onfocus = function () {
    appFocused = true;
  };

  window.onblur = function () {
    appFocused = false;
    eval("gml_Script_" + appBlurGmCallback + "(null,null)");
  };
}

function js_browserLanguage() {
  var lang = navigator.language;

  lang = lang.substr(0, 2);

  return lang.toUpperCase();
}
//
function js_trace(text) {
  console.log(text);
}

// SITELOCKS

function js_iframed() {
  if (window.self != window.top) return 1;
  else return 0;
}

function js_getParentDomain() {
  return window.top.location.href;
}

function js_getDomainOfSubDomain() {
  //*** window.location.host is subdomain.domain.com
  var siteName;
  if (js_iframed()) siteName = window.top.location.host;
  else siteName = window.location.host;

  var parts = siteName.split(".");

  if (parts.length >= 2) {
    //*** sub is 'subdomain', 'domain', type is 'com'
    var sub = parts[parts.length - 3];
    var domain = parts[parts.length - 2];
    var type = parts[parts.length - 1];

    return domain + "." + type;
  } else {
    return siteName;
  }
}

/// EVAL

function js_eval(code) {
  eval(code);
}

/// SOME EXTRA FUNC-S

function js_set_document_body_color(newColor) {
  document.body.style.backgroundColor = newColor;
}

function js_set_document_title(newTitle) {
  document.title = newTitle;
}

/// INVISIBLE BUTTONS

function js_CreateInvisibleButton(buttonID, link) {
  var btn = document.createElement("invisible_button");

  btn.id = buttonID;
  btn.link = " ";
  btn.draggable = false;

  if (link == "fullscreen")
    btn.onclick = function () {
      // FULLSCREEN BUTTON
      if (screenfull.enabled) screenfull.toggle(); //toggle(document.getElementById("canvas"));
    };
  else
    btn.onclick = function () {
      // OPEN LINK BUTTON
      window.open(this.link);
    };

  btn.onmousedown = function () {
    return false;
  };
  document.body.appendChild(btn);
}

function js_UpdateInvisibleButton(buttonID, x1, y1, x2, y2, link, active) {
  var btn = document.getElementById(buttonID);

  btn.link = link;

  var scale_scr = getDocHeight() / game_height;

  btn.style.left = parseInt(canvas.style.left, 10) + x1 * scale_scr + "px"; //(wbr-scale_scr * game_width)/2 + x - width * 0.5 + "px";
  btn.style.top = parseInt(canvas.style.top, 10) + y1 * scale_scr + "px"; //(hbr-scale_scr * game_height)/2 + y - height * 0.5 + "px";

  btn.style.width = (x2 - x1) * scale_scr + "px";
  btn.style.height = (y2 - y1) * scale_scr + "px";

  if (active) {
    btn.style.pointerEvents = "auto";
  } else {
    btn.style.pointerEvents = "none";
  }
}

function js_DestroyInvisibleButton(buttonID) {
  var btn = document.getElementById(buttonID);
  btn.parentNode.removeChild(btn);
}
