"use strict";

// Controller

const state = {
  currentTab: "search",
  search: {
    advanced: true,
    text: "",
    title: "",
    author: "",
    publisher: "",
    dateFrom: "",
    dateTo: "",
    genre: "",
    language: "",
    excludeUnavailable: false
  },
  searchResults: [],
  stats: {},
  questions: []
};

initController();
function initController() {
  getStats();
}

function getSearchResults() {
  const query = {
    q: state.search.bar,
    titre: state.search.title,
    auteur: state.search.author,
    editeur: state.search.publisher,
    de: state.search.dateFrom,
    a: state.search.dateTo,
    genre: state.search.genre,
    excludeUnavailable: state.search.excludeUnavailable,
  };
  state.searchResults = httpGet("/api/search?" + new URLSearchParams(query).toString()).then(JSON.parse);
}

function getStats() {
  httpGet("/api/stats").then(data => {
    state.stats = JSON.parse(data);
  });
}

function getQ1() {
  state.questions[1] = httpGet("/api/questions/1").then(JSON.parse);
}

function getQ2() {
  state.questions[2] = httpGet("/api/questions/2").then(JSON.parse);
}

function getQ3() {
  state.questions[3] = httpGet("/api/questions/3").then(JSON.parse);
}

function getQ4() {
  state.questions[4] = httpGet("/api/questions/4").then(JSON.parse);
}
