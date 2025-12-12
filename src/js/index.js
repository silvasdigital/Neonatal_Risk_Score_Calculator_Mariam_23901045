import '../css/styles.css';
import Chart from 'chart.js/auto';

// --- TRANSLATIONS ---
const translations = {
  en: {
    'app-title': 'Neonatal Risk Score Calculator',
    'app-subtitle': 'Educational V1 (Apgar Score)',
    'made-by': 'Made by: Mariam Al-talqani 23901045',
    'login-google': 'Sign in with Google',
    'login-demo': 'Demo Login',
    'apgar-score-title': 'Apgar Score',
    'load-patient': 'Load a patient scenario to begin.',
    'visualization-title': 'Score Visualization',
    'criteria-title': 'Apgar Criteria',
    appearance: 'Appearance',
    color: 'Color',
    pulse: 'Pulse',
    'heart-rate': 'Heart Rate',
    grimace: 'Grimace',
    reflex: 'Reflex',
    activity: 'Activity',
    'muscle-tone': 'Muscle Tone',
    respiration: 'Respiration',
    effort: 'Effort',
    'scenarios-title': 'Simulation Scenarios',
    'import-neonates': 'Import Neonates List (JSON/CSV)',
    'imported-neonates': 'Imported Neonates',
    'load-selected': 'Load Selected',
    'scenarios-description': 'Load different newborn profiles to see the calculated Apgar score.',
    'vigorous-newborn': 'Load Vigorous Newborn',
    'moderate-newborn': 'Load Moderate Newborn',
    'severe-newborn': 'Load Severe Newborn',
    'status-normal': 'Normal (Score 7-10). Provide routine care.',
    'status-watch': 'Moderately Depressed (Score 4-6). Some resuscitation may be needed.',
    'status-alert': 'Severely Depressed (Score 0-3). Urgent intervention and resuscitation required.'
  },
  ar: {
    'app-title': 'حاسبة درجة مخاطر حديثي الولادة',
    'app-subtitle': 'تعليمي V1 (درجة أبغار)',
    'made-by': 'من إعداد: مريم الطلقاني 23901045',
    'login-google': 'تسجيل الدخول باستخدام Google',
    'login-demo': 'دخول تجريبي',
    'apgar-score-title': 'درجة أبغار',
    'load-patient': 'قم بتحميل سيناريو المريض للبدء.',
    'visualization-title': 'تصور النتيجة',
    'criteria-title': 'معايير أبغار',
    appearance: 'المظهر',
    color: 'اللون',
    pulse: 'النبض',
    'heart-rate': 'معدل ضربات القلب',
    grimace: 'التكشير',
    reflex: 'المنعكس',
    activity: 'النشاط',
    'muscle-tone': 'قوة العضلات',
    respiration: 'التنفس',
    effort: 'الجهد',
    'scenarios-title': 'سيناريوهات المحاكاة',
    'import-neonates': 'استيراد قائمة المواليد (JSON/CSV)',
    'imported-neonates': 'المواليد المستوردة',
    'load-selected': 'تحميل المحدد',
    'scenarios-description': 'قم بتحميل ملفات تعريف مختلفة لحديثي الولادة لرؤية درجة أبغار المحسوبة.',
    'vigorous-newborn': 'تحميل مولود قوي',
    'moderate-newborn': 'تحميل مولود متوسط',
    'severe-newborn': 'تحميل مولود شديد',
    'status-normal': 'طبيعي (الدرجة 7-10). تقديم الرعاية الروتينية.',
    'status-watch': 'منخفض معتدل (الدرجة 4-6). قد تكون هناك حاجة لبعض الإنعاش.',
    'status-alert': 'منخفض بشدة (الدرجة 0-3). مطلوب تدخل عاجل وإنعاش.'
  }
};

let currentLanguage = 'en';

// --- USER STATE ---
let currentUser = null;
let importedNeonates = [];

// --- MOCK NEWBORN DATA ---
// Apgar is 5 values, each scored 0, 1, or 2.
const newbornData = {
  vigorous: {
    name: 'Vigorous Newborn',
    appearance: 2, // Completely pink
    pulse: 2, // > 100 bpm
    grimace: 2, // Cries, coughs
    activity: 2, // Active motion
    respiration: 2 // Good, crying
  },
  moderate: {
    name: 'Moderate Newborn',
    appearance: 1, // Body pink, extremities blue
    pulse: 2, // > 100 bpm
    grimace: 1, // Grimace
    activity: 1, // Some flexion
    respiration: 1 // Slow, irregular
  },
  severe: {
    name: 'Severe Newborn',
    appearance: 0, // Blue, pale
    pulse: 1, // < 100 bpm
    grimace: 0, // No response
    activity: 0, // Limp
    respiration: 1 // Slow, irregular
  }
};

// --- DOM ELEMENT SELECTORS ---
const elements = {
  loginPage: document.getElementById('login-page'),
  mainApp: document.getElementById('main-app'),
  btnGoogleLogin: document.getElementById('btn-google-login'),
  btnDemoLogin: document.getElementById('btn-demo-login'),
  btnLogout: document.getElementById('btn-logout'),
  btnLanguageToggle: document.getElementById('btn-language-toggle'),
  userName: document.getElementById('user-name'),
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
  btnSevere: document.getElementById('btn-severe'),
  fileImport: document.getElementById('file-import'),
  importedList: document.getElementById('imported-list'),
  neonateSelector: document.getElementById('neonate-selector'),
  btnLoadSelected: document.getElementById('btn-load-selected')
};

let apgarChart; // To hold the chart instance

// --- FUNCTIONS ---

