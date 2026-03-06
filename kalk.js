let tall1 = 0
let tall2 = 0

let num1 = true
let num2 = false
let add = false
let minus = false
let times = false
let divide = false
let point = false


const outputElm = document.querySelector(".output p")

function addNumber(num){
    if (num1){
        tall1 *= 10
        tall1 += num
        outputElm.textContent = tall1
    }
    if (num2){
        tall2 *= 10
        tall2 += num
        outputElm.textContent = tall2
    }
    
}

function del(){
    if (num1){
        tall1 = Math.floor(tall1/10)
        outputElm.textContent = tall1
    }
    if (num2){
        tall2 = Math.floor(tall2/10)
        outputElm.textContent = tall2
    }
    
}

function plus(){
    add = true
    minus = false
    times = false
    divide = false

    if (num2){
        tall1 += tall2
        outputElm.textContent = tall1
    }
    if (num1){
        num1 = false
        num2 = true
    }
}

function subtract(){
    add = false
    minus = true
    times = false
    divide = false

    if (num2){
        tall1 -= tall2
        outputElm.textContent = tall1
    }
    if (num1){
        num1 = false
        num2 = true
    }
}

function multiply(){
    add = false
    minus = false
    times = true
    divide = false

    if (num2){
        tall1 *= tall2
        outputElm.textContent = tall1
    }
    if (num1){
        num1 = false
        num2 = true
    }
}

function qoutient(){
    add = false
    minus = false
    times = false
    divide = true

    if (num2){
        tall1 /= tall2
        outputElm.textContent = tall1
    }
    if (num1){
        num1 = false
        num2 = true
    }
}

function equal(){
    if (add){
        tall1 += tall2
        outputElm.textContent = tall1
    }
    if (minus){
        tall1 -= tall2
        outputElm.textContent = tall1
    }
    if (times){
        tall1 *= tall2
        outputElm.textContent = tall1
    }
    if (divide){
        tall1 /= tall2
        outputElm.textContent = tall1
    }
}

function reset(){
    tall1 = 0
    tall2 = 0
    num1 = true
    num2 = false
    add = false
    minus = false
    times = false
    divide = false
    outputElm.textContent = tall1
}
