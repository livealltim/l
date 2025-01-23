document.getElementById('userForm').addEventListener('submit', async function (event) {
  event.preventDefault();

  // Get form data
  const mobile = document.getElementById('mobile').value;
  const bank = document.getElementById('bank').value;
  const upi = document.getElementById('upi').value;

  const data = {
    mobile,
    bank,
    upi,
  };

  console.log('Submitting Data:', data); // Debug log for submitted data

  // Send data to backend API
  try {
    const response = await fetch('https://ba-6.onrender.com/saveData', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const responseData = await response.text(); // Backend response
      alert('Data submitted successfully!');
      console.log('Server Response:', responseData);
    } else {
      const errorText = await response.text();
      console.error('Server Error:', errorText);
      alert('Error submitting data. Please try again.');
    }
  } catch (error) {
    console.error('Network Error:', error);
    alert('Failed to submit data. Check your network connection.');
  }
});
