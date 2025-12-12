# Neonatal Risk Score Calculator - User Guide

## Overview

This application helps healthcare professionals and students assess neonatal risk using the Apgar scoring system. It now includes user authentication, bilingual support, and the ability to import and evaluate multiple neonates.

## Features

### 1. Login System

- **Google Sign-In**: Mock Google authentication (demonstration only)
- **Demo Login**: Quick access for testing purposes
- Upon login, your name is displayed in the header

### 2. Language Support

- **English/Arabic**: Click the language icon (🌐) in the header to toggle
- **RTL Support**: Arabic text is displayed right-to-left automatically
- All interface elements, including chart labels, update dynamically

### 3. Import Neonates Feature

#### Supported File Formats

**JSON Format:**

```json
[
  {
    "name": "Baby Name",
    "appearance": 0-2,
    "pulse": 0-2,
    "grimace": 0-2,
    "activity": 0-2,
    "respiration": 0-2
  }
]
```

**CSV Format:**

```csv
name,appearance,pulse,grimace,activity,respiration
Baby Name,0-2,0-2,0-2,0-2,0-2
```

#### How to Import:

1. Click the "Import Neonates List (JSON/CSV)" button
2. Select your JSON or CSV file
3. The imported neonates appear in a dropdown list with their calculated scores
4. Select a neonate from the list
5. Click "Load Selected" to view their detailed assessment

### 4. Apgar Score Assessment

#### The Five Criteria (Each scored 0-2):

- **Appearance (Color)**: Skin color of the newborn
- **Pulse (Heart Rate)**: Heart rate measurement
- **Grimace (Reflex)**: Reflex response to stimulation
- **Activity (Muscle Tone)**: Muscle tone and movement
- **Respiration (Effort)**: Breathing effort

#### Score Interpretation:

- **7-10**: Normal - Provide routine care (Green indicator)
- **4-6**: Moderately Depressed - Some resuscitation may be needed (Yellow indicator)
- **0-3**: Severely Depressed - Urgent intervention required (Red indicator)

### 5. Pre-loaded Scenarios

Test the system with three built-in scenarios:

- **Vigorous Newborn**: All criteria at maximum (Score: 10)
- **Moderate Newborn**: Mixed scoring (Score: 6)
- **Severe Newborn**: Critical condition (Score: 2)

### 6. Data Visualization

- **Radar Chart**: Visual representation of all five Apgar criteria
- **Score Circle**: Large, color-coded display of total score
- **Detailed Breakdown**: Individual scores for each criterion

## Getting Started

1. **Launch the Application**

   ```bash
   npm run start
   ```

2. **Login**
   - Click either "Sign in with Google" or "Demo Login"
   - Your name will appear in the header

3. **Choose Assessment Method**
   - Use pre-loaded scenarios for quick testing
   - Import a list of neonates for batch assessment

4. **Switch Language**
   - Click the language icon (🌐) to toggle between English and Arabic

5. **Logout**
   - Click the logout icon (sign-out) when finished

## Sample Data Files

Two sample files are included in the project root:

- `sample-neonates.json`: JSON format example
- `sample-neonates.csv`: CSV format example

## Technical Notes

### Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- JavaScript must be enabled
- Supports both desktop and mobile devices

### File Size Limits

- JSON/CSV files should contain valid Apgar data
- Each criterion must be a number between 0-2
- Large files (1000+ entries) may take a moment to load

### Data Privacy

- This is a demonstration application
- No actual authentication is performed
- No data is stored on servers
- All processing happens locally in your browser

## Troubleshooting

**Import not working?**

- Verify file format matches the examples
- Ensure all values are numbers between 0-2
- Check that column names in CSV match exactly

**Language not switching?**

- Refresh the page
- Clear browser cache if issues persist

**Chart not displaying?**

- Ensure JavaScript is enabled
- Try a different browser
- Check browser console for errors

## Educational Use

This application is designed for:

- Medical students learning Apgar scoring
- Healthcare training simulations
- Quick reference for clinical staff
- Educational demonstrations

## Support

For issues or questions, please refer to the project README.md or contact the developer.

---

**Version**: 2.0  
**Made by**: Mariam Al-talqani 23901045  
**License**: MIT
