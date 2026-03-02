const ball = document.querySelector(".ball")
const bar = document.querySelector(".bar")
const targets = document.querySelectorAll(".target")

const quizPopup = document.getElementById("quiz-popup")
const quizSpørsmål = document.getElementById("quiz-spørsmål")
const quizInput = document.getElementById("quiz-input")
const nesteKnapp = document.getElementById("neste-knapp")

let ballX = window.innerWidth / 2
let ballY = window.innerHeight * 0.8
let fartX = 2
let fartY = -2

let barX = window.innerWidth / 2 - 100


let currentFasit = ""
let spørsmålIndeks = 0
let pause = false


const spørsmål = ["Hva er intergralet av ln x", "Hva tangens til 60 grader?", "Hva er neste tall i følgen?"]
const fasiter = ["1", "2", "3"]

document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") barX -= 30
    if (event.key === "ArrowRight") barX += 30
    bar.style.left = barX + "px"
})


function kolliderer(rect1, rect2) {
    // finn midtpunktet til begge sirkler
    let x1 = rect1.left + rect1.width / 2
    let y1 = rect1.top + rect1.height / 2

    let x2 = rect2.left + rect2.width / 2
    let y2 = rect2.top + rect2.height / 2

    // finn avstanden mellom dem
    let dx = x1 - x2
    let dy = y1 - y2
    let avstand = Math.sqrt(dx * dx + dy * dy)

    // kolliderer hvis avstanden er mindre enn begge radiusene lagt sammen
    let radius1 = rect1.width / 2
    let radius2 = rect2.width / 2

    return avstand < radius1 + radius2
}


function visQuiz() {

    if (spørsmålIndeks >= spørsmål.length) return
    pause = true

    currentFasit = fasiter[spørsmålIndeks]
    quizSpørsmål.textContent = spørsmål[spørsmålIndeks]
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

function sjekkSvarMedInput(fasit, elm) {
    const inputElm = elm.previousElementSibling
    const svar = inputElm.value

    if (svar == fasit) {
        inputElm.style.backgroundColor = "lightgreen"
    } else {
        inputElm.style.backgroundColor = "lightcoral"
    }

    nesteKnapp.classList.remove("skjult")
}

function handleEnter(event, fasit, inputElm) {
    if (event.keyCode === 13) {
        const button = inputElm.nextElementSibling
        sjekkSvarMedInput(fasit, button)
    }
}


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
        ball.classList.add("lost")
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