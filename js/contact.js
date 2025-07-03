document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const responseBox = document.getElementById("formResponse");

  if (!name || !email || !message) {
    responseBox.style.color = "red";
    responseBox.textContent = "Please fill in all fields!";
    return;
  }

  responseBox.style.color = "green";
  responseBox.textContent = "Thank you! Your message has been sent.";

  document.getElementById("contactForm").reset();
});
