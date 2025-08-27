const num = document.getElementById("num");
const generate = document.getElementById("generate");
const root = document.getElementById("root");
const toast = document.getElementById("toast");

generate.onclick = () => {
    let numberOfColors = Number(num.value);

    if (numberOfColors > 5000) {
        alert("Number of colors is getting bigger!")
    }

    if (numberOfColors > 100000) {
        alert("Can not load such a big number of colors!")
        return;
    }

    const existingHexCodes = new Set();

    for (let i = 0; i < numberOfColors; i++) {  // Generate 10 unique hex codes
        const newHexCode = generateUniqueHexCode(existingHexCodes);
        existingHexCodes.add(newHexCode);
    }

    root.innerText = "";
    existingHexCodes.forEach((value) => {
        let div = generateElement("div", value, "colorCard");
        div.addEventListener('click', (e) => copyText(e, div));
        root.append(div);
    })

}

function generateElement(tagName, color, className) {
    let tag = document.createElement(tagName);
    tag.style.background = "#" + color;
    tag.innerText = "#" + color;
    tag.classList.add(className);
    return tag;
}

function generateUniqueHexCode(existingHexCodes) {
    const allChars = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

    while (true) {
        // Shuffle the characters to create randomness
        allChars.sort(() => Math.random() - 0.5);

        // Take the first 6 characters to form a hex code
        const hexCode = allChars.slice(0, 6).join('');

        // Check if the generated hex code is unique
        if (!existingHexCodes.has(hexCode)) {
            return hexCode;
        }
    }
}

function copyText(e, div) {

    // copy to clipboard
    navigator.clipboard.writeText(div.innerText).then(() => {
        showToast("Copied: " + div.innerText);
    }).catch(err => {
        console.error("Failed to copy text: ", err);
    });
}

function showToast(message) {
    toast.textContent = message;
    toast.className = "show";
    setTimeout(() => {
        toast.className = toast.className.replace("show", "");
    }, 2000); // hides after 2 seconds
}