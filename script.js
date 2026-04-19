document.getElementById('waitlist-form').addEventListener('submit', async function(e) {
  e.preventDefault();

  const btn = document.getElementById('submit-btn');
  const form = document.getElementById('waitlist-form');
  const success = document.getElementById('success-message');

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();

  // Loading state
  btn.innerHTML = `
    <svg class="animate-spin h-6 w-6 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
    </svg>
  `;
  btn.disabled = true;

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: "YOUR_WEB3FORMS_ACCESS_KEY_HERE",   // ← Replace with your key
        name: name,
        email: email,
        subject: "New OXYGEN Waitlist Signup",
        from_name: "OXYGEN Waitlist"
      })
    });

    if (response.ok) {
      form.classList.add('hidden');
      success.classList.remove('hidden');
    } else {
      alert("Something went wrong. Please try again.");
    }
  } catch (err) {
    console.error(err);
    alert("Please check your internet connection and try again.");
  } finally {
    btn.innerHTML = `Join the Waitlist <span class="text-2xl">→</span>`;
    btn.disabled = false;
  }
});
