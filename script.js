//background-color: rgb(red, green, blue)
var body = getComputedStyle(document.body)
const darkModeBG = body.getPropertyValue('--dark-mode-background')
const lightModeBG = body.getPropertyValue('--light-mode-background')
const borderColor = body.getPropertyValue('--borderColor')

const changeBTNBorder = body.getPropertyValue('--changeBTN-border')
const changeBTNHover = body.getPropertyValue('--changeBTN-hover')
const changeBTNActive = body.getPropertyValue('--changeBTN-active')
document.body.style.backgroundColor = darkModeBG

var colorField = document.getElementById('colorField')

var rndInt1;
var rndInt2;
var rndInt3;

var rgbValue;
var hexValue;
var luminance;

document.onload = function () {
    generateRandomColor()
    rgbToHex(rgbValue)
    debugOutput()
}

function debugOutput() {
    console.log(rgbValue)
    console.log(hexValue)
    console.log(luminance)
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function generateRandomColor() {
    rndInt1 = getRandomInt(0, 255)
    rndInt2 = getRandomInt(0, 255)
    rndInt3 = getRandomInt(0, 255)

    rgbValue = "rgb(" + rndInt1 + ", " + rndInt2 + ", " + rndInt3 + ")";
    colorField.style.backgroundColor = rgbValue
    document.documentElement.style.setProperty('--rgbColor', rgbValue)

    calculateLuminance(rndInt1, rndInt2, rndInt3);
}

function refreshIconRotation() {
    const rotateIcon = [
        { transform: "rotate(0)" },
        { transform: "rotate(360deg)" },
    ];

    const rotationTiming = {
        duration: 250,
        iterations: 1,
    }

    const icon = document.getElementById('refreshIcon')

    icon.animate(rotateIcon, rotationTiming);
}

function refreshButtonClick() {
    resetUserInput()
    generateRandomColor()
    rgbToHex(rgbValue)
    refreshIconRotation()
    debugOutput()
}


const legalNotice = document.getElementById('legalNotice')
const legalWrapper = document.getElementById('legalWrapper')

function showLegalNotice() {
    const legalNoticeCheckBox = document.getElementById('showLegalNotice')
    if (document.getElementById("showLegalNotice").checked == true) {
        legalNotice.style.display = "flex"
        legalWrapper.style.backdropFilter = "blur(20px)"
        legalWrapper.style.display = "flex"
    }
    else {
        legalNotice.style.display = "none"
        legalWrapper.style.backdropFilter = "blur(0px)"
        legalWrapper.style.display = "none"
    }
}

function closeLegalNotice() {
    legalNotice.style.display = "none"
    legalWrapper.style.backdropFilter = "blur(0px)"
    legalWrapper.style.display = "none"
    document.getElementById("showLegalNotice").checked = false;
}

//Change BTN Appereance from the background
function calculateLuminance(r, g, b) {
    const a = [r, g, b].map((v) => {
        v /= 255
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
    })
    luminance = 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2]
    changeAppearance()
}

//Changes the Refresh Button Appearance correctly on the Luminance of the color
function changeAppearance() {
    if (luminance > 0.5) {
        document.documentElement.style.setProperty('--changeBTN-border', 'black')
        document.documentElement.style.setProperty('--changeBTN-hover', '#00000042')
        document.documentElement.style.setProperty('--changeBTN-active', '#0000005a')
    }
    else {
        document.documentElement.style.setProperty('--changeBTN-border', changeBTNBorder)
        document.documentElement.style.setProperty('--changeBTN-hover', changeBTNHover)
        document.documentElement.style.setProperty('--changeBTN-active', changeBTNActive)
    }
}

//Function to convert RGB-Code to HEX-Code
function rgbToHex(rgb) {
    const [red, green, blue] = rgb.match(/\d+/g);

    const redHex = parseInt(red).toString(16).padStart(2, '0');
    const greenHex = parseInt(green).toString(16).padStart(2, '0');
    const blueHex = parseInt(blue).toString(16).padStart(2, '0');

    hexValue = `#${redHex}${greenHex}${blueHex}`;
}

//Check Users preferred format to use
const selectElementHEX = document.getElementById('colorType')
const inputRGB1 = document.getElementById('inputRGB1')
const inputRGB2 = document.getElementById('inputRGB2')
const inputRGB3 = document.getElementById('inputRGB3')
let userSelectedFormat = "rgb";

