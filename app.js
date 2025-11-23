// DATA ITALIANA/INGLESE
document.getElementById("data").textContent =
    new Date().toLocaleDateString("it-IT", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

// STATO LINGUA
let lingua = "IT";

// DIZIONARIO
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

// SWITCH LINGUA
document.getElementById("langIT").onclick = () => {
    lingua = "IT";
    setLangButtons();
    aggiornaUI();
};
document.getElementById("langEN").onclick = () => {
    lingua = "EN";
    setLangButtons();
    aggiornaUI();
};

function setLangButtons() {
    document.getElementById("langIT").classList.toggle("active", lingua === "IT");
    document.getElementById("langEN").classList.toggle("active", lingua === "EN");
}

// FASCE
let fascia = "giorno";
let settore = "TUTTI";

document.getElementById("btnGiorno").onclick = () => {
    fascia = "giorno";
    aggiornaUI();
};
document.getElementById("btnSera").onclick = () => {
    fascia = "sera";
    aggiornaUI();
};

// SETTORI
document.querySelectorAll(".pill").forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll(".pill").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        settore = btn.dataset.sector;
        render();
    };
});

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

// UI DINAMICA
function aggiornaUI() {
    document.getElementById("btnGiorno").textContent = testo[lingua].giorno;
    document.getElementById("btnSera").textContent = testo[lingua].sera;
    document.querySelector('[data-sector="TUTTI"]').textContent = testo[lingua].tutti;
    document.getElementById("title-header").textContent = testo[lingua].titoloHeader;

    render();
}

// RENDER
function render() {
    const oggi = new Date().toISOString().split("T")[0];
    const filtrate = attività.filter(a =>
        a.giorno === oggi &&
        a.fascia === fascia &&
        (settore === "TUTTI" || a.settore === settore)
    );

    const box = document.getElementById("lista");
    box.innerHTML = "";

    if (filtrate.length === 0) {
        box.innerHTML = `
            <div class="card border-TORNEI">
                ${testo[lingua].nessuna}
            </div>
        `;
        return;
    }

    filtrate.forEach(a => {
        const titolo = lingua === "IT" ? a.titolo_IT : a.titolo_EN;
        box.innerHTML += `
            <div class="card border-${a.settore}">
                <h3>${titolo}</h3>
                <p>${a.orario}</p>
            </div>
        `;
    });
}

aggiornaUI();
