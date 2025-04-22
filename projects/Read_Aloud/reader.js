const synth = window.speechSynthesis;
const voiceSelect = document.getElementById("voiceSelect");
let voices = [];

function populateVoices() {
    voices = synth.getVoices();
    voiceSelect.innerHTML = '';
    voices.forEach((voice, i) => {
        const option = document.createElement("option");
        option.textContent = `${voice.name} (${voice.lang})`;
        option.value = i;
        voiceSelect.appendChild(option);
    });
}

// On some browsers, voices may not be available immediately
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoices;
}
populateVoices();

function speakText() {
    const text = document.getElementById("text").value;
    if (synth.speaking) {
        synth.cancel(); // stop any previous speech
    }

    const utter = new SpeechSynthesisUtterance(text);
    const selectedVoice = voices[voiceSelect.value];
    if (selectedVoice) {
        utter.voice = selectedVoice;
    }
    synth.speak(utter);
}

function stopSpeaking() {
    synth.cancel();
}
