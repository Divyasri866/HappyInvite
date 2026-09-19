document.addEventListener("DOMContentLoaded", () => {
  const card = document.getElementById("cardPreview");

  // ✅ Load selected background image from localStorage
  const selectedImg = localStorage.getItem("selectedBgImage") || localStorage.getItem("selectedImage");
  if (selectedImg && card) {
    card.style.backgroundImage = `url(${selectedImg})`;
    card.style.backgroundSize = "cover";
    card.style.backgroundPosition = "center";
    card.style.backgroundRepeat = "no-repeat";
  }

  // ✅ Get input fields
  const nameInput = document.getElementById("nameInput");
  const messageInput = document.getElementById("messageInput");
  const yearInput = document.getElementById("yearInput");
  const textColorPicker = document.getElementById("textColorPicker");

  // ✅ Get preview text elements
  const previewName = document.getElementById("previewName");
  const previewMessage = document.getElementById("previewMessage");
  const previewYear = document.getElementById("previewYear");

  // ✅ Input live update events
  nameInput.addEventListener("input", () => {
    previewName.textContent = nameInput.value || "Dear Friend";
  });

  messageInput.addEventListener("input", () => {
    previewMessage.textContent = messageInput.value || "Wishing you a joyful and prosperous New Year! 🎉";
  });

  yearInput.addEventListener("input", () => {
    previewYear.textContent = yearInput.value || "2026";
  });

  // ✅ Color picker update
  textColorPicker.addEventListener("input", () => {
    const color = textColorPicker.value;
    previewName.style.color = color;
    previewMessage.style.color = color;
    previewYear.style.color = color;
  });

  // ✅ Add drag support to all preview texts
  makeDraggable(previewName);
  makeDraggable(previewMessage);
  makeDraggable(previewYear);

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

  // ✅ Download card as PNG
  document.getElementById("downloadBtn").addEventListener("click", () => {
    html2canvas(card).then(canvas => {
      const link = document.createElement("a");
      link.download = "newyear_card.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  });
});
