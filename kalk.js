// ======================
// STATE VARIABLES
// ======================

let tall1 = 0
let tall2 = 0

let num1 = true
let num2 = false
let writingNum2 = false

let decimalPlaces = 0
let desimal = false

let add = false
let minus = false
let times = false
let divide = false


// ======================
// DOM ELEMENTS
// ======================

const outputElm = document.querySelector(".output p")


// ======================
// KEYBOARD INPUT
// ======================

document.addEventListener("keydown", function (event) {

    if (!isNaN(event.key)) {
        addNumber(Number(event.key))
    }

    if (event.key === "+") plus()
    if (event.key === "-") subtract()
    if (event.key === "*") multiply()
    if (event.key === "/") quotient()

    if (event.key === ".") point()

    if (event.key === "Backspace") del()

    if (event.key === "Enter") equal()
})


// ======================
// NUMBER INPUT
// ======================

function addNumber(num) {

    if (num1) {

        decimalPlaces = checkDecimals(tall1)

        if (!desimal) {
            tall1 = tall1 * 10 + num
        } 
        else {
            decimalPlaces++
            tall1 = tall1 + num / (10 ** decimalPlaces)
            tall1 = Math.round(tall1 * 10 ** decimalPlaces)
            tall1 = tall1 / 10 ** decimalPlaces
        }
    }

    if (num2) {

        decimalPlaces = checkDecimals(tall2)
        writingNum2 = true

        if (!desimal) {
            tall2 = tall2 * 10 + num
        } 
        else {
            decimalPlaces++
            tall2 = tall2 + num / (10 ** decimalPlaces)
            tall2 = Math.round(tall2 * 10 ** decimalPlaces)
            tall2 = tall2 / 10 ** decimalPlaces
        }
    }

    show()
}


// ======================
// DELETE
// ======================

function del() {

    if (num1) {

        decimalPlaces = checkDecimals(tall1)

        if (tall1 == Math.floor(tall1)) {
            tall1 = Math.floor(tall1 / 10)
        }

        if (decimalPlaces === 1) {
            tall1 = Math.floor(tall1)
            desimal = false
        }

        if (decimalPlaces > 1) {
            tall1 = Math.floor(tall1 * 10 ** (decimalPlaces - 1)) / (10 ** (decimalPlaces - 1))
        }
    }

    if (num2) {

        if (!writingNum2) {
            num1 = true
            num2 = false
            add = minus = times = divide = false
            show()
            return
        }

        if (tall2 === 0) {
            writingNum2 = false
        }

        decimalPlaces = checkDecimals(tall2)

        if (tall2 == Math.floor(tall2)) {
            tall2 = Math.floor(tall2 / 10)
        }

        if (decimalPlaces === 1) {
            tall2 = Math.floor(tall2)
            desimal = false
        }

        if (decimalPlaces > 1) {
            tall2 = Math.floor(tall2 * 10 ** (decimalPlaces - 1)) / (10 ** (decimalPlaces - 1))
        }
    }

    show()
}


// ======================
// OPERATIONS
// ======================

function plus() {

    add = true
    minus = false
    times = false
    divide = false

    desimal = false
    decimalPlaces = 0

    if (num2) {
        tall1 += tall2
        tall2 = 0
        writingNum2 = false
    }

    if (num1) {
        num1 = false
        num2 = true
    }

    show()
}


function subtract() {

    add = false
    minus = true
    times = false
    divide = false

    desimal = false
    decimalPlaces = 0

    if (num2) {
        tall1 -= tall2
        tall2 = 0
        writingNum2 = false
    }

    if (num1) {
        num1 = false
        num2 = true
    }

    show()
}


function multiply() {

    add = false
    minus = false
    times = true
    divide = false

    desimal = false
    decimalPlaces = 0

    if (num2) {
        tall1 *= tall2
        tall2 = 0
        writingNum2 = false
    }

    if (num1) {
        num1 = false
        num2 = true
    }

    show()
}


function quotient() {

    add = false
    minus = false
    times = false
    divide = true

    desimal = false
    decimalPlaces = 0

    if (num2) {

        if (tall2 === 0) {
            outputElm.textContent = "Error"
            reset()
            return
        }

        tall1 /= tall2
        tall2 = 0
        writingNum2 = false
    }

    if (num1) {
        num1 = false
        num2 = true
    }

    show()
}


// ======================
// DECIMAL
// ======================

function point() {

    if (!desimal) {

        desimal = true

        if (num2) {
            writingNum2 = true
        }
    }
}


// ======================
// EQUAL
// ======================

function equal() {

    if (add) tall1 += tall2
    if (minus) tall1 -= tall2
    if (times) tall1 *= tall2

    if (divide) {

        if (tall2 === 0) {
            outputElm.textContent = "Error"
            reset()
            return
        }

        tall1 /= tall2
    }

    tall2 = 0
    writingNum2 = false
    desimal = false

    num1 = true
    num2 = false

    add = minus = times = divide = false

    show()
}


// ======================
// RESET
// ======================

function reset() {

    tall1 = 0
    tall2 = 0

    decimalPlaces = 0

    num1 = true
    num2 = false
    writingNum2 = false

    add = false
    minus = false
    times = false
    divide = false

    desimal = false

    show()
}


// ======================
// HELPERS
// ======================

function checkDecimals(value) {

    const numberAsString = value.toString()

    if (numberAsString.includes(".")) {
        return numberAsString.split(".")[1].length
    }

    return 0
}


// ======================
// DISPLAY
// ======================

function show() {

    if (num1) {
        outputElm.textContent = tall1
    }

    else if (add && !writingNum2) {
        outputElm.textContent = tall1 + " + "
    }

    else if (add && writingNum2) {
        outputElm.textContent = tall1 + " + " + tall2
    }

    else if (minus && !writingNum2) {
        outputElm.textContent = tall1 + " - "
    }

    else if (minus && writingNum2) {
        outputElm.textContent = tall1 + " - " + tall2
    }

    else if (times && !writingNum2) {
        outputElm.textContent = tall1 + " * "
    }

    else if (times && writingNum2) {
        outputElm.textContent = tall1 + " * " + tall2
    }

    else if (divide && !writingNum2) {
        outputElm.innerHTML = tall1 + ' <i class="fa-solid fa-divide"></i> '
    }

    else if (divide && writingNum2) {
        outputElm.innerHTML = tall1 + ' <i class="fa-solid fa-divide"></i> ' + tall2
    }
}
