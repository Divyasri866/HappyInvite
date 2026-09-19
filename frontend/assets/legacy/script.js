function exploreSite() {
  alert("Let’s start spreading joy with HappyInvite! 💌");
}

function exploreSite() {
  alert("Let's explore amazing templates! 🚀");
}

function showGreeting() {
  alert("Hello from HappyInvite! 🎉 Enjoy spreading joy 💌");
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

function exploreSite() {
  alert("Let's explore amazing templates! 🚀");
}

function showGreetingEffect() {
  alert("Hello from HappyInvite! 🎉 Enjoy spreading joy 💌");
  for (let i = 0; i < 20; i++) {
    createFlower();
  }
}

function createSparkle(x, y) {
  const sparkle = document.createElement('div');
  sparkle.className = 'sparkle';
  sparkle.style.left = `${x}px`;
  sparkle.style.top = `${y}px`;
  sparkle.style.position = 'absolute';

  const offsetX = (Math.random() - 0.5) * 200;
  const offsetY = (Math.random() - 0.5) * 200;

  sparkle.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(2)`;
  sparkle.style.opacity = '0';
  sparkle.style.transition = 'transform 1s ease-out, opacity 1s ease-out';

  document.body.appendChild(sparkle);

  setTimeout(() => sparkle.remove(), 1000);
}




function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

document.addEventListener('click', (e) => {
  createSparkle(e.clientX, e.clientY);
});

function createFlower() {
  const flower = document.createElement('div');
  flower.className = 'flower';
  flower.textContent = '🌸';
  flower.style.left = `${Math.random() * window.innerWidth}px`;
  flower.style.animationDuration = `${2 + Math.random() * 3}s`; // Random fall speed

  document.body.appendChild(flower);

  setTimeout(() => {
    flower.remove();
  }, 5000); // Remove after falling
}

