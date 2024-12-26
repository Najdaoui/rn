// Sélection de l'élément avec l'id "today"
const todayElement = document.getElementById("today");

// Récupération de la date actuelle
const currentDate = new Date();

// Formatage de la date
const options = { weekday: 'long', day: 'numeric', month: 'long' };
const formattedDate = currentDate.toLocaleDateString('en-GB', options);

// Insertion de la date formatée dans l'élément
if (todayElement) {
  todayElement.textContent = "(" + formattedDate + ")";
}

function translateTasksTitle() {
    // Sélection de l'élément avec l'ID "sectionTitle" dans le conteneur Tasks
    let sectionTitle = document.getElementById("sectionTitle");

    // Vérification si l'élément existe
    if (sectionTitle) {
        // Obtient la hauteur de l'élément
        const height = sectionTitle.offsetHeight;

        // Applique la hauteur comme une variable CSS
        sectionTitle.style.setProperty("--translate-y", `${height}px`);
    }
}

// Appel de la fonction translateTasksTitle
translateTasksTitle();

// Sélection de tous les éléments de navigation
const navBtns = document.querySelectorAll("nav .nav-link");

// Sélection du bouton d'action
let action = document.getElementById("action");
// Sélection du texte de l'action
let actionText = document.getElementById("actionText");
// Sélection de l'attribut data-bs-target de l'élément action
let actionTarget = action.getAttribute("data-bs-target");

// Ajout d'un écouteur d'événements pour chaque élément de navigation
for (let btn of navBtns) {
    btn.addEventListener("click", function(e) {

        // Empêche le comportement par défaut du lien de navigation
        e.preventDefault();

        // Suppression de la classe active de tous les éléments de navigation
        navBtns.forEach(btn => btn.classList.remove("active"));

        this.classList.add("active");

        const contentContainers = document.querySelectorAll(".js-container");

        contentContainers.forEach(container => {
            if (container.id === this.textContent.toLowerCase()) {
                container.classList.remove("d-none");

                actionText.textContent = "Add " + this.textContent;
                action.setAttribute("data-bs-target", "#add" + this.textContent + "Modal");
            } else {
                container.classList.add("d-none");
            }

            translateTasksTitle();
            
        });

    });
}

