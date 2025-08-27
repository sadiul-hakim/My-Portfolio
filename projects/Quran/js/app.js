const surah_num = document.getElementById("surah_num");
const ayah_num = document.getElementById("ayah_num");
const load__btn = document.getElementById("load__btn");
const next_num = document.getElementById("next__btn");
let ayat__list = document.getElementById("ayat__list");
const title__eng = document.getElementById("title__eng");
const title__arb = document.getElementById("title__arb");
const surah_info = document.getElementById("surah_info");
const language = document.getElementById("language");
const surahNames = document.querySelectorAll('#surah_list > li');

let surahNumber = surah_num.value;
let ayahNumber = ayah_num.value;
window.onload = async () => {
    await loadAndShow(surahNumber, ayahNumber);
}

load__btn.onclick = async (e) => {
    let surahNumber = surah_num.value;
    let ayahNumber = ayah_num.value;

    if (surahNumber === "" || surahNumber <= 0 || surahNumber > 114) {
        alert("Invalid Surah Number! please input from 1 to 114.")
        return
    }

    await loadAndShow(surahNumber, ayahNumber);
}

next_num.onclick = async () => {

    surahNumber = surah_num.value;
    ayahNumber = ayah_num.value;

    if (surahNumber === 114) {
        surahNumber = 0;
    }
    surah_num.value = ++surahNumber;
    await loadAndShow(surahNumber, ayahNumber);
}

async function loadAndShow(surahNumber, ayahNumber) {

    let lang = language.value;
    let data = await loadSurah(lang, surahNumber, ayahNumber);
    title__eng.innerText = data.englishName + " (" + data.englishNameTranslation + ")";
    title__arb.innerText = data.name;
    surah_info.innerText = data.numberOfAyahs + " Ayahs, " + "Revelation Type " + data.revelationType
    showAyat(data, lang);
}

async function loadSurah(lang, surahNumber, ayahNumber) {

    let data;
    let url = getUrl(lang, surahNumber, ayahNumber);
    let engResponse = await fetch(url);
    data = await engResponse.json();

    return data.data;
}

function showAyat(data, lang) {

    ayat__list.innerHTML = "";
    let ayahs = data.ayahs;

    if (ayahs === undefined) {
        title__eng.innerText = data.surah.englishName;
        title__arb.innerText = data.surah.name;

        let tag = createLiTag("li", "ayah", data.text, data.number);
        ayat__list.append(tag);
        return;
    }


    for (let i = 0; i < ayahs.length; i++) {
        let ayah = ayahs[i];
        let tag = createLiTag("li", "ayah", ayah.text, ayah.number);

        if (lang === "arb") {
            let audioTag = createTag("audio", "");
            audioTag.controls = true;
            audioTag.classList.add("audio");

            let sourceTag = createTag("source", "");
            sourceTag.src = ayah.audio;
            sourceTag.type = "audio/mp3";

            audioTag.append(sourceTag);
            tag.append(audioTag);
        }

        ayat__list.append(tag);
    }
}

function getUrl(language, surahNumber, ayahNumber) {
    let url;
    if (ayahNumber > 1) {
        url = `https://api.alquran.cloud/v1/ayah/${surahNumber}:${ayahNumber}/en.asad`;
    } else {
        if (language === "eng") {
            url = `https://api.alquran.cloud/v1/surah/${surahNumber}/en.asad`;
        } else {
            url = `https://api.alquran.cloud/v1/surah/${surahNumber}/ar.alafasy`;
        }
    }

    return url;
}

function createLiTag(name, className, content, number) {
    let liTag = createTag(name, className);
    liTag.innerText = `${number}. ${content}`;
    return liTag;
}

function createTag(name, className) {
    let tag = document.createElement(name);

    if (className.length !== 0) {
        tag.classList.add(className)
    }
    return tag;
}

//----------------------------------------------------------------------------//

for (let i = 0; i < surahNames.length; i++) {
    surahNames[i].onclick = async function (e) {
        let num = surahNames[i].dataset.id;
        await loadAndShow(num);
        surah_num.value = num;
    }
}