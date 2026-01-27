# Real-Time Character Counter

![HTML5 Badge](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3 Badge](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript Badge](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

A comprehensive text analysis tool that tracks character metrics in real-time. Beyond simple counting, it provides detailed insights into letter density and sentence structure, built entirely with JavaScript.

## 🔗 Links

- **Live Demo Link:**

## 📊 Character Counter Showcase

<img src="images/character_counter.gif" alt="Character Counter Dashboard" width="400"/>

## 🧐 About The Project

This project helps users analyze the structure of their text. While many counters only track characters, this application dives deeper by monitoring word count, sentence count, and the frequency of individual letters.

It was built to handle string manipulation efficiently, ensuring that even with large blocks of text, the analysis remains instant and the UI responsive.

### Key Features

- **Real-Time Metrics:** Instantly calculates the total number of characters, words, and sentences as the user types.
- **Smart Constraints:**
  - **Character Limit:** Users can set a custom cap.
  - **Exclude Spaces:** A toggleable option to remove whitespace from the total character count for strict length requirements.
- **Letter Density Analysis:**
  - **Frequency Sorting:** Dynamically tracks the usage of every letter (A-Z) and sorts them from most used to least used.
  - **Visual Bars:** Renders a progress bar for each letter to visually represent its dominance in the text.
  - **Expandable View:** To keep the UI clean, the list shows only the top results by default, with a "See More" option to reveal the full alphabet breakdown.

## 🛠️ Technologies Used

- **HTML** for the text area and dashboard structure.
- **CSS** for the dark theme styling, custom checkboxes, and the dynamic width of the density bars.
- **JavaScript(ES6+)** for:
  - String manipulation (Regex for sentence splitting).
  - Array sorting (ordering letter frequency).
  - DOM updates (rendering the density list dynamically).
