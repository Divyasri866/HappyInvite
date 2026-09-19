document.getElementById("loginForm").addEventListener("submit", async function (e) {
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

  try {
    const res = await API.login(email, password);
    status.textContent = "Login successful! Redirecting to home...";
    status.classList.add("success");

    setTimeout(() => {
      window.location.href = "index.html";
    }, 1500);
  } catch (err) {
    status.textContent = err.message || "Incorrect email or password.";
    status.classList.add("error");
  }
});
