document.addEventListener("DOMContentLoaded", () => {
  loadTemplates();
});


function loadTemplates() {
  const todoListContainer = document.getElementById("todoList");
  todoListContainer.innerHTML = "";

  let savedTemplates = JSON.parse(localStorage.getItem("todoTemplates")) || [];

  const sortOption = document.getElementById("sortOption")?.value || "time";
  if (sortOption === "title") {
    savedTemplates.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    savedTemplates.sort((a, b) => new Date(b.time) - new Date(a.time));
  }

  savedTemplates.forEach((template, index) => {
    const card = document.createElement("div");
    card.classList.add("todo-card");

    const timeText = new Date(template.time).toLocaleString();
    const category = template.category ? `<p class="category">📂 ${template.category}</p>` : "";

    card.innerHTML = `
      <h3>${template.title}</h3>
      ${category}
      <p class="time-stamp">⏰ Added: ${timeText}</p>
      <div class="btns">
        <button class="delete-btn" onclick="deleteTemplate(${index})">Delete</button>
      </div>
    `;

    todoListContainer.appendChild(card);
  });
}


function addTemplate() {
  const title = document.getElementById("templateTitle").value.trim();
  const category = document.getElementById("templateCategory").value.trim();

  if (!title) {
    alert("Please enter a template title.");
    return;
  }

  const templates = JSON.parse(localStorage.getItem("todoTemplates")) || [];


  const exists = templates.some(t => t.title.toLowerCase() === title.toLowerCase());
  if (exists) {
    alert("⚠️ This template already exists!");
    return;
  }

  const newTemplate = {
    title,
    category,
    time: new Date().toISOString()
  };

  templates.push(newTemplate);
  localStorage.setItem("todoTemplates", JSON.stringify(templates));

  document.getElementById("templateTitle").value = "";
  document.getElementById("templateCategory").value = "";
  loadTemplates();
}


function deleteTemplate(index) {
  const templates = JSON.parse(localStorage.getItem("todoTemplates")) || [];
  templates.splice(index, 1);
  localStorage.setItem("todoTemplates", JSON.stringify(templates));
  loadTemplates();
}


function clearAllTemplates() {
  if (confirm("Are you sure you want to delete all templates?")) {
    localStorage.removeItem("todoTemplates");
    loadTemplates();
  }
}

card.innerHTML = `
  ${template.img ? `<img src="${template.img}" alt="${template.title}" class="template-img" />` : ""}
  <h3>${template.title}</h3>
  ${category}
  <p class="time-stamp">⏰ Added: ${timeText}</p>
  <div class="btns">
    <button class="delete-btn" onclick="deleteTemplate(${index})">Delete</button>
  </div>
`;