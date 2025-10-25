# Neonatal Risk Score Calculator (Apgar Score)

This project is an educational web-based dashboard designed to teach healthcare students about the **Apgar Score**, a simple and rapid assessment used to determine the health of a newborn child immediately after birth.

The application allows users to simulate three different newborn scenarios (vigorous, moderately depressed, and severely depressed) to see how the Apgar score is calculated and what the clinical implications are.

## ✨ Features

- **Apgar Score Calculation:** Automatically calculates the total Apgar score from 5 key criteria.
- **Dynamic Status Updates:** The main status card changes color and text (Normal, Watch, Alert) based on the calculated score.
- **Interactive Scenarios:** Buttons allow users to instantly load different newborn profiles.
- **Data Visualization:** A **Radar Chart** provides a clear visual breakdown of the 5 Apgar components for each scenario.
- **Responsive Design:** Built with a mobile-first, flexible layout that works on any device.
- **Modern Tech Stack:** Built with HTML, CSS, and JavaScript, and bundled with Webpack.

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
