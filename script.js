/*
 * Paste the deployed Google Apps Script URL here after following README.md.
 * Until then the form intentionally displays an error instead of pretending to save an RSVP.
 */
const RSVP_ENDPOINT =
  "https://docs.google.com/forms/d/e/1FAIpQLSf5FnaCB-IDfUGShohcOiUxzji3jNO6DCYZwbcA_dCclRUENw/formResponse";
const RSVP_FIELD = "entry.753674719";

const modal = document.querySelector("#rsvp-modal");
const form = document.querySelector("#rsvp-form");
const status = document.querySelector("#form-status");
const rsvpContent = document.querySelector("#rsvp-content");
const matchaContent = document.querySelector("#matcha-content");
const declineContent = document.querySelector("#decline-content");
const successContent = document.querySelector("#success-content");

function showPanel(panel) {
  [rsvpContent, matchaContent, declineContent, successContent].forEach((element) => {
    element.classList.toggle("hidden", element !== panel);
  });
}

function openRsvp() {
  showPanel(rsvpContent);
  modal.showModal();
}

document.querySelectorAll("[data-open-rsvp]").forEach((button) => {
  button.addEventListener("click", openRsvp);
});

document.querySelectorAll("[data-close-modal]").forEach((button) => {
  button.addEventListener("click", () => modal.close());
});

document.querySelector("[data-decline]").addEventListener("click", () => {
  showPanel(declineContent);
  modal.showModal();
});

document.querySelector("[data-reconsider]").addEventListener("click", () => {
  form.querySelector('input[value="Matcha"]').checked = false;
  showPanel(rsvpContent);
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) modal.close();
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(form);

  if (data.get("coffee") === "Matcha") {
    showPanel(matchaContent);
    return;
  }

  if (!RSVP_ENDPOINT) {
    status.textContent = "The RSVP inbox is not connected yet. Please ask for the live link.";
    return;
  }

  const submitButton = form.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  status.textContent = "Sending your answer…";
  const response = [
    `Meet-up preference: ${data.get("meetup")}`,
    `Coffee: ${data.get("coffee")}`,
    `Comment: ${data.get("comment") || "—"}`,
    `Submitted at: ${new Date().toISOString()}`,
  ].join("\n");

  try {
    await fetch(RSVP_ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      body: new URLSearchParams({
        [RSVP_FIELD]: "__other_option__",
        [`${RSVP_FIELD}.other_option_response`]: response,
      }),
    });
    showPanel(successContent);
    form.reset();
  } catch (error) {
    status.textContent = "Your answer could not be sent. Please try again.";
    console.error("RSVP submission failed:", error);
  } finally {
    submitButton.disabled = false;
  }
});
