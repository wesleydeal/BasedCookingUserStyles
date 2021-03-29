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
        background: #151515;
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
    #artlist{
      column-gap: 18px;
    }
    `
  },
  firstpass: {
    description: 'first pass',
    css: `
    body{
      background: black;
      color: #eee;
      line-height: 1.4;
      font-family: Roboto, 'Helvetica Neue', sans-serif;
    }
    h1{
      text-transform: uppercase;
      font-weight: normal;
      font-size: 36px;
      text-align: left;
    }
    h2{
      margin-bottom: 0;
    }
    .recipe h1{
      border-bottom: 1px solid #fff;
    }
    a{
      color: #6dd;
      text-decoration: none;
    }
    a:visited{
      color: #4aa;
    }
    li{
      margin: 6px 0;
    }
    ol,ul{
      padding-left: 30px;
      margin: 8px 0;
    }
    .recipestats{
      list-style: none;
      padding: 8px 16px;
      background: #400;
      text-transform: uppercase;
      border-radius: 10px;
      display: flex;
      column-gap: 30px;
      width: fit-content;
    }
    img{
      margin: 0;
    }
    .recipestats li{
      margin: 0;
    }
    #artlist{
      column-gap: 18px;
      list-style-type: none;
      padding: 0;
    }
    @media screen and (min-width: 1250px){
      h2{
        margin-left: -200px;
        margin-bottom: -36px;
        border-top: 1px solid #777;
        padding-left: 5px;
        font-weight: normal;
        text-transform: uppercase;
        padding-top: 10px;
      }
    }
    `
  },
  navajo: {
    description: 'navajo (el3ctr0lyte)',
    css: `
      body{
        background: #200;
        color: navajowhite;
        font-family: Georgia, serif;
      }
      a{
        color: gold;
      }
      a:visited{
        color: darkgoldenrod;
      }
      h1{
        border-bottom: 2px solid;
      }
      .banner hr{
        display: none;
      }
    `
  },
  retrowave: {
    description: 'retrowave',
    css: `
      body{
        background: repeating-radial-gradient(circle at 2vw 5vw,
                                              rgba(255, 200, 150, 0.02),
                                              rgba(255, 200, 150, 0.02) 10px,
                                              rgba(255, 255, 255, 0) 10px,
                                              rgba(255, 255, 255, 0) 20px),
                    linear-gradient(-45deg, #000, #101 30%, #803);
        font: 18px/1.4 monospace;
        max-width: 1200px;
        color: #fff;
      }
      footer a:nth-child(2){
        content: '';
        position: absolute;
        left: -8vw;
        top: -5vw;
        display: block;
        background: linear-gradient(45deg, #fcc 0%, #fa0 15%,#f50 80%);
        box-shadow: 5px 5px 100px #f50;
        width: 20vw;
        height: 20vw;
        border-radius: 999px;
        overflow: hidden;
        z-index: -1;
      }
      a{
        color: deepskyblue;
      }
      a:visited{
        color: coral;
      }
      h1{
        color: #0ff;
        font-size: 64px;
        padding: 5px 20px 10px;
        margin: 20px 0 0 0;
        font-weight: 700;
        z-index: 120;
        background: rgba(0,0,0,.8);
        display: inline-block;
        line-height: 1;
      }
      h2{
        font-size: 1.7em;
        color: #000;
        margin: 20px 0 10px;
        background: linear-gradient(120deg, #f90, #f60);
        display: table;
        padding: 5px 20px;
        border: 0;
        z-index: 140;
        position: relative;
      }
      .listing h1{
        font-size: 0;
      }
      .listing h1:after{
        content: 'Based Cooking';
        font-size: 64px;
      }
      hr{
        border-color: orangered;
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

// Add additional selectors to make styling easier

if(document.querySelector('#artlist')){
  document.body.classList.add("listing")
} else {
  document.body.classList.add("recipe")
}

for (const ul of document.querySelectorAll("ul")) {
  if (ul.textContent.includes("⏲️ Prep time") || ul.textContent.includes("🍳 Cook time" || ul.textContent.includes("🍽️ Servings"))){
    ul.classList.add("recipestats");
  }
}
