"use strict";

function whenDOMReady(callback, options = { once: true, passive: true }) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", callback, options);
  } else {
    callback();
  }
}

var viewLoaded = false;
function whenViewReady(callback, options = { once: true, passive: true }) {
  if (!viewLoaded) {
    addEventListener("viewLoaded", callback, options);
  } else {
    callback();
  }
}

async function httpGet(url) {
  return new Promise(function(resolve, reject) {
    const httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
          try {
            resolve(httpRequest.responseText);
          } catch (e) {
            console.error(e);
            reject(e);
          }
        } else {
          reject(httpRequest.status);
      } }
    };
    httpRequest.open("GET", url);
    httpRequest.send();
  });
}

function round(n, p) {
  const f = 10**p;
  return Math.round(n*f) / f;
}
