# 🌍 Countries Explorer

> A modern React application to explore and favorite countries using the [REST Countries API](https://restcountries.com/).

🟢 **Hosted at**: [https://countries-explorer-iota.vercel.app](https://countries-explorer-iota.vercel.app)

---

## ✨ Features

- 🌐 Browse all countries with flag, name, population, region, capital, and more.
- 🔍 Search by name with debounce to limit API calls.
- 🌎 Filter by region or language.
- 🔃 Sort by name or population (ascending/descending).
- ⭐ Favorite countries (stored per user via `localStorage`).
- 🌙 Dark/Light theme toggle.
- 📱 Responsive design built with Material UI components.

---

## 🛠️ Tech Stack

| Tool                | Usage                             |
|---------------------|-----------------------------------|
| **React 18+**        | UI framework                     |
| **React Router v6**  | Client-side routing               |
| **Material UI v5**   | Component library + theming       |
| **Axios**            | HTTP requests                     |
| **Vite**             | Build tool & dev server           |
| **Vitest** + RTL     | Unit & integration testing        |

---

## 🚀 Quick Start

### 🔧 Prerequisites

- **Node.js** ≥ 16
- **npm** ≥ 8 (or use Yarn)

### 📦 Installation

```bash
# 1. Clone the repo
git clone https://github.com/Dumidu1212/Countries-Explorer.git
cd Countries-Explorer

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run start
