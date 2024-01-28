document.addEventListener('DOMContentLoaded', function () {
    const paymentForm = document.getElementById('payment-form');
    const paymentStatus = document.getElementById('payment-status');

    paymentForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const phoneNumber = document.getElementById('phone-number').value;
        const amount = document.getElementById('amount').value;

        // Replace the following with your actual MoMo API credentials and endpoint URLs
        const apiUrl = 'https://sandbox.momodeveloper.mtn.co.rw/collection/v1_0/requesttopay';
        const apiKey = 'f0116eeaa3734d42b29a939d7e420643';
        const userId = '58a75be0-35cf-4140-bdce-fabce66976e6';
        const currency = 'RWF';

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                    'Ocp-Apim-Subscription-Key': apiKey,
                },
                body: JSON.stringify({
                    amount,
                    currency,
                    externalId: Date.now().toString(),
                    payer: {
                        partyIdType: 'MSISDN',
                        partyId: 250792449953,
                    },
                    payerMessage: 'Payment for goods/services',
                    payeeNote: 'Thank you for your payment',
                }),
            });

            const result = await response.json();

            // Display the payment status
            paymentStatus.textContent = `Payment Status: ${result.status}`;
        } catch (error) {
            console.error('Error processing payment:', error);
            paymentStatus.textContent = 'Payment Failed';
        }
    });
});
