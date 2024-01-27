let celsiusInput = document.querySelector('#celcius > input')
let fahrenheitInput = document.querySelector('#fahrenheit > input')
let kelvinInput = document.querySelector('#kelvin > input')

let btn = document.querySelector('.button button')


function roundNumber(number){
    return Math.round(number*100)/100
}


celsiusInput.addEventListener('input', function(){
    const rumusC = document.querySelector(".equationC")
    const rumusF = document.querySelector(".equationF")
    const rumusK = document.querySelector(".equationK")
    let cTemp = parseFloat(celsiusInput.value)
    let fTemp = (cTemp*(9/5)) + 32
    let kTemp = cTemp + 273.15

    fahrenheitInput.value = roundNumber(fTemp)
    kelvinInput.value = roundNumber(kTemp)
    rumusC.innerText = `There's no eq for self`;
    rumusF.innerText = `(Celcius x (9/5) + 32) = (${cTemp} x (9/5) + 32)`;
    rumusK.innerText = `(Celcius + 273.15) = (${cTemp} + 273.15)`;
})


fahrenheitInput.addEventListener('input', function(){
    const rumusC = document.querySelector(".equationC")
    const rumusF = document.querySelector(".equationF")
    const rumusK = document.querySelector(".equationK")
    let fTemp = parseFloat(fahrenheitInput.value)
    let cTemp = (fTemp - 32) * (5/9)
    let kTemp = ((fTemp -32) * (5/9)) + 273.15

    celsiusInput.value = roundNumber(cTemp)
    kelvinInput.value = roundNumber(kTemp)
    rumusC.innerText = `((Fahrenheit - 32) x (5/9)) = ((${fTemp} - 32) x (5/9))`
    rumusF.innerText = `There's no equation for self`;
    rumusK.innerText = `((Fahrenheit - 32) x (5/9)) = ((${fTemp} - 32) x (5/9))`;
})


kelvinInput.addEventListener('input', function(){
    const rumusC = document.querySelector(".equationC")
    const rumusF = document.querySelector(".equationF")
    const rumusK = document.querySelector(".equationK")
    let kTemp = parseFloat(kelvinInput.value)
    let cTemp = kTemp - 273.15
    let fTemp = ((kTemp - 273.15) * (9/5)) + 32

    celsiusInput.value = roundNumber(cTemp)
    fahrenheitInput.value = roundNumber(fTemp)
    rumusC.innerText = `((Kelvin - 273.15) x (9/5)) + 32 = ((${kTemp} - 273.15) x (9/5)) + 32`
    rumusF.innerText = `(Kelvin - 273.15) = (${kTemp} - 273.15)`;
    rumusK.innerText = `There's no equation for self`;
})


btn.addEventListener('click', ()=>{
    const rumusC = document.querySelector(".equationC")
    const rumusF = document.querySelector(".equationF")
    const rumusK = document.querySelector(".equationK")
    celsiusInput.value = ""
    fahrenheitInput.value = ""
    kelvinInput.value = ""

    rumusC.innerText = `Celcius eq`;
    rumusF.innerText = `Fahrenheit eq`;
    rumusK.innerText = `Kelvin eq`;
})