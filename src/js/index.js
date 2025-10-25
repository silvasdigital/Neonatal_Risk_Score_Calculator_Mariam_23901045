import '../css/styles.css';
import Chart from 'chart.js/auto';

// --- MOCK NEWBORN DATA ---
// Apgar is 5 values, each scored 0, 1, or 2.
const newbornData = {
  vigorous: {
    appearance: 2, // Completely pink
    pulse: 2, // > 100 bpm
    grimace: 2, // Cries, coughs
    activity: 2, // Active motion
    respiration: 2 // Good, crying
  },
  moderate: {
    appearance: 1, // Body pink, extremities blue
    pulse: 2, // > 100 bpm
    grimace: 1, // Grimace
    activity: 1, // Some flexion
    respiration: 1 // Slow, irregular
  },
  severe: {
    appearance: 0, // Blue, pale
    pulse: 1, // < 100 bpm
    grimace: 0, // No response
    activity: 0, // Limp
    respiration: 1 // Slow, irregular
  }
};

// --- DOM ELEMENT SELECTORS ---
const elements = {
  statusCard: document.getElementById('status-card'),
  apgarScore: document.getElementById('apgar-score'),
  statusAdvice: document.getElementById('status-advice'),
  appearance: document.getElementById('appearance'),
  pulse: document.getElementById('pulse'),
  grimace: document.getElementById('grimace'),
  activity: document.getElementById('activity'),
  respiration: document.getElementById('respiration'),
  btnVigorous: document.getElementById('btn-vigorous'),
  btnModerate: document.getElementById('btn-moderate'),
  btnSevere: document.getElementById('btn-severe')
};

let apgarChart; // To hold the chart instance

// --- FUNCTIONS ---

/**
 * Updates the entire dashboard UI with data from a newborn object.
 * @param {object} newborn - The newborn data object.
 */
function updateDashboard(newborn) {
  // 1. Calculate the total Apgar score
  const score = newborn.appearance + newborn.pulse + newborn.grimace + newborn.activity + newborn.respiration;

  // 2. Update the score circle
  elements.apgarScore.textContent = score;

  // 3. Update the criteria list
  elements.appearance.textContent = `${newborn.appearance} / 2`;
  elements.pulse.textContent = `${newborn.pulse} / 2`;
  elements.grimace.textContent = `${newborn.grimace} / 2`;
  elements.activity.textContent = `${newborn.activity} / 2`;
  elements.respiration.textContent = `${newborn.respiration} / 2`;

  // 4. Update the overall status card
  elements.statusCard.className = 'card'; // Reset classes
  if (score >= 7) {
    elements.statusCard.classList.add('status-normal');
    elements.statusAdvice.textContent = 'Normal (Score 7-10). Provide routine care.';
  } else if (score >= 4) {
    elements.statusCard.classList.add('status-watch');
    elements.statusAdvice.textContent = 'Moderately Depressed (Score 4-6). Some resuscitation may be needed.';
  } else {
    elements.statusCard.classList.add('status-alert');
    elements.statusAdvice.textContent =
      'Severely Depressed (Score 0-3). Urgent intervention and resuscitation required.';
  }

  // 5. Update the Radar Chart
  const chartData = [newborn.appearance, newborn.pulse, newborn.grimace, newborn.activity, newborn.respiration];
  updateChart(chartData);
}

/**
 * Creates or updates the Apgar radar chart.
 * @param {number[]} data - Array of the 5 Apgar scores.
 */
function updateChart(data) {
  const ctx = document.getElementById('apgarChart').getContext('2d');
  const labels = ['Appearance', 'Pulse', 'Grimace', 'Activity', 'Respiration'];

  if (apgarChart) {
    apgarChart.data.datasets[0].data = data;
    apgarChart.update();
  } else {
    apgarChart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Apgar Score',
            data: data,
            fill: true,
            backgroundColor: 'rgba(0, 123, 255, 0.2)',
            borderColor: 'rgb(0, 123, 255)',
            pointBackgroundColor: 'rgb(0, 123, 255)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(0, 123, 255)'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          r: {
            // 'r' is for radial axis
            beginAtZero: true,
            max: 2,
            stepSize: 1, // Forces scale to be 0, 1, 2
            pointLabels: {
              font: {
                size: 14 // Make labels easier to read
              }
            },
            ticks: {
              backdropColor: 'transparent' // Cleaner ticks
            }
          }
        },
        plugins: {
          legend: {
            display: false // Hide the legend as it's redundant
          }
        }
      }
    });
  }
}

// --- EVENT LISTENERS ---
document.addEventListener('DOMContentLoaded', () => {
  // Load the vigorous newborn by default
  updateDashboard(newbornData.vigorous);

  // Set up buttons to load different scenarios
  elements.btnVigorous.addEventListener('click', () => updateDashboard(newbornData.vigorous));
  elements.btnModerate.addEventListener('click', () => updateDashboard(newbornData.moderate));
  elements.btnSevere.addEventListener('click', () => updateDashboard(newbornData.severe));
});
