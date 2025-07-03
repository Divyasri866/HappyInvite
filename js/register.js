document.getElementById("registerForm").addEventListener("submit", function (e) {
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

  // Save to localStorage
  const user = {
    name,
    email,
    password
  };

  localStorage.setItem("happyInviteUser", JSON.stringify(user));

  status.textContent = "Registration successful! Redirecting to login...";
  status.classList.add("success");

  setTimeout(() => {
    window.location.href = "login.html";
  }, 2000);
});
