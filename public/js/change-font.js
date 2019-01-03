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
    document.getElementById('dropDownFont').innerHTML = "OpenDyslexia Regular";
    fontStr = "OpenDyslexic";
}

function changeFontToOpenDyslexiaMono() {
    textAreaDisplay.style.fontFamily = "OpenDylexia-Mono";
    document.getElementById('dropDownFont').innerHTML = "OpenDyslexia Monospace";
    fontStr = "OpenDyslexicMono";
}


function changeFontToArial() {
    textAreaDisplay.style.fontFamily = "Arial";
    document.getElementById('dropDownFont').innerHTML = "Arial";
    fontStr = "Ari";
}

function changeFontToComicSans() {
    textAreaDisplay.style.fontFamily = "Comic-Sans";
    document.getElementById('dropDownFont').innerHTML = "Comic-Sans";
    fontStr = "ComicSans";
}

function changeFontToHelvetica() {
    textAreaDisplay.style.fontFamily = "Helvetica";
    document.getElementById('dropDownFont').innerHTML = "Helvetica";
    fontStr = "Hel";
}

function changeFontToVerdana() {
    textAreaDisplay.style.fontFamily = "Verdana";
    document.getElementById('dropDownFont').innerHTML = "Verdana";
    fontStr = "Ver";
}
