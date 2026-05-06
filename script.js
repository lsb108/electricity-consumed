document.addEventListener('DOMContentLoaded', () => {
    // Initialize the application
    loadAppliances();
});

let appliances = [];
let totalKwh = 0;

// Function to load appliances from local storage or initialize empty array
function loadAppliances() {
    const storedAppliances = localStorage.getItem('appliances');
    if (storedAppliances) {
        appliances = JSON.parse(storedAppliances);
    } else {
        appliances = [];
    }
    renderAppliances();
    updateTotalKwh();
}

// Function to save appliances to local storage
function saveAppliances() {
    localStorage.setItem('appliances', JSON.stringify(appliances));
}

// Function to render the appliance list in the table
function renderAppliances() {
    const listElement = document.getElementById('applianceList');
    listElement.innerHTML = ''; // Clear existing list

    appliances.forEach((appliance, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${appliance.name}</td>
            <td>${appliance.kwh.toFixed(2)}</td>
            <td>
                <button onclick="removeAppliance(${index})">Xóa</button>
            </td>
        `;
        listElement.appendChild(row);
    });
}

// Function to calculate and display the total kWh
function updateTotalKwh() {
    totalKwh = appliances.reduce((sum, appliance) => sum + appliance.kwh, 0);
    document.getElementById('totalKwh').textContent = totalKwh.toFixed(2);
}

// Function to add a new appliance
function addAppliance() {
    const nameInput = document.getElementById('applianceName');
    const kwhInput = document.getElementById('kwhConsumption');

    const name = nameInput.value.trim();
    const kwh = parseFloat(kwhInput.value);

    if (name === "" || isNaN(kwh) || kwh < 0) {
        alert("Vui lòng nhập tên thiết bị hợp lệ và số lượng kWh hợp lệ.");
        return;
    }

    // Add to array
    appliances.push({ name: name, kwh: kwh });

    // Save and update UI
    saveAppliances();
    renderAppliances();
    updateTotalKwh();

    // Clear inputs
    nameInput.value = '';
    kwhInput.value = '';
}

// Function to remove an appliance by index
function removeAppliance(index) {
    // Remove from array
    appliances.splice(index, 1);

    // Save and update UI
    saveAppliances();
    renderAppliances();
    updateTotalKwh();
}

// Initial load when the page loads
loadAppliances();