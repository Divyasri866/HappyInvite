document.getElementById("feedbackForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const rating = document.getElementById("rating").value;
  const comments = document.getElementById("comments").value.trim();
  const feedbackResponse = document.getElementById("feedbackResponse");

  if (!name || !rating) {
    feedbackResponse.style.color = "red";
    feedbackResponse.textContent = "Please fill in your name and select a rating.";
    return;
  }

  
  feedbackResponse.style.color = "green";
  feedbackResponse.textContent = "Thanks for your feedback! 💖";


  document.getElementById("feedbackForm").reset();
});
