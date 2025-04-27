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
  V.search.results = document.getElementById("search-results");

  V.stats.button = document.getElementById("stats-button");
  V.stats.section = document.getElementById("stats");
  V.stats.livres = document.getElementById("stats-livres");
  V.stats.adherents = document.getElementById("stats-adherents");
  V.stats.emprunts = document.getElementById("stats-emprunts");
  V.stats.retards = document.getElementById("stats-retards");

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
    state.search.advanced = !state.search.advanced;
    getSearchResults();
    drawSearch();
  }, { passive: true });

  V.search.bar.addEventListener("input", () => {
    state.search.bar = V.search.bar.value;
    getSearchResults();
    drawSearch();
  }, { passive: true });

  V.search.title.addEventListener("input", () => {
    state.search.title = V.search.title.value.trim();
    getSearchResults();
    drawSearch();
  }, { passive: true });

  V.search.author.addEventListener("input", () => {
    state.search.author = V.search.author.value.trim();
    getSearchResults();
    drawSearch();
  }, { passive: true });

  V.search.publisher.addEventListener("input", () => {
    state.search.publisher = V.search.publisher.value.trim();
    getSearchResults();
    drawSearch();
  }, { passive: true });

  V.search.dateFrom.addEventListener("input", () => {
    state.search.dateFrom = V.search.dateFrom.value;
    getSearchResults();
    drawSearch();
  }, { passive: true });

  V.search.dateTo.addEventListener("input", () => {
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

  initView();
});


function initView() {
  viewLoaded = true;
  dispatchEvent(new Event("viewLoaded"));
  getSearchResults();
  drawSearch();
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

  V.search.bar.disabled = state.search.advanced;
  V.search.toggle.classList.toggle("inverted", !state.search.advanced);
  V.search.advanced.classList.toggle("collapse", !state.search.advanced);

  state.searchResults.then(data => {
    V.search.results.innerHTML = "";
    const p = document.createElement("p");
    p.innerText = data.rowCount + " résutats.";
    if (data.rowCount > 100) p.innerText += " Seuls les 100 premiers sont affichés.";
    V.search.results.append(p);
    let n = 0;
    for (const book of data.rows) {
      if (n > 100) break;
      V.search.results.append(bookRow(book));
      n++;
    }
    setLoading(false);
  });
}

function drawStats() {
  setLoading(true);
  state.stats.then(data => {
    V.stats.livres.innerText = data.livres;
    V.stats.adherents.innerText = data.adherents;
    V.stats.emprunts.innerText = data.emprunts;
    V.stats.retards.innerText = data.retards;
    setLoading(false);
  });
}

function drawQ1() {
  setLoading(true);
  state.questions[1].then(data => {
    V.questions.output.innerHTML = "";

    const p = document.createElement("p");
    p.innerText = "→ Quels sont les abonnés ayant actuellement emprunté au moins un livre documentaire en français et publié avant 2010?";
    V.questions.output.append(p);

    for (const row of data.rows) {
      const el = document.createElement("li");
      el.innerText += row.nom + ": " + round(row.count, 1) + " emprunts";
      V.questions.output.append(el);
    }
    setLoading(false);
  });
}

function drawQ2() {
  setLoading(true);
  state.questions[2].then(data => {
    V.questions.output.innerHTML = "";

    const p = document.createElement("p");
    p.innerText = "→ Quels sont les livres les plus empruntés du genre “fiction”?";
    V.questions.output.append(p);

    for (const row of data.rows) {
      V.questions.output.append(bookRow(row));
    }
    setLoading(false);
  });
}

function drawQ3() {
  setLoading(true);
  state.questions[3].then(data => {
    V.questions.output.innerHTML = "";

    const p = document.createElement("p");
    p.innerText = "→ Quel est le titre et la date de publication des livres de Sylvain Tesson entre 2010 et 2020?";
    V.questions.output.append(p);

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

    const p = document.createElement("p");
    p.innerText = "→ Quelle est la durée moyenne d’emprunt par adhérent?";
    V.questions.output.append(p);

    for (const row of data.rows) {
      const el = document.createElement("li");
      el.innerText += row.nom + ": " + round(row.avg, 1) + " jours";
      V.questions.output.append(el);
    }
    setLoading(false);
  });
}

function setLoading(toggle) {
  V.spinner.classList.toggle("selected", toggle);
}

function bookRow(book) {
  const el = document.createElement("li");
  el.classList.add("book");

  if (book.isbn) {
    const isbnEl = document.createElement("span");
    isbnEl.classList.add("isbn");
    isbnEl.innerText = book.isbn;
    el.append(isbnEl);
  }
  if (book.titre) {
    const titreEl = document.createElement("span");
    titreEl.classList.add("titre");
    titreEl.innerText = book.titre;
    el.append(titreEl);
  }
  if (book.auteur) {
    const auteurEl = document.createElement("span");
    auteurEl.classList.add("auteur");
    auteurEl.innerText = book.auteur;
    el.append(auteurEl);
  }
  if (book.editeur) {
    const editeurEl = document.createElement("span");
    editeurEl.classList.add("editeur");
    editeurEl.innerText = book.editeur;
    el.append(editeurEl);
  }
  if (book.annee) {
    const anneeEl = document.createElement("span");
    anneeEl.classList.add("annee");
    anneeEl.innerText = book.annee;
    el.append(anneeEl);
  }
  if (book.genre) {
    const genreEl = document.createElement("span");
    genreEl.classList.add("genre");
    genreEl.innerText = book.genre;
    el.append(genreEl);
  }
  if (book.langue) {
    const langueEl = document.createElement("span");
    langueEl.classList.add("langue");
    langueEl.innerText = book.langue;
    el.append(langueEl);
  }
  if (book.count) {
    const countEl = document.createElement("span");
    countEl.classList.add("count");
    countEl.innerText = "emprunté " + book.count + " fois";
    el.append(countEl);
  }

  return el;
}
