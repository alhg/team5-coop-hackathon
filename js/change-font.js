let textarea = document.getElementById('text-display');

document.getElementById('change-od-reg-btn').onclick = changeFontToOpenDyslexiaRegular;
document.getElementById('change-od-mono-btn').onclick = changeFontToOpenDyslexiaMono;

function changeFontToOpenDyslexiaRegular() {
    textarea.style.fontFamily = "OpenDylexia-Regular";
}

function changeFontToOpenDyslexiaMono() {
    textarea.style.fontFamily = "OpenDylexia-Mono";
}