selectElementHEX.addEventListener('change', function () {
    userSelectedFormat = selectElementHEX.value;

    if (userSelectedFormat == "rgb") {

        inputRGB2.style.flexGrow = "1"
        inputRGB3.style.flexGrow = "1"

        inputRGB2.style.opacity = "1"
        inputRGB3.style.opacity = "1"

        inputRGB2.style.paddingLeft = "10px"
        inputRGB3.style.paddingLeft = "10px"

        inputRGB2.style.marginRight = "12px"
        inputRGB3.style.marginRight = "12px"

        inputRGB1.style.marginRight = "12px"
        inputRGB2.style.cursor = "text"
        inputRGB3.style.cursor = "text"

        inputRGB1.placeholder = "Red"
        inputRGB2.placeholder = "Green"
        inputRGB3.placeholder = "Blue"
    }
    else if (userSelectedFormat == "hex") {

        inputRGB2.style.flexGrow = "0"
        inputRGB3.style.flexGrow = "0"

        inputRGB2.style.opacity = "0"
        inputRGB3.style.opacity = "0"

        inputRGB2.style.paddingLeft = "0"
        inputRGB3.style.paddingLeft = "0"

        inputRGB2.style.marginRight = "0"
        inputRGB3.style.marginRight = "0"

        inputRGB2.style.cursor = "default"
        inputRGB3.style.cursor = "default"
        inputRGB1.style.marginRight = "0px"

        inputRGB1.placeholder = "Hex Code"
        inputRGB2.placeholder = ""
        inputRGB3.placeholder = ""
    }
    else if (userSelectedFormat == "hsl"){
        inputRGB1.placeholder = "Hue"
        inputRGB2.placeholder = "Saturation"
        inputRGB3.placeholder = "Lightness"
    }
});

//Check Users Input

let userSavedInputHEX;
let userSavedInputRGB;

const submitButton = document.getElementById('submitButton')
submitButton.addEventListener('click', function (event) {
    event.preventDefault();

    let userSavedInputHEX = inputRGB1.value;
    let userSavedInputR = inputRGB1.value;
    let userSavedInputG = inputRGB2.value;
    let userSavedInputB = inputRGB3.value;

    if (userSelectedFormat == "rgb") {
        console.log("User R: ", userSavedInputR)
        console.log("User G: ", userSavedInputG)
        console.log("User B: ", userSavedInputB)
    }

    if (userSelectedFormat == "hex") {
        console.log("User HEX: ", userSavedInputHEX)
    }

    checkAnswer()
})

function resetUserInput() {
    inputRGB1.value = "";
    inputRGB2.value = "";
    inputRGB3.value = "";

    inputRGB1.disabled = false
    inputRGB2.disabled = false
    inputRGB3.disabled = false
    submitButton.disabled = false

    inputRGB1.style.borderColor = "var(--borderColor)"
    inputRGB2.style.borderColor = "var(--borderColor)"
    inputRGB3.style.borderColor = "var(--borderColor)"
}

function rgbEvent(event, target) {
    const value = target.value
    const key = event.key
    const newValue = Number(value + key)
    submitButton.disabled = (value + key).length <= 0

    if (isNaN(newValue)) return event.preventDefault()
    if (newValue > 255) return event.preventDefault()

    console.log(event)
}

const hexRegex = /[0-9a-fA-F]{0,6}/g

inputRGB1.addEventListener('keypress', function (event) {
    if (userSelectedFormat == "rgb") rgbEvent(event, inputRGB1)
    else {
        const newValue = inputRGB1.value.toString() + event.key.toString()
        const result = newValue.match(hexRegex)
        if (result[0] !== newValue || result.length > 2) event.preventDefault()
        else submitButton.disabled = newValue.length <= 0
    }
})
inputRGB2.addEventListener('keypress', function (event) {
    rgbEvent(event, inputRGB2)
})
inputRGB3.addEventListener('keypress', function (event) {
    rgbEvent(event, inputRGB3)
})

//Submit Button
const rightAnswer = body.getPropertyValue('--rightAnswerBorder')
const midRightAnswer = body.getPropertyValue('--kindaWrongAnswerBorder')
const wrongAnswer = body.getPropertyValue('--wrongAnswerBorder')
function checkAnswer() {
    const numR = Number(inputRGB1.value);
    const numG = Number(inputRGB2.value);
    const numB = Number(inputRGB3.value);
    const range = 10;
    
    inputRGB1.disabled = true
    inputRGB2.disabled = true
    inputRGB3.disabled = true
    submitButton.disabled = true

    inputRGB1.value = `${numR} / ${rndInt1}`
    inputRGB2.value = `${numG} / ${rndInt2}`
    inputRGB3.value = `${numB} / ${rndInt3}`
    
    if (numR === rndInt1) inputRGB1.style.borderColor = "var(--rightAnswerBorder)"; 
    else if ((numR - range) <= rndInt1 && rndInt1 <= (numR + range)) inputRGB1.style.borderColor = "var(--kindaWrongAnswerBorder)";
    else inputRGB1.style.borderColor = "var(--wrongAnswerBorder)";

    if (numG === rndInt2) inputRGB2.style.borderColor = "var(--rightAnswerBorder)";
    else if ((numG - range) <= rndInt2 && rndInt2 <= (numG + range)) inputRGB2.style.borderColor = "var(--kindaWrongAnswerBorder)";
    else inputRGB2.style.borderColor = "var(--wrongAnswerBorder)";

    if (numB === rndInt3) inputRGB3.style.borderColor = "var(--rightAnswerBorder)";
    else if ((numB - range) <= rndInt3 && rndInt3 <= (numB + range)) inputRGB3.style.borderColor = "var(--kindaWrongAnswerBorder)";
    else inputRGB3.style.borderColor = "var(--wrongAnswerBorder)";
}