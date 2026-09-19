document.getElementById("registerForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const status = document.getElementById("registerStatus");

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Clear previous message
  status.textContent = "";
  status.className = "message";

  // Validation
  if (name === "" || email === "" || password === "") {
    status.textContent = "All fields are required.";
    status.classList.add("error");
    return;
  }

  if (!emailPattern.test(email)) {
    status.textContent = "Please enter a valid email address.";
    status.classList.add("error");
    return;
  }

  if (password.length < 6) {
    status.textContent = "Password must be at least 6 characters long.";
    status.classList.add("error");
    return;
  }

  try {
    const res = await API.register(name, email, password);
    status.textContent = "Registration successful! Redirecting to home...";
    status.classList.add("success");

    setTimeout(() => {
      window.location.href = "index.html";
    }, 1500);
  } catch (err) {
    status.textContent = err.message || "Registration failed. Please try again.";
    status.classList.add("error");
  }
});
