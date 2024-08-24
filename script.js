document.getElementById('pincodeForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const pincode = document.getElementById('pincodeInput').value;
    const errorDiv = document.getElementById('error');
    const loader = document.getElementById('loader');
    const resultContainer = document.getElementById('resultContainer');

    if (pincode.length !== 6 || isNaN(pincode)) {
        errorDiv.textContent = 'Please enter a valid 6-digit pincode.';
        return;
    }

    errorDiv.textContent = '';
    loader.style.display = 'block';
    resultContainer.innerHTML = '';

    fetch(`https://api.postalpincode.in/pincode/${pincode}`)
        .then(response => response.json())
        .then(data => {
            loader.style.display = 'none';
            if (data[0].Status === 'Error') {
                errorDiv.textContent = 'Error fetching data. Please try again.';
            } else {
                const postOffices = data[0].PostOffice;
                if (postOffices.length > 0) {
                    localStorage.setItem('pincode', pincode);
                    localStorage.setItem('postOffices', JSON.stringify(postOffices));
                    window.location.href = 'results.html';
                } else {
                    errorDiv.textContent = 'Couldn’t find the postal data you’re looking for...';
                }
            }
        })
        .catch(error => {
            loader.style.display = 'none';
            errorDiv.textContent = 'Error fetching data. Please try again.';
        });
});
