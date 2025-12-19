// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!

function fetchWeatherAlerts(state) {
  const alertsDisplay = document.getElementById('alerts-display');
  alertsDisplay.textContent = 'Loading weather alerts...'; // Show loading indicator

  fetch(`${weatherApi}${state}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      displayAlerts(data);
    })
    .catch(error => {
      console.log('Error fetching weather alerts:', error);
      // Display error in DOM
      const errorDiv = document.getElementById('error-message');
      errorDiv.textContent = 'Error fetching weather alerts: ' + error.message;
      errorDiv.classList.remove('hidden');
      alertsDisplay.innerHTML = ''; // Clear loading indicator
    });
}

function displayAlerts(data) {
  const alertsDisplay = document.getElementById('alerts-display');
  const errorDiv = document.getElementById('error-message');
  errorDiv.classList.add('hidden'); // Hide any previous error
  errorDiv.textContent = ''; // Clear error text

  // Summary message
  const summary = `${data.title}: ${data.features.length}`;
  const summaryDiv = document.createElement('div');
  summaryDiv.textContent = summary;
  summaryDiv.style.fontWeight = 'bold';
  summaryDiv.style.marginBottom = '10px';

  // List of headlines
  const list = document.createElement('ul');
  data.features.forEach(alert => {
    const item = document.createElement('li');
    item.textContent = alert.properties.headline;
    list.appendChild(item);
  });

  // Clear previous content and add new
  alertsDisplay.innerHTML = '';
  alertsDisplay.appendChild(summaryDiv);
  alertsDisplay.appendChild(list);
}

document.getElementById('fetch-alerts').addEventListener('click', () => {
  const state = document.getElementById('state-input').value.trim().toUpperCase();
  const errorDiv = document.getElementById('error-message');
  if (!state) {
    errorDiv.textContent = 'Please enter a state abbreviation';
    errorDiv.classList.remove('hidden');
  } else if (!/^[A-Z]{2}$/.test(state)) {
    errorDiv.textContent = 'Please enter a valid two-letter state abbreviation';
    errorDiv.classList.remove('hidden');
  } else {
    errorDiv.classList.add('hidden');
    errorDiv.textContent = '';
    fetchWeatherAlerts(state);
    // Clear the input field after fetching
    document.getElementById('state-input').value = '';
  }
});
