document.getElementById("contactForm").addEventListener("submit", async function (e) {
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

  try {
    const res = await API.submitContact(name, email, message);
    responseBox.style.color = "green";
    responseBox.textContent = res.message || "Thank you! Your message has been sent.";
    document.getElementById("contactForm").reset();
  } catch (err) {
    responseBox.style.color = "red";
    responseBox.textContent = err.message || "Failed to send message. Please try again.";
  }
});
