# Neonatal Risk Score Calculator (Apgar Score)

This project is an educational web-based dashboard designed to teach healthcare students about the **Apgar Score**, a simple and rapid assessment used to determine the health of a newborn child immediately after birth.

The application allows users to simulate three different newborn scenarios (vigorous, moderately depressed, and severely depressed) to see how the Apgar score is calculated and what the clinical implications are.

## ✨ Features

- **User Authentication:** Login page with Google and demo authentication (for demonstration purposes)
- **Bilingual Support:** Toggle between English and Arabic languages with full RTL support
- **User Profile Display:** Shows the logged-in user's name in the header
- **Import Neonates:** Import lists of neonates from JSON or CSV files for batch assessment
- **Apgar Score Calculation:** Automatically calculates the total Apgar score from 5 key criteria
- **Dynamic Status Updates:** The main status card changes color and text (Normal, Watch, Alert) based on the calculated score
- **Interactive Scenarios:** Buttons allow users to instantly load different newborn profiles
- **Data Visualization:** A **Radar Chart** provides a clear visual breakdown of the 5 Apgar components for each scenario
- **Responsive Design:** Built with a mobile-first, flexible layout that works on any device
- **Modern Tech Stack:** Built with HTML, CSS, and JavaScript, and bundled with Webpack

## 📋 Import File Format

You can import multiple neonates using JSON or CSV format:

**JSON Format (sample-neonates.json):**

```json
[
  {
    "name": "Baby Ahmed",
    "appearance": 2,
    "pulse": 2,
    "grimace": 2,
    "activity": 2,
    "respiration": 2
  }
]
```

**CSV Format (sample-neonates.csv):**

```csv
name,appearance,pulse,grimace,activity,respiration
Baby Ahmed,2,2,2,2,2
Baby Sarah,1,2,1,1,2
```

Each Apgar criterion is scored from 0-2. Sample files are included in the project root.

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) and npm (which comes with Node.js) installed on your system.

### Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone <your-repository-url>
    cd neonatal-risk-calculator
    ```

2.  **Install dependencies:**
    This command will install all the necessary packages defined in `package.json`, including `chart.js`.
    ```bash
    npm install
    ```

### Running the Application

- **For Development:**
  This command starts a live development server and automatically opens the calculator in your browser.

  ```bash
  npm run start
  ```

- **For Production:**
  This command builds an optimized version of the application, ready for deployment. The optimized files will be placed in the `/dist` directory.
  ```bash
  npm run build
  ```
