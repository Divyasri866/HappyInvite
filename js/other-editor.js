document.addEventListener("DOMContentLoaded", () => {
  const card = document.getElementById("cardPreview");

  // ✅ Load selected background image from explore page
  const selectedImg = localStorage.getItem("selectedBgImage") || localStorage.getItem("selectedImage");
  if (selectedImg && card) {
    card.style.backgroundImage = `url(${selectedImg})`;
    card.style.backgroundSize = "cover";
    card.style.backgroundPosition = "center";
    card.style.backgroundRepeat = "no-repeat";
  }

  const nameInput = document.getElementById("nameInput");
  const dateInput = document.getElementById("dateInput");
  const messageInput = document.getElementById("messageInput");
  const textColorPicker = document.getElementById("textColorPicker");

  const previewName = document.getElementById("previewName");
  const previewDate = document.getElementById("previewDate");
  const previewMessage = document.getElementById("previewMessage");

  // ✅ Live update events
  nameInput.addEventListener("input", () => {
    previewName.textContent = nameInput.value || "Dear Friend";
  });

  dateInput.addEventListener("input", () => {
    previewDate.textContent = dateInput.value || "Graduation Day";
  });

  messageInput.addEventListener("input", () => {
    previewMessage.textContent = messageInput.value || "Best wishes for your success! 🎉";
  });

  textColorPicker.addEventListener("input", () => {
    const color = textColorPicker.value;
    previewName.style.color = color;
    previewDate.style.color = color;
    previewMessage.style.color = color;
  });

  // ✅ Drag functionality
  makeDraggable(previewName);
  makeDraggable(previewDate);
  makeDraggable(previewMessage);

  function makeDraggable(element) {
    let isDragging = false;
    let offsetX, offsetY;

    element.addEventListener("mousedown", (e) => {
      isDragging = true;
      offsetX = e.clientX - element.offsetLeft;
      offsetY = e.clientY - element.offsetTop;
      element.style.cursor = "grabbing";
    });

    document.addEventListener("mousemove", (e) => {
      if (isDragging) {
        element.style.left = `${e.clientX - offsetX}px`;
        element.style.top = `${e.clientY - offsetY}px`;
      }
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;
      element.style.cursor = "grab";
    });
  }

  // ✅ Download as image
  document.getElementById("downloadBtn").addEventListener("click", () => {
    html2canvas(card).then(canvas => {
      const link = document.createElement("a");
      link.download = "other_card.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  });
});
