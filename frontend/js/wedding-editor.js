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
  if (nameInput && previewName) {
    nameInput.addEventListener("input", () => {
      previewName.textContent = nameInput.value || "Rohan & Aisha";
    });
  }

  if (dateInput && previewDate) {
    dateInput.addEventListener("input", () => {
      previewDate.textContent = dateInput.value || "July 5, 2025";
    });
  }

  if (messageInput && previewMessage) {
    messageInput.addEventListener("input", () => {
      previewMessage.textContent = messageInput.value || "Join us on our special day! 💐";
    });
  }

  // Apply theme style
  function applyTheme(template) {
    if (!cardPreview) return;
    if (template === "1") {
      cardPreview.style.backgroundImage = "url('../assets/images/wedding1.png')";
      if (previewName) {
        previewName.style.fontFamily = "Georgia, serif";
        previewName.style.color = "#5a2a00";
      }
      if (previewDate) previewDate.style.color = "#7b3f00";
      if (previewMessage) previewMessage.style.color = "#995c00";
    } else if (template === "2") {
      cardPreview.style.backgroundImage = "url('../assets/images/wedding2.png')";
      if (previewName) {
        previewName.style.fontFamily = "'Courier New', monospace";
        previewName.style.color = "#333";
      }
      if (previewDate) previewDate.style.color = "#555";
      if (previewMessage) previewMessage.style.color = "#777";
    } else if (template === "3") {
      cardPreview.style.backgroundImage = "url('../assets/images/wedding3.png')";
      if (previewName) {
        previewName.style.fontFamily = "'Brush Script MT', cursive";
        previewName.style.color = "#800000";
      }
      if (previewDate) previewDate.style.color = "#a52a2a";
      if (previewMessage) previewMessage.style.color = "#b22222";
    }
  }

  // Handle URL params
  const params = new URLSearchParams(window.location.search);
  const template = params.get("template") || "1";
  const bg = params.get("bg");
  const title = params.get("title");

  if (bg && cardPreview) {
    cardPreview.style.backgroundImage = `url(../assets/images/${bg})`;
  }

  if (title) {
    document.title = `${title} - HappyInvite`;
  }

  applyTheme(template);
  if (templateSelect) {
    templateSelect.value = template;

    templateSelect.addEventListener("change", () => {
      const selected = templateSelect.value;
      window.location.href = `wedding-editor.html?template=${selected}&bg=wedding${selected}.png&title=Theme`;
    });
  }

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
  document.getElementById("downloadBtn")?.addEventListener("click", () => {
    if (typeof html2canvas !== 'undefined' && cardPreview) {
      html2canvas(cardPreview).then(canvas => {
        const link = document.createElement("a");
        link.download = "wedding-card.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      });
    }
  });

  const selectedImg = localStorage.getItem("selectedBgImage");
  if (selectedImg && cardPreview) {
    cardPreview.style.backgroundImage = `url(${selectedImg})`;
    cardPreview.style.backgroundSize = "cover";
    cardPreview.style.backgroundPosition = "center";
    cardPreview.style.backgroundRepeat = "no-repeat";
  }

  const colorPicker = document.getElementById("textColorPicker");
  if (colorPicker) {
    colorPicker.addEventListener("input", function () {
      const selectedColor = colorPicker.value;
      [previewName, previewDate, previewMessage].forEach(el => {
        if (el) el.style.color = selectedColor;
      });
    });
  }
});
