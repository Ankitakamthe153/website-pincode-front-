document.addEventListener('DOMContentLoaded', function () {
    const pincode = localStorage.getItem('pincode');
    const postOffices = JSON.parse(localStorage.getItem('postOffices'));

    // Redirect to the first page if the data is missing
    if (!pincode || !postOffices) {
        window.location.href = 'index.html';
        return;
    }

    const displayPincode = document.getElementById('displayPincode');
    const pincodeMessage = document.getElementById('pincodeMessage');
    const resultContainer = document.getElementById('resultContainer');
    const filterInput = document.getElementById('filterInput');

    displayPincode.textContent = `${pincode}`;
    pincodeMessage.textContent = ` ${postOffices.length} pincode(s) found`;

    displayResults(postOffices);

    filterInput.addEventListener('input', function () {
        const query = filterInput.value.toLowerCase();
        const filtered = postOffices.filter(po => po.Name.toLowerCase().includes(query));
        displayResults(filtered);
    });

    function displayResults(postOffices) {
        resultContainer.innerHTML = '';
        if (postOffices.length > 0) {
            postOffices.forEach(postOffice => {
                const div = document.createElement('div');
                div.className = 'result-item';
                div.innerHTML = `
                    <div><strong>Name:</strong> ${postOffice.Name}</div>
                    <div><strong>Branch Type:</strong> ${postOffice.BranchType}</div>
                    <div><strong>Delivery Status:</strong> ${postOffice.DeliveryStatus}</div>
                    <div><strong>District:</strong> ${postOffice.District}</div>
                    <div><strong>Division:</strong> ${postOffice.Division}</div>
                `;
                resultContainer.appendChild(div);
            });
        } else {
            resultContainer.innerHTML = '<p>Couldn’t find the postal data you’re looking for...</p>';
        }
    }
});
