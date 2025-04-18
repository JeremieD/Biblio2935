"use strict";

// View

const V = {
  search: {},
  stats: {},
  questions: {}
};

whenDOMReady(() => {
  V.spinner = document.getElementById("spinner");

  V.search.button = document.getElementById("search-button");
  V.search.section = document.getElementById("search");
  V.search.bar = document.getElementById("search-bar");
  V.search.toggle = document.getElementById("search-toggle");
  V.search.advanced = document.getElementById("search-advanced");
  V.search.title = document.getElementById("search-title");
  V.search.author = document.getElementById("search-author");
  V.search.publisher = document.getElementById("search-publisher");
  V.search.dateFrom = document.getElementById("search-date-from");
  V.search.dateTo = document.getElementById("search-date-to");
  V.search.genre = document.getElementById("search-genre");
  V.search.language = document.getElementById("search-language");
  V.search.excludeUnavailable = document.getElementById("search-exclude-unavailable");
  V.search.results = document.getElementById("search-results");

  V.stats.button = document.getElementById("stats-button");
  V.stats.section = document.getElementById("stats");

  V.questions.button = document.getElementById("questions-button");
  V.questions.section = document.getElementById("questions");
  V.questions.q1 = document.getElementById("questions-q1");
  V.questions.q2 = document.getElementById("questions-q2");
  V.questions.q3 = document.getElementById("questions-q3");
  V.questions.q4 = document.getElementById("questions-q4");
  V.questions.output = document.getElementById("questions-output");


  V.search.button.addEventListener("click", () => {
    state.currentTab = "search";
    drawTabs();
  }, { passive: true });

  V.search.toggle.addEventListener("click", () => {
    state.search.toggle = !state.search.toggle;
    getSearchResults();
    drawSearch();
  }, { passive: true });

  V.search.bar.addEventListener("input", () => {
    state.search.bar = V.search.bar.value;
    getSearchResults();
    drawSearch();
  }, { passive: true });

  V.search.title.addEventListener("change", () => {
    state.search.title = V.search.title.value.trim();
    getSearchResults();
    drawSearch();
  }, { passive: true });

  V.search.author.addEventListener("change", () => {
    state.search.author = V.search.author.value.trim();
    getSearchResults();
    drawSearch();
  }, { passive: true });

  V.search.publisher.addEventListener("change", () => {
    state.search.publisher = V.search.publisher.value.trim();
    getSearchResults();
    drawSearch();
  }, { passive: true });

  V.search.dateFrom.addEventListener("change", () => {
    state.search.dateFrom = V.search.dateFrom.value;
    getSearchResults();
    drawSearch();
  }, { passive: true });

  V.search.dateTo.addEventListener("change", () => {
    state.search.dateTo = V.search.dateTo.value;
    getSearchResults();
    drawSearch();
  }, { passive: true });

  V.search.genre.addEventListener("change", () => {
    state.search.genre = V.search.genre.value;
    getSearchResults();
    drawSearch();
  }, { passive: true });

  V.search.language.addEventListener("change", () => {
    state.search.language = V.search.language.value;
    getSearchResults();
    drawSearch();
  }, { passive: true });

  V.search.excludeUnavailable.addEventListener("change", () => {
    state.search.excludeUnavailable = V.search.excludeUnavailable.checked;
    getSearchResults();
    drawSearch();
  }, { passive: true });

  V.stats.button.addEventListener("click", () => {
    state.currentTab = "stats";
    drawTabs();
  }, { passive: true });

  V.questions.button.addEventListener("click", () => {
    state.currentTab = "questions";
    drawTabs();
  }, { passive: true });

  drawStats();

  V.questions.q1.addEventListener("click", () => {
    getQ1();
    drawQ1();
  }, { passive: true });
  V.questions.q2.addEventListener("click", () => {
    getQ2();
    drawQ2();
  }, { passive: true });
  V.questions.q3.addEventListener("click", () => {
    getQ3();
    drawQ3();
  }, { passive: true });
  V.questions.q4.addEventListener("click", () => {
    getQ4();
    drawQ4();
  }, { passive: true });
});


function initView() {
  viewLoaded = true;
  dispatchEvent(new Event("viewLoaded"));
}

function drawTabs() {
  V.search.section.classList.toggle("selected", state.currentTab === "search");
  V.search.button.classList.toggle("selected", state.currentTab === "search");
  V.stats.section.classList.toggle("selected", state.currentTab === "stats");
  V.stats.button.classList.toggle("selected", state.currentTab === "stats");
  V.questions.section.classList.toggle("selected", state.currentTab === "questions");
  V.questions.button.classList.toggle("selected", state.currentTab === "questions");
}

function drawSearch() {
  setLoading(true);

  V.search.bar.disabled = !state.search.toggle;
  V.search.toggle.classList.toggle("inverted", state.search.toggle);
  V.search.advanced.classList.toggle("collapse", state.search.toggle);

  V.search.results.innerHTML = "";

  state.searchResults.then(data => {
    let n = 0;
    for (const book of data.rows) {
      if (n > 100) {
        V.search.results.append("Seulement les 100 premiers résultats sont affichés.");
        break;
      }
      V.search.results.append(bookRow(book));
      n++;
    }
    setLoading(false);
  });
}

function drawStats() {

}

function drawQ1() {
  setLoading(true);
  state.questions[1].then(data => {
    V.questions.output.innerHTML = "";

    setLoading(false);
  });
}

function drawQ2() {
  setLoading(true);
  state.questions[2].then(data => {
    V.questions.output.innerHTML = "";

    setLoading(false);
  });
}

function drawQ3() {
  setLoading(true);
  state.questions[3].then(data => {
    V.questions.output.innerHTML = "";
    for (const row of data.rows) {
      V.questions.output.append(bookRow(row));
    }
    setLoading(false);
  });
}

function drawQ4() {
  setLoading(true);
  state.questions[4].then(data => {
    V.questions.output.innerHTML = "";

    setLoading(false);
  });
}

function setLoading(toggle) {
  V.spinner.classList.toggle("selected", toggle);
}

function bookRow(book) {
  const el = document.createElement("li");
  if (book.titre !== undefined) {
    el.innerText += book.titre;
  }
  if (book.annee !== undefined) {
    el.innerText += ", " + book.annee;
  }
  return el;
}
