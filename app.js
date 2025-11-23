// ELEMENTI BASE
const dataEl = document.getElementById("data");
const titleHeaderEl = document.getElementById("title-header");
const btnGiorno = document.getElementById("btnGiorno");
const btnSera = document.getElementById("btnSera");
const btnLangIT = document.getElementById("langIT");
const btnLangEN = document.getElementById("langEN");
const listaEl = document.getElementById("lista");

// DATA
dataEl.textContent = new Date().toLocaleDateString("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
});

// STATO LINGUA
let lingua = "IT";

// DIZIONARIO TESTI
const testo = {
    IT: {
        giorno: "Giorno",
        sera: "Sera",
        tutti: "Tutti",
        titoloHeader: "PROGRAMMA ANIMAZIONE",
        nessuna: "Nessuna attività disponibile con i filtri selezionati."
    },
    EN: {
        giorno: "Day",
        sera: "Evening",
        tutti: "All",
        titoloHeader: "ANIMATION PROGRAM",
        nessuna: "No activities available for the selected filters."
    }
};

// STATO FILTRI
let fascia = "giorno";
let settore = "TUTTI";

// DATI ESEMPIO (bilingue)
const attività = [
    {
        giorno: "2025-07-01",
        fascia: "giorno",
        settore: "VIK",
        titolo_IT: "Benvenuto MiniClub",
        titolo_EN: "MiniClub Welcome",
        orario: "10:00 - 11:30"
    },
    {
        giorno: "2025-07-01",
        fascia: "giorno",
        settore: "TORNEI",
        titolo_IT: "Torneo Ping Pong",
        titolo_EN: "Ping Pong Tournament",
        orario: "15:00"
    },
    {
        giorno: "2025-07-01",
        fascia: "giorno",
        settore: "FITNESS",
        titolo_IT: "Risveglio Muscolare",
        titolo_EN: "Morning Stretching",
        orario: "09:00"
    }
];

// LISTENER LINGUA
btnLangIT.addEventListener("click", () => {
    lingua = "IT";
    aggiornaLinguaUI();
    render();
});

btnLangEN.addEventListener("click", () => {
    lingua = "EN";
    aggiornaLinguaUI();
    render();
});

// LISTENER FASCIA
btnGiorno.addEventListener("click", () => {
    fascia = "giorno";
    btnGiorno.classList.add("active");
    btnSera.classList.remove("active");
    render();
});

btnSera.addEventListener("click", () => {
    fascia = "sera";
    btnSera.classList.add("active");
    btnGiorno.classList.remove("active");
    render();
});

// LISTENER SETTORI
document.querySelectorAll(".pill").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".pill").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        settore = btn.dataset.sector;
        render();
    });
});

// AGGIORNA TESTI INTERFACCIA IN BASE ALLA LINGUA
function aggiornaLinguaUI() {
    // bottoni lingua
    btnLangIT.classList.toggle("active", lingua === "IT");
    btnLangEN.classList.toggle("active", lingua === "EN");

    // tab Giorno / Sera
    btnGiorno.textContent = testo[lingua].giorno;
    btnSera.textContent = testo[lingua].sera;

    // pill "Tutti"
    const pillTutti = document.querySelector('[data-sector="TUTTI"]');
    if (pillTutti) pillTutti.textContent = testo[lingua].tutti;

    // titolo header
    if (titleHeaderEl) titleHeaderEl.textContent = testo[lingua].titoloHeader;
}

// RENDER LISTA ATTIVITÀ
function render() {
    const oggi = new Date().toISOString().split("T")[0];

    const filtrate = attività.filter(a =>
        a.giorno === oggi &&
        a.fascia === fascia &&
        (settore === "TUTTI" || a.settore === settore)
    );

    listaEl.innerHTML = "";

    if (filtrate.length === 0) {
        listaEl.innerHTML = `
            <div class="card border-TORNEI">
                ${testo[lingua].nessuna}
            </div>
        `;
        return;
    }

    filtrate.forEach(a => {
        const titolo = lingua === "IT" ? a.titolo_IT : a.titolo_EN;
        listaEl.innerHTML += `
            <div class="card border-${a.settore}">
                <h3>${titolo}</h3>
                <p>${a.orario}</p>
            </div>
        `;
