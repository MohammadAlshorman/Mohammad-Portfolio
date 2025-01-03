let projectBox = document.getElementById('projectBox');

let langColor = {
    "HTML": "text-white bg-danger",
    "CSS": "text-white bg-primary",
    "Javascript": "text-black bg-warning",
    "Android": "text-white bg-success",
    "API": "text-white bg-secondary",
    "Bootstrap": "text-white bg-primary",
    "Firebase": "text-black bg-warning",
    "JAVA": "text-white bg-secondary",
    "React Js": "text-black bg-info",
}

function showProjects() {
    fetch('https://raw.githubusercontent.com/imhardikdesai/JSON-Data/main/Hardik-Desai-Portfolio/project.json')
        .then(response => response.json())
        .then(data => {
            let str = "";
            let projects = data.projects;

            for (key in projects) {

                function returnBadgeHTML() {  // for showing language badge in every project
                    let htm = "";

                    let Language = projects[key].badge;
                    for (index in Language) {
                        htm += `<span class="langBadge badge rounded-pill ${langColor[Language[index]]}">${Language[index]}</span>`;
                    }
                    return htm;
                }

                str += ` 
                            <div class="col-sm-6 col-lg-4 item">
                                <img class="imgThumbnail img-fluid rounded-0 border" data-bss-hover-animate="pulse"
                                    src="${projects[key].imgurl}">
                                <h3 class="name">${projects[key].title}</h3>
                                <p class="description">${projects[key].description}</p>
                                ${returnBadgeHTML()}
                                <br>
                               
                            </div>
                        `;
            }
            projectBox.innerHTML = str;

        })
        .catch(err => console.error(err));
}
showProjects();
