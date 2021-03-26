// ==UserScript==
// @name        BasedCookingUserStyles
// @namespace   Violentmonkey Scripts
// @match       https://based.cooking/*
// @grant       none
// @version     1.0
// @author      -
// @description 3/26/2021, 9:24:57 AM
// ==/UserScript==

styles = {
  default: {
    description: 'default (dark)',
    css: `
      body {
        background: black;
        color: white;
      }
      a {
        color: lightblue;
      }
      a:visited {
        color: gray;
      }
      h2 {
        color: tomato;
      }
      code {
        color: forestgreen;
      }
    `
  },
  defaultlight: {
    description: 'default (light)',
    css: `
      body {
        background: white;
        color: black;
      }
      a {
        color: blue;
      }
      a:visited {
        color: purple;
      }
      h2 {
        color: inherit;
      }
      code {
        color: lime;
      }
    `
  },
  spacing: {
    description: 'better spacing',
    css: `
    body{
      line-height: 1.4;
    }
    li{
      margin: 4px 0;
    }
    `
  }
}

function setStyle(style) {
  if(styles.hasOwnProperty(style)) {
    document.querySelector('#userstyle').textContent = styles[style].css;
    localStorage.setItem("currentstyle", style);
  } else {
    console.log("Cannot find style " + style);
  }
}

document.querySelector('head').innerHTML += '<style type="text/css" id="userstyle"></style>'

if(localStorage.getItem("currentstyle")){
  setStyle(localStorage.getItem("currentstyle"));
} else {
  localStorage.setItem("currentstyle", "default");
}

document.body.insertAdjacentHTML('beforeend', `
                                <div id="stylecfg" style="position: fixed; right: 0; bottom: 0">
                                  <select id="styleselect">
                                  </select>
                                </div>
                                `);
styleselect = document.querySelector('#styleselect');
for(style in styles){
  styleselect.innerHTML += '<option value="' + style + '">' + styles[style].description + '</option>';
}

styleselect.value = localStorage.getItem("currentstyle");

styleselect.addEventListener('change', function() {
  setStyle(this.value);
});
