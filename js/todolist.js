document.addEventListener("DOMContentLoaded", () => {
  loadTemplates();
});

async function loadTemplates() {
  const todoListContainer = document.getElementById("todoList");
  if (!todoListContainer) return;

  todoListContainer.innerHTML = "<p>Loading your templates...</p>";

  const token = API.getToken();
  const sortOption = document.getElementById("sortOption")?.value || "time";

  if (token) {
    try {
      const res = await API.getSavedTemplates(sortOption);
      renderTemplateCards(res.data || []);
    } catch (err) {
      console.warn("API loadTemplates error, falling back to local:", err.message);
      loadLocalTemplates();
    }
  } else {
    loadLocalTemplates();
  }
}

function loadLocalTemplates() {
  const todoListContainer = document.getElementById("todoList");
  todoListContainer.innerHTML = "";

  let savedTemplates = JSON.parse(localStorage.getItem("todoTemplates")) || [];
  const sortOption = document.getElementById("sortOption")?.value || "time";

  if (sortOption === "title") {
    savedTemplates.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    savedTemplates.sort((a, b) => new Date(b.time || b.createdAt) - new Date(a.time || a.createdAt));
  }

  renderTemplateCards(savedTemplates, true);
}

function renderTemplateCards(templates, isLocal = false) {
  const todoListContainer = document.getElementById("todoList");
  todoListContainer.innerHTML = "";

  if (templates.length === 0) {
    todoListContainer.innerHTML = "<p style='color:#777;'>No saved templates yet. Explore templates and save your favorites!</p>";
    return;
  }

  templates.forEach((template, index) => {
    const card = document.createElement("div");
    card.classList.add("todo-card");

    const timeVal = template.time || template.createdAt || new Date().toISOString();
    const timeText = new Date(timeVal).toLocaleString();
    const category = template.category ? `<p class="category">📂 ${template.category}</p>` : "";
    const idVal = template._id || template.id || index;

    card.innerHTML = `
      ${template.img ? `<img src="${template.img}" alt="${template.title}" class="template-img" style="max-width:100%; border-radius:8px; margin-bottom:8px;" />` : ""}
      <h3>${template.title}</h3>
      ${category}
      <p class="time-stamp">⏰ Added: ${timeText}</p>
      <div class="btns">
        <button class="delete-btn" onclick="deleteTemplate('${idVal}', ${isLocal}, ${index})">Delete</button>
      </div>
    `;

    todoListContainer.appendChild(card);
  });
}

async function addTemplate() {
  const title = document.getElementById("templateTitle").value.trim();
  const category = document.getElementById("templateCategory").value.trim();

  if (!title) {
    alert("Please enter a template title.");
    return;
  }

  const token = API.getToken();

  if (token) {
    try {
      await API.addSavedTemplate(title, category);
      document.getElementById("templateTitle").value = "";
      document.getElementById("templateCategory").value = "";
      loadTemplates();
      alert("✅ Template saved successfully!");
    } catch (err) {
      alert("⚠️ " + (err.message || "Failed to save template."));
    }
  } else {
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
}

async function deleteTemplate(id, isLocal = false, index = 0) {
  const token = API.getToken();

  if (token && !isLocal) {
    try {
      await API.deleteSavedTemplate(id);
      loadTemplates();
    } catch (err) {
      alert("⚠️ Failed to delete template.");
    }
  } else {
    const templates = JSON.parse(localStorage.getItem("todoTemplates")) || [];
    templates.splice(index, 1);
    localStorage.setItem("todoTemplates", JSON.stringify(templates));
    loadTemplates();
  }
}

async function clearAllTemplates() {
  if (confirm("Are you sure you want to delete all templates?")) {
    const token = API.getToken();
    if (token) {
      try {
        await API.clearSavedTemplates();
        loadTemplates();
      } catch (err) {
        alert("⚠️ Failed to clear templates.");
      }
    } else {
      localStorage.removeItem("todoTemplates");
      loadTemplates();
    }
  }
}