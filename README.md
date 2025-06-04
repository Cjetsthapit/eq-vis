# 🌍 Earthquake Data Dashboard

A responsive and interactive dashboard for visualizing earthquake data using charts and tables. Built with **React**, **Recharts**, and **Zustand** for state management.

---

## 🚀 Features

- 📊 Interactive scatter chart of earthquake parameters
- 📋 Paginated and selectable table view
- 🔁 Sync between chart and table selections
- 🧭 Axis customization (select X and Y axes)
- 📅 Properly parsed and formatted date-time fields
- ⚡ Smooth scrolling to selected table rows
- 📱 Responsive layout

---

## Exteral dependencies
Zustand	Lightweight global state management for React
Tailwind CSS	Utility-first CSS framework for rapid UI development
Recharts	Responsive and customizable charting components
PapaParse	Fast and powerful CSV parser for JavaScript

---

## 🤖 Use of AI Tools in Development

💡 Code Assistance & Debugging
- Used ChatGPT to debug runtime errors (e.g., handling `[object Date]` in React rendering).
- Refactored complex components like `ChartPanel` and `TablePanel` to be more modular, readable, and performant with AI's suggestions.
- Implemented custom shapes in Recharts with conditionally styled selection using AI guidance.

🎨 UI/UX Design
- Leveraged AI to suggest Tailwind-based layout improvements, responsive structuring, and styling tips.
- AI-generated visual inspiration for dashboard layout (chart/table split, scroll behavior, pagination).

🧠 State Management
- Used AI to architect and configure Zustand store for global state (pagination, selected row, etc.).


---

## 🧰 Prerequisites

- **Node.js** (v16+ recommended)
- **npm** or **yarn**

---

## ⚙️ Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/eq-vis.git
cd eq-vis

# Install dependencies
npm install

# Run the app
npm run dev

---


