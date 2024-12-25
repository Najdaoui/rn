// Sélection du bouton de soumission
const submitButton = document.getElementById("saveTaskBtn");

// Sélectionner le modal
const myModal = new bootstrap.Modal(document.getElementById("addTaskModal"));

// Ajout d'un écouteur d'événements pour le clic
submitButton.addEventListener("click", function() {
    // Récupération des valeurs des champs de saisie
    let taskTitle = document.getElementById("taskTitle").value.trim();
    let taskDescription = document.getElementById("taskDescription").value.trim();
    let taskDueDate = document.getElementById("taskDueDate").value.trim();
    let taskPriority = document.getElementById("taskPriority").value;
    let taskStatus = "open";

    // Création d'un objet de tâche
    const task = {
        title: taskTitle,
        description: taskDescription,
        dueDate: taskDueDate,
        priority: taskPriority,
        status: taskStatus
    };

    // Récupérer les tâches existantes depuis localStorage, si elles existent
    let tasks = localStorage.getItem("tasks");
    tasks = tasks ? JSON.parse(tasks) : []; // Si des tâches existent, les analyser, sinon créer un tableau vide

    // Ajouter la nouvelle tâche au tableau des tâches
    tasks.push(task);

    // Enregistrer le tableau de tâches mis à jour dans localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Afficher les tâches dans le tableau
    displayTasks();

    // Fermer le modal après l'ajout de la tâche
    myModal.hide();

    // Réinitialiser le formulaire
    document.querySelector("#addTaskModal form").reset();


});

// Fonction pour afficher les tâches dans les onglets appropriés
function displayTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
    // Sélectionner les onglets
    const allTab = document.querySelector("#all");
    const openTab = document.querySelector("#open");
    const closedTab = document.querySelector("#closed");

    // Fonction pour afficher un tableau de tâches dans un onglet spécifique
    function generateTable(tasksToDisplay) {
        if (tasksToDisplay.length === 0) {
            return `
                <div class="d-flex justify-content-center align-items-center mt-4 flex-column">
                    <img class="Empty" src="Empty-Dashboard.svg" alt="Empty Image">
                    <p class="mt-3 text-muted">You have no tasks</p>
                </div>
            `;
        }

        let tableHTML = `
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Due Date</th>
              <th scope="col">Priority</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
        `;

        tasksToDisplay.forEach((task, index) => {
            let priorityBadge = "";
            switch (task.priority) {
                case "high":
                    priorityBadge = '<span class="badge rounded-pill bg-danger">High</span>';
                    break;
                case "medium":
                    priorityBadge = '<span class="badge rounded-pill bg-warning text-dark">Medium</span>';
                    break;
                case "low":
                    priorityBadge = '<span class="badge rounded-pill bg-primary">Low</span>';
                    break;
                default:
                    priorityBadge = '<span class="badge rounded-pill bg-secondary">Unknown</span>';
            }

            const isChecked = task.status === "closed" ? "checked" : "";
            const checkedClass = task.status === "closed" ? "checked" : "";

            tableHTML += `
            <tr class="${checkedClass}">
              <td class="td-actions"><input class="form-check-input" type="checkbox" value="" id="taskCheck${index}" ${isChecked} onclick="toggleStatus(${index})"></td>
              <td>${task.title}</td>
              <td>${task.description}</td>
              <td>${task.dueDate}</td>
              <td>${priorityBadge}</td>
              <td class="td-actions" style="text-align: right;">
                <button type="button" class="btn btn-danger" onclick="deleteTask(${index})"><i class="fas fa-trash"></i> Delete</button>
              </td>
            </tr>
            `;
        });

        tableHTML += `</tbody></table>`;
        return tableHTML;
    }

    // Filtrer les tâches en fonction de leur statut
    const openTasks = tasks.filter(task => task.status === "open");
    const closedTasks = tasks.filter(task => task.status === "closed");

    // Mettre à jour les badges dans les onglets
    document.querySelector("#open-tab .badge").textContent = openTasks.length;
    document.querySelector("#closed-tab .badge").textContent = closedTasks.length;

    // Afficher les tâches dans les onglets
    allTab.innerHTML = generateTable(tasks);
    openTab.innerHTML = generateTable(openTasks);
    closedTab.innerHTML = generateTable(closedTasks);
}

// Fonction pour basculer le statut entre "open" et "closed"
function toggleStatus(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    const task = tasks[index];
    task.status = task.status === "open" ? "closed" : "open"; // Inverser le statut
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

// Fonction pour supprimer une tâche
function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.splice(index, 1); // Supprimer la tâche
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

// Appeler la fonction pour afficher les tâches lors du chargement de la page
window.onload = displayTasks;