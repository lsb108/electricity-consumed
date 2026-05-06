<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-analytics.js";
  import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-auth.js";

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAbH5tI8aC803kyKcVFzvJgMO3Ru2bRw_8",
    authDomain: "electricity-consumed.firebaseapp.com",
    projectId: "electricity-consumed",
    storageBucket: "electricity-consumed.firebasestorage.app",
    messagingSenderId: "634697388134",
    appId: "1:634697388134:web:c56f4be9f5cc0425a01da7",
    measurementId: "G-HVJMHB3S7W"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);

  // --- Appliance Tracking Logic ---

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

  // --- Authentication Logic ---

  // Function to handle user sign-in
  async function signIn(email, password) {
      try {
          await signInWithEmailAndPassword(auth, email, password);
          console.log("Sign-in successful!");
          // After successful sign-in, the onAuthStateChanged listener will handle UI updates.
      } catch (error) {
          console.error("Sign-in error:", error.message);
          alert("Sign-in failed: " + error.message);
      }
  }

  // Function to handle user sign-up
  async function signUp(email, password) {
      try {
          await createUserWithEmailAndPassword(auth, email, password);
          console.log("Sign-up successful!");
          alert("Sign-up successful! You are now logged in.");
      } catch (error) {
          console.error("Sign-up error:", error.message);
          alert("Sign-up failed: " + error.message);
      }
  }

  // Function to handle sign-out
  function signOutUser() {
      signOut(auth);
      console.log("User signed out.");
  }

  // Listener for authentication state changes
  onAuthStateChanged(auth, (user) => {
      if (user) {
          console.log("User is signed in:", user.uid);
          // Show the main application interface if the user is logged in
          document.getElementById('loginScreen').style.display = 'none';
          document.getElementById('applianceApp').style.display = 'block';
      } else {
          console.log("User is signed out.");
          // Show the login screen if the user is signed out
          document.getElementById('loginScreen').style.display = 'block';
          document.getElementById('applianceApp').style.display = 'none';
      }
  });
</script>