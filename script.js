// Assume firebaseConfig is accessible from index.html context or passed if needed,
// but for this implementation, we focus on DOM manipulation and calculation first.

// Function to add an appliance to the list
function addAppliance() {
    const applianceNameInput = document.getElementById('applianceName');
    const kwhConsumptionInput = document.getElementById('kwhConsumption');

    const name = applianceNameInput.value.trim();
    const kwh = parseFloat(kwhConsumptionInput.value);

    if (name === "" || isNaN(kwh) || kwh <= 0) {
        alert("Please enter a valid appliance name and a positive consumption value.");
        return;
    }

    const appliance = { name: name, kwh: kwh };

    // 1. Add to list
    const applianceListBody = document.getElementById('applianceList');
    const newRow = applianceListBody.insertRow();

    // 2. Populate row
    const cellName = newRow.insertCell();
    const cellKwh = newRow.insertCell();
    const cellAction = newRow.insertCell();

    cellName.textContent = appliance.name;
    cellKwh.textContent = appliance.kwh.toFixed(2);
    cellAction.textContent = 'X'; // Placeholder for action button

    // 3. Update total
    updateTotalKwh(appliance.kwh);

    // 4. Clear inputs
    applianceNameInput.value = '';
    kwhConsumptionInput.value = '';
}

// Function to update the total consumption
function updateTotalKwh(newKwh) {
    let total = 0;
    const rows = document.getElementById('applianceList').rows;

    // Sum up all kWh from the table rows
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        // The consumption is in the second cell (index 1)
        const kwhText = row.cells[1].textContent;
        if (kwhText) {
            total += parseFloat(kwhText);
        }
    }

    // Update the total display
    document.getElementById('totalKwh').textContent = total.toFixed(2);
}

// Function to handle removing an appliance (simple implementation)
function removeAppliance(row) {
    // Remove the row from the table
    row.remove();
    // Recalculate the total
    updateTotalKwh(0); // This will recalculate the total based on remaining rows
}

// Event listener for removing appliances (attach to the table body)
document.getElementById('applianceList').addEventListener('click', function(event) {
    if (event.target.textContent === 'X') {
        // Get the parent row of the clicked 'X' button
        const row = event.target.closest('tr');
        if (row) {
            removeAppliance(row);
        }
    }
});

// Initial setup: Add a default row or ensure the total is correct on load (currently 0.00)
// The updateTotalKwh function will be called whenever an appliance is added.