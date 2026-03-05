// ── Elementer ──────────────────────────────────────────────────
const ball = document.querySelector(".ball")
const bar = document.querySelector(".bar")
const targets = document.querySelectorAll(".target")
const quizPopup = document.getElementById("quiz-popup")
const quizSpørsmål = document.getElementById("quiz-spørsmål")
const quizInput = document.getElementById("quiz-input")
const nesteKnapp = document.getElementById("neste-knapp")


// ── Spilltilstand ───────────────────────────────────────────────
let ballX = window.innerWidth / 2
let ballY = window.innerHeight * 0.8
let fartX = 3
let fartY = -3
let pause = false

let currentFasit = ""
let spørsmålIndeks = 0
let spillStartet = false


// ── Spørsmål ────────────────────────────────────────────────────
const spørsmål = [
    { tekst: "Finn lengden av vektoren v = (2, -1, 2)", fasit: "3" },
    { tekst: "Hva er tan(45°)?", fasit: "1" },
    { tekst: "Er vinkelen mellom vektorene (1,2) og (3,-1) større eller mindre enn 90°? (oppgi: større eller mindre). Skalarproduktet er 1", fasit: "mindre" },
    { tekst: "Hva er neste tall i tallfølgen: 3, 6, 9, 12, ?", fasit: "15" },
    { tekst: "Finn prikkproduktet av vektorene (1,2,3) og (4,0,-1)", fasit: "1" }
]


// ── Plasser targets tilfeldig ───────────────────────────────────
targets.forEach((target, indeks) => {
    // Skjul de siste targetene på små skjermer
    if (window.innerWidth < 900 && indeks >= 3) {
        target.style.display = "none"
        return
    }
    const randomTop = Math.random() * 60 + 5   // 5% – 65% ned
    const randomLeft = Math.random() * 80 + 10  // 10% – 90% bortover
    target.style.top = `calc(${randomTop}% + 50px)`
    target.style.left = randomLeft + "%"
})


// ── Bar-bevegelse ───────────────────────────────────────────────
// offsetLeft/offsetWidth henter faktisk posisjon og bredde fra DOM
let barX = bar.offsetLeft
const barBredde = bar.offsetWidth

document.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft") barX -= 30
    else if (e.key === "ArrowRight") barX += 30

    // Math.max og Math.min holder baren innenfor skjermen
    barX = Math.max(0, Math.min(barX, window.innerWidth - barBredde))
    bar.style.left = barX + "px"
})


// ── Kollisjon ───────────────────────────────────────────────────
// getBoundingClientRect() gir koordinatene til et element i vinduet
function kolliderer(rect1, rect2) {
    return (
        rect1.left < rect2.right &&
        rect1.right > rect2.left &&
        rect1.top < rect2.bottom &&
        rect1.bottom > rect2.top
    )
}


// ── Quiz ────────────────────────────────────────────────────────
function visQuiz() {
    if (spørsmålIndeks >= spørsmål.length) return
    pause = true

    currentFasit = spørsmål[spørsmålIndeks].fasit
    quizSpørsmål.textContent = spørsmål[spørsmålIndeks].tekst
    quizInput.value = ""
    quizInput.style.backgroundColor = ""
    nesteKnapp.classList.add("skjult")
    quizPopup.classList.remove("skjult")
}

function sjekkSvar() {
    const riktig = quizInput.value == currentFasit
    quizInput.style.backgroundColor = riktig ? "lightgreen" : "lightcoral"
    nesteKnapp.classList.remove("skjult")
}

function lukkQuiz() {
    quizPopup.classList.add("skjult")
    spørsmålIndeks++
    pause = false
}

// Enter-tast som alternativ til å klikke "Sjekk svar"
quizInput.addEventListener("keydown", e => {
    if (e.key === "Enter") sjekkSvar()
})


// ── Spilløkke ───────────────────────────────────────────────────
function oppdater() {
    if (pause) return

    // Flytt ballen
    ballX += fartX
    ballY += fartY
    ball.style.left = ballX + "px"
    ball.style.top = ballY + "px"

    // Sprett på vegger og tak
    const ballSize = ball.offsetWidth
    if (ballX <= 0 || ballX >= window.innerWidth - ballSize) fartX = -fartX
    if (ballY <= 0) fartY = -fartY

    // Sprett på baren
    const ballRect = ball.getBoundingClientRect()
    const barRect = bar.getBoundingClientRect()
    if (kolliderer(ballRect, barRect)) {
        fartY = -Math.abs(fartY)
    }

    // Sjekk kollisjon med targets
    targets.forEach(target => {
        if (target.classList.contains("hit")) return
        const targetRect = target.getBoundingClientRect()
        if (kolliderer(ballRect, targetRect)) {
            target.classList.add("hit")
            fartY = -fartY
            visQuiz()
        }
    })

    // Game over når ballen faller ut av skjermen
    if (ballY > window.innerHeight) {
        pause = true
        if (confirm("Game over! Prøv igjen?")) {
            ballX = window.innerWidth / 2
            ballY = window.innerHeight * 0.8
            fartX = 3
            fartY = -3
            pause = false
        }
    }
}


// ── Start spillet når brukeren scroller ned ─────────────────────
// setInterval kaller oppdater() hvert 16ms (≈ 60 ganger i sekundet)
window.addEventListener("scroll", function () {
    if (window.scrollY > 300 && !spillStartet) {
        spillStartet = true
        setInterval(oppdater, 16)
    }
})