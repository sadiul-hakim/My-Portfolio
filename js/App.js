const nav_link = document.getElementsByClassName("nav-link");

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

