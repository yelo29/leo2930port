/* =========================================================
   Barangay Info & Feedback - script.js
   - Save feedback to localStorage
   - Display feedback entries
   - Delete feedback entries
   ========================================================= */

const form = document.getElementById("feedbackForm");
const entriesUl = document.getElementById("feedbackEntries");
const STORAGE_KEY = "barangayFeedbacks";

// Load existing feedbacks
let feedbacks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
renderFeedbacks();

// Handle form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim() || "Anonymous";
  const message = document.getElementById("message").value.trim();

  if (!message) return;

  const entry = {
    id: Date.now(),
    name,
    message,
    date: new Date().toLocaleString()
  };

  feedbacks.push(entry);
  saveFeedbacks();
  renderFeedbacks();

  form.reset();
});

// Save to localStorage
function saveFeedbacks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbacks));
}

// Delete feedback
function deleteFeedback(id) {
  feedbacks = feedbacks.filter(f => f.id !== id);
  saveFeedbacks();
  renderFeedbacks();
}

// Render feedbacks
function renderFeedbacks() {
  entriesUl.innerHTML = "";

  if (feedbacks.length === 0) {
    entriesUl.innerHTML = "<li>No feedback yet.</li>";
    return;
  }

  feedbacks.slice().reverse().forEach((f) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <div>
        <strong>${f.name}</strong> <span style="font-size:0.8rem;color:#666">(${f.date})</span>
        <p>${f.message}</p>
      </div>
      <button class="delete-btn" onclick="deleteFeedback(${f.id})">Remove</button>
    `;

    entriesUl.appendChild(li);
  });
}
