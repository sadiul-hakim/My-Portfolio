const nav_link = document.getElementsByClassName("nav-link");
const experience = document.getElementById("experienceYear");

let arr = [...nav_link];

for (let i = 0; i < arr.length; i++) {

    arr[i].addEventListener("click", (e) => {

        for (let l of arr) {
            l.classList.remove("active")
        }

        if (!arr[i].classList.contains("active")) {
            arr[i].classList.add("active");
        }
    })

}

setExperience();

function setExperience(){
	let startDate = new Date("2023-03-08");
	let today = new Date();

    let years = today.getFullYear() - startDate.getFullYear();
    experience.innerText = `Experience: ${years} ${years > 1 ? "Years" : "Year"}`
}