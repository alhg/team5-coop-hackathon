let textAreaDisplay = document.getElementById('text-display');
let fontSizeInput = document.getElementById('font-size-input');
changeFontSize();

document.getElementById('change-od-reg-btn').onclick = changeFontToOpenDyslexiaRegular;
document.getElementById('change-od-mono-btn').onclick = changeFontToOpenDyslexiaMono;
document.getElementById('change-arial-btn').onclick = changeFontToArial;
document.getElementById('change-comic-sans-btn').onclick = changeFontToComicSans;
document.getElementById('change-helvetica-btn').onclick = changeFontToHelvetica;
document.getElementById('change-verdana-btn').onclick = changeFontToVerdana;
fontSizeInput.oninput = changeFontSize;

function changeFontSize() {
    textAreaDisplay.style.fontSize = fontSizeInput.value + "px";
}

function changeFontToOpenDyslexiaRegular() {
    textAreaDisplay.style.fontFamily = "OpenDylexia-Regular";
}

function changeFontToOpenDyslexiaMono() {
    textAreaDisplay.style.fontFamily = "OpenDylexia-Mono";
}


function changeFontToArial() {
    textAreaDisplay.style.fontFamily = "Arial";
}

function changeFontToComicSans() {
    textAreaDisplay.style.fontFamily = "Comic-Sans";
}

function changeFontToHelvetica() {
    textAreaDisplay.style.fontFamily = "Helvetica";
}

function changeFontToVerdana() {
    textAreaDisplay.style.fontFamily = "Verdana";
}
