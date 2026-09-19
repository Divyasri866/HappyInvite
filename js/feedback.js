document.getElementById("feedbackForm").addEventListener("submit", async function (e) {
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

  try {
    const res = await API.submitFeedback(name, rating, comments);
    feedbackResponse.style.color = "green";
    feedbackResponse.textContent = res.message || "Thanks for your feedback! 💖";
    document.getElementById("feedbackForm").reset();
  } catch (err) {
    feedbackResponse.style.color = "red";
    feedbackResponse.textContent = err.message || "Failed to submit feedback. Please try again.";
  }
});
