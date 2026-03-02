function sjekkSvar(elm, svar) {
    if (svar == true) {
        elm.style.backgroundColor = "green"
    } else {
        elm.style.backgroundColor = "red"
    }
}

function sjekkSvarMedId(id, svar) {
    elm = document.getElementById(id)
    if (svar == true) {
        elm.style.backgroundColor = "green"
    } else {
        elm.style.backgroundColor = "red"
    }
}

function sjekkSvarMedInput(fasit, elm) {
    const inputElm = elm.previousElementSibling
    const svar = inputElm.value
    if (svar == fasit) {
        elm.previousElementSibling.style.backgroundColor = "green"
    } else {
        elm.previousElementSibling.style.backgroundColor = "red"
    }
}

// Funksjon som sjekker om Enter-tasten blir trykket
function handleEnter(event, fasit, inputElm) {
    // Sjekk om tasten er Enter (keyCode 13)
    if (event.keyCode === 13) {
        // Finn knappen som er ved siden av input-feltet
        const button = inputElm.nextElementSibling
        // Kjør sjekkSvarMedInput-funksjonen
        sjekkSvarMedInput(fasit, button)
    }
}
