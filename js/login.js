document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const status = document.getElementById("loginStatus");

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  
  status.textContent = "";
  status.className = "message";

  if (email === "" || password === "") {
    status.textContent = "All fields are required.";
    status.classList.add("error");
    return;
  }

  if (!emailPattern.test(email)) {
    status.textContent = "Please enter a valid email address.";
    status.classList.add("error");
    return;
  }

  const user = JSON.parse(localStorage.getItem("happyInviteUser"));

  if (!user || email !== user.email || password !== user.password) {
    status.textContent = "Incorrect email or password.";
    status.classList.add("error");
    return;
  }

  status.textContent = "Login successful! Redirecting to home...";
  status.classList.add("success");

  setTimeout(() => {
    window.location.href = "index.html";
  }, 2000);
});
