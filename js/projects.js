const project_list = document.getElementById("project_list");

function populateProjects(data){
    data.forEach(project => {
        const card = document.createElement("div");
        card.className = "project-card";

        card.innerHTML = `
      <div class="project-title">${project.name}</div>
      <div class="project-desc">${project.description}</div>
      <a class="btn" href="${project.url}" target="_blank">View Project</a>
    `;

        project_list.appendChild(card);
    });
}

fetch("./projects.json")
    .then(data => data.json())
    .then(data => {
        populateProjects(data)
    })
    .catch(err => console.log(err));
