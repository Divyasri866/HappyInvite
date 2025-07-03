document.addEventListener("DOMContentLoaded", () => {
  const nameInput = document.getElementById("nameInput");
  const dateInput = document.getElementById("dateInput");
  const messageInput = document.getElementById("messageInput");
  const previewName = document.getElementById("previewName");
  const previewDate = document.getElementById("previewDate");
  const previewMessage = document.getElementById("previewMessage");

  const templateSelect = document.getElementById("templateSelect");
  const cardPreview = document.getElementById("cardPreview");

  const draggableTexts = document.querySelectorAll(".draggable-text");

  // Text input updates
  nameInput.addEventListener("input", () => {
    previewName.textContent = nameInput.value || "Rohan & Aisha";
  });

  dateInput.addEventListener("input", () => {
    previewDate.textContent = dateInput.value || "July 5, 2025";
  });

  messageInput.addEventListener("input", () => {
    previewMessage.textContent = messageInput.value || "Join us on our special day! 💐";
  });

  // Apply theme style
  function applyTheme(template) {
    if (template === "1") {
      cardPreview.style.backgroundImage = "url('../assets/images/wedding1.png')";
      previewName.style.fontFamily = "Georgia, serif";
      previewName.style.color = "#5a2a00";
      previewDate.style.color = "#7b3f00";
      previewMessage.style.color = "#995c00";
    } else if (template === "2") {
      cardPreview.style.backgroundImage = "url('../assets/images/wedding1.png')";
      previewName.style.fontFamily = "'Courier New', monospace";
      previewName.style.color = "#333";
      previewDate.style.color = "#555";
      previewMessage.style.color = "#777";
    } else if (template === "3") {
      cardPreview.style.backgroundImage = "url('../assets/images/wedding1.png')";
      previewName.style.fontFamily = "'Brush Script MT', cursive";
      previewName.style.color = "#800000";
      previewDate.style.color = "#a52a2a";
      previewMessage.style.color = "#b22222";
    }
  }

  

  // Handle URL params
  const params = new URLSearchParams(window.location.search);
  const template = params.get("template") || "1";
  const bg = params.get("bg");
  const title = params.get("title");

  if (bg) {
    cardPreview.style.backgroundImage = `url(../assets/images/${bg})`;
  }

  if (title) {
    document.title = `${title} - HappyInvite`;
  }

  applyTheme(template);
  templateSelect.value = template;

  templateSelect.addEventListener("change", () => {
    const selected = templateSelect.value;
    window.location.href = `wedding-editor.html?template=${selected}&bg=wedding${selected}.jpg&title=Theme`;
  });

  // Make draggable
  draggableTexts.forEach(el => {
    el.addEventListener("pointerdown", (e) => {
      e.preventDefault();

      const parent = el.offsetParent;
      const parentRect = parent.getBoundingClientRect();
      const shiftX = e.clientX - el.getBoundingClientRect().left;
      const shiftY = e.clientY - el.getBoundingClientRect().top;

      function moveAt(pageX, pageY) {
        const newLeft = pageX - parentRect.left - shiftX;
        const newTop = pageY - parentRect.top - shiftY;
        el.style.left = `${newLeft}px`;
        el.style.top = `${newTop}px`;
      }

      function onPointerMove(e) {
        moveAt(e.clientX, e.clientY);
      }

      document.addEventListener("pointermove", onPointerMove);

      document.addEventListener("pointerup", function stopMove() {
        document.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("pointerup", stopMove);
      }, { once: true });
    });

    el.addEventListener("dragstart", () => false);
  });

  // Download
  document.getElementById("downloadBtn").addEventListener("click", () => {
    html2canvas(cardPreview).then(canvas => {
      const link = document.createElement("a");
      link.download = "wedding-card.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const selectedImg = localStorage.getItem("selectedBgImage");
  const card = document.getElementById("cardPreview"); // make sure your card has this ID
  if (selectedImg && card) {
    card.style.backgroundImage = `url(${selectedImg})`;
    card.style.backgroundSize = "cover";
    card.style.backgroundPosition = "center";
    card.style.backgroundRepeat = "no-repeat";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const colorPicker = document.getElementById("textColorPicker");

  const textElements = [
    document.getElementById("previewName"),
    document.getElementById("previewDate"),
    document.getElementById("previewMessage")
  ];

  colorPicker.addEventListener("input", function () {
    const selectedColor = colorPicker.value;
    textElements.forEach(el => {
      el.style.color = selectedColor;
    });
  });
});