/**
 * Translates the page to the current language
 */
function translatePage() {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach((element) => {
    const key = element.getAttribute('data-i18n');
    if (translations[currentLanguage][key]) {
      element.textContent = translations[currentLanguage][key];
    }
  });

  // Update HTML attributes
  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';

  // Update chart if it exists
  if (apgarChart) {
    const labels =
      currentLanguage === 'ar'
        ? ['المظهر', 'النبض', 'التكشير', 'النشاط', 'التنفس']
        : ['Appearance', 'Pulse', 'Grimace', 'Activity', 'Respiration'];
    apgarChart.data.labels = labels;
    apgarChart.update();
  }
}

/**
 * Toggle between English and Arabic
 */
function toggleLanguage() {
  currentLanguage = currentLanguage === 'en' ? 'ar' : 'en';
  translatePage();
}

/**
 * Handle login (mock implementation)
 */
function handleLogin(provider) {
  // Mock login - in production, this would use OAuth
  const userName = provider === 'google' ? 'Demo User (Google)' : 'Demo User';
  currentUser = { name: userName, email: 'demo@example.com' };

  elements.userName.textContent = userName;
  elements.loginPage.style.display = 'none';
  elements.mainApp.style.display = 'block';

  // Initialize with default scenario
  updateDashboard(newbornData.vigorous);
}

/**
 * Handle logout
 */
function handleLogout() {
  currentUser = null;
  importedNeonates = [];
  elements.loginPage.style.display = 'flex';
  elements.mainApp.style.display = 'none';
  elements.importedList.style.display = 'none';
  // Reset file input to allow re-uploading the same file
  elements.fileImport.value = '';
}

/**
 * Parse CSV file
 */
function parseCSV(text) {
  const lines = text.trim().split('\n');
  const headers = lines[0].split(',').map((h) => h.trim().toLowerCase());
  const neonates = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map((v) => v.trim());
    const neonate = {
      name: values[headers.indexOf('name')] || `Neonate ${i}`,
      appearance: parseInt(values[headers.indexOf('appearance')]) || 0,
      pulse: parseInt(values[headers.indexOf('pulse')]) || 0,
      grimace: parseInt(values[headers.indexOf('grimace')]) || 0,
      activity: parseInt(values[headers.indexOf('activity')]) || 0,
      respiration: parseInt(values[headers.indexOf('respiration')]) || 0
    };
    neonates.push(neonate);
  }

  return neonates;
}

/**
 * Handle file import
 */
function handleFileImport(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const content = e.target.result;

      if (file.name.endsWith('.json')) {
        importedNeonates = JSON.parse(content);
      } else if (file.name.endsWith('.csv')) {
        importedNeonates = parseCSV(content);
      }

      // Populate the selector
      elements.neonateSelector.innerHTML = '';
      importedNeonates.forEach((neonate, index) => {
        const option = document.createElement('option');
        option.value = index;
        const score = neonate.appearance + neonate.pulse + neonate.grimace + neonate.activity + neonate.respiration;
        option.textContent = `${neonate.name} (Score: ${score})`;
        elements.neonateSelector.appendChild(option);
      });

      elements.importedList.style.display = 'block';
    } catch (error) {
      alert('Error parsing file. Please check the format.');
      console.error(error);
    }
  };

  reader.readAsText(file);
  // Reset the file input to allow re-uploading the same file
  event.target.value = '';
}

/**
 * Load selected neonate from imported list
 */
function loadSelectedNeonate() {
  const selectedIndex = elements.neonateSelector.value;
  if (selectedIndex !== null && importedNeonates[selectedIndex]) {
    updateDashboard(importedNeonates[selectedIndex]);
  }
}

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
    elements.statusAdvice.textContent = translations[currentLanguage]['status-normal'];
  } else if (score >= 4) {
    elements.statusCard.classList.add('status-watch');
    elements.statusAdvice.textContent = translations[currentLanguage]['status-watch'];
  } else {
    elements.statusCard.classList.add('status-alert');
    elements.statusAdvice.textContent = translations[currentLanguage]['status-alert'];
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
  const labels =
    currentLanguage === 'ar'
      ? ['المظهر', 'النبض', 'التكشير', 'النشاط', 'التنفس']
      : ['Appearance', 'Pulse', 'Grimace', 'Activity', 'Respiration'];

  if (apgarChart) {
    apgarChart.data.datasets[0].data = data;
    apgarChart.data.labels = labels;
    apgarChart.update();
  } else {
    apgarChart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: labels,
        datasets: [
          {
            label: currentLanguage === 'ar' ? 'درجة أبغار' : 'Apgar Score',
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
  // Login buttons
  elements.btnGoogleLogin.addEventListener('click', () => handleLogin('google'));
  elements.btnDemoLogin.addEventListener('click', () => handleLogin('demo'));
  elements.btnLogout.addEventListener('click', handleLogout);

  // Language toggle
  elements.btnLanguageToggle.addEventListener('click', toggleLanguage);

  // File import
  elements.fileImport.addEventListener('change', handleFileImport);
  document.querySelector('.import-label').addEventListener('click', () => {
    elements.fileImport.click();
  });

  // Load selected neonate
  elements.btnLoadSelected.addEventListener('click', loadSelectedNeonate);

  // Set up buttons to load different scenarios
  elements.btnVigorous.addEventListener('click', () => updateDashboard(newbornData.vigorous));
  elements.btnModerate.addEventListener('click', () => updateDashboard(newbornData.moderate));
  elements.btnSevere.addEventListener('click', () => updateDashboard(newbornData.severe));

  // Initialize translations
  translatePage();
});
