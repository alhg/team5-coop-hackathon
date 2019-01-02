let textarea = document.getElementById('text-display');

document.getElementById('change-od-reg-btn').onclick = changeFontToOpenDyslexiaRegular;
document.getElementById('change-od-mono-btn').onclick = changeFontToOpenDyslexiaMono;
document.getElementById('change-arial-btn').onclick = changeFontToArial;
document.getElementById('change-comic-sans-btn').onclick = changeFontToComicSans;
document.getElementById('change-helvetica-btn').onclick = changeFontToHelvetica;
document.getElementById('change-verdana-btn').onclick = changeFontToVerdana;


function changeFontToOpenDyslexiaRegular() {
    textarea.style.fontFamily = "OpenDylexia-Regular";
}

function changeFontToOpenDyslexiaMono() {
    textarea.style.fontFamily = "OpenDylexia-Mono";
}

function changeFontToArial() {
    textarea.style.fontFamily = "Arial";
}

function changeFontToComicSans() {
    textarea.style.fontFamily = "Comic-Sans";
}

function changeFontToHelvetica() {
    textarea.style.fontFamily = "Helvetica";
}

function changeFontToVerdana() {
    textarea.style.fontFamily = "Verdana";
}
