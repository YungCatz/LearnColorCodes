//background-color: rgb(red, green, blue)
var body = getComputedStyle(document.body)
const darkModeBG = body.getPropertyValue('--dark-mode-background')
const lightModeBG = body.getPropertyValue('--light-mode-background')
const borderColor = body.getPropertyValue('--borderColor')
document.body.style.backgroundColor = darkModeBG

var colorField = document.getElementById('colorField')

var rndInt1;
var rndInt2;
var rndInt3;

var rgbValue;

document.onload = function () {
    generateRandomColor()
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
    generateRandomColor()
    refreshIconRotation()
}


const legalNotice = document.getElementById('legalNotice')

function showLegalNotice() {
    const legalNoticeCheckBox = document.getElementById('showLegalNotice')
    if (document.getElementById("showLegalNotice").checked == true) {
        legalNotice.style.display = "block"
    }
    else {
        legalNotice.style.display = "none"
    }
}

function closeLegalNotice() {
    legalNotice.style.display = "none"
    document.getElementById("showLegalNotice").checked = false;
}

/*function themeSwitch() {
    if (document.getElementById('themeChanger').checked == true) {
        document.body.style.backgroundColor = darkModeBG  
        document.body.style.color = "white"
        document.documentElement.style.setProperty('--borderColor', 'white')
    }
    else { 
        document.body.style.backgroundColor = lightModeBG 
        document.body.style.color = "black"
        document.documentElement.style.setProperty('--borderColor', 'black')
    }
}*/