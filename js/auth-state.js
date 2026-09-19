document.addEventListener('DOMContentLoaded', () => {
  renderNavbarAuth();
});

function renderNavbarAuth() {
  const user = API.getUser();
  const navUl = document.querySelector('.navbar ul') || document.querySelector('.nav-links');

  if (!navUl) return;

  // Remove old auth li if exists
  const existingAuth = document.getElementById('nav-auth-item');
  if (existingAuth) existingAuth.remove();

  const authLi = document.createElement('li');
  authLi.id = 'nav-auth-item';

  if (user && user.name) {
    authLi.innerHTML = `
      <span style="color:#ff69b4; font-weight:bold; margin-right:8px;">👤 ${user.name}</span>
      <button onclick="API.logout()" style="background:#ff4d4d; color:white; border:none; padding:4px 10px; border-radius:15px; cursor:pointer; font-size:12px;">Logout</button>
    `;
  } else {
    authLi.innerHTML = `<a href="login.html" style="color:#e91e63; font-weight:bold;">🔑 Login</a>`;
  }

  if (navUl.tagName === 'NAV') {
    navUl.appendChild(authLi);
  } else {
    navUl.appendChild(authLi);
  }
}
