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

// Sélection de l'élément avec l'ID "sectionTitle"
const sectionTitle = document.getElementById("sectionTitle");

// Vérification si l'élément existe
if (sectionTitle) {
    // Obtient la hauteur de l'élément
    const height = sectionTitle.offsetHeight;

    // Applique la hauteur comme une variable CSS
    sectionTitle.style.setProperty("--translate-y", `${height}px`);
}
