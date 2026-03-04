const ball = document.querySelector(".ball")
const bar = document.querySelector(".bar")
const targets = document.querySelectorAll(".target")

const quizPopup = document.getElementById("quiz-popup")
const quizSpørsmål = document.getElementById("quiz-spørsmål")
const quizInput = document.getElementById("quiz-input")
const nesteKnapp = document.getElementById("neste-knapp")

let ballX = window.innerWidth / 2
let ballY = window.innerHeight * 0.8
let fartX = 3
let fartY = -3

let barX = window.innerWidth / 2 - 100

targets.forEach((target, indeks) => {
    if (window.innerWidth < 900 && indeks >= 3) {
        target.style.display = "none"
        return
    }
    const randomTop = Math.random() * 60 + 5    // mellom 5% og 65% ned
    const randomLeft = Math.random() * 80 + 10  // mellom 10% og 90% bortover
    target.style.top = randomTop + "%"
    target.style.left = randomLeft + "%"
})


let currentFasit = ""
let spørsmålIndeks = 0
let pause = false


const spørsmål = [
    { tekst: "Finn lengden av vektoren v = (2, -1, 2)", fasit: "3" },
    { tekst: "Hva er tan(45°)?", fasit: "1" },
    { tekst: "Er vinkelen mellom vektorene (1,2) og (3,-1) større eller mindre enn 90°? (oppgi: større eller mindre). Skalarproduktet er 1", fasit: "mindre" },
    { tekst: "Hva er neste tall i tallfølgen: 3, 6, 9, 12, ?", fasit: "15" },
    { tekst: "Finn prikkproduktet av vektorene (1,2,3) og (4,0,-1)", fasit: "1" }
]

document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") barX -= 30
    if (event.key === "ArrowRight") barX += 30
    bar.style.left = barX + "px"
})


function kolliderer(rect1, rect2) {
    return (
        rect1.left < rect2.right &&
        rect1.right > rect2.left &&
        rect1.top < rect2.bottom &&
        rect1.bottom > rect2.top
    )
}

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

function lukkQuiz() {
    quizPopup.classList.add("skjult")
    spørsmålIndeks++
    pause = false
}
function sjekkSvar() {
    const svar = quizInput.value
    const riktig = svar == currentFasit
    quizInput.style.backgroundColor = riktig ? "lightgreen" : "lightcoral"
    nesteKnapp.classList.remove("skjult")
}

quizInput.addEventListener("keydown", e => { if (e.key === "Enter") sjekkSvar() })


function oppdater() {
    if (pause) return

    ballX += fartX
    ballY += fartY
    ball.style.left = ballX + "px"
    ball.style.top = ballY + "px"

    // Sprett på vegger og tak
    if (ballX <= 0 || ballX >= window.innerWidth - 20) fartX = -fartX
    if (ballY <= 0) fartY = -fartY

    const ballRect = ball.getBoundingClientRect()
    const barRect = bar.getBoundingClientRect()

    // Sprett på baren
    if (kolliderer(ballRect, barRect)) {
        fartY = -Math.abs(fartY)
    }

    // Sjekk kollisjon med mål
    targets.forEach(target => {
        if (target.classList.contains("hit")) return

        const targetRect = target.getBoundingClientRect()

        if (kolliderer(ballRect, targetRect)) {
            target.classList.add("hit")
            fartY = -fartY
            visQuiz()
        }
    })

    if (ballY > window.innerHeight) {
        pause = true
        alert("Game over!")
    }
}

let spillStartet = false

window.addEventListener("scroll", function () {
    if (window.scrollY > 300 && !spillStartet) {
        spillStartet = true
        setInterval(oppdater, 16)
    }
})