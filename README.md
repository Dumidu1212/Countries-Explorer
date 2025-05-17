Countries Explorer

Hosted URL: https://countries-explorer-iota.vercel.app/

A React application to browse, search, filter, sort, and favorite countries, leveraging the REST Countries API.

Features
•	Browse all countries with flag, population, region, capital, and more.
•	Search by name with debounce to limit API calls.
•	Filter by region or language.
•	Sort by name or population (ascending/descending).
•	Favorites: mark/unmark countries; persists per user in localStorage.
•	Dark/Light theme toggle.
•	Responsive layout, using Material UI components.

Tech Stack
•	React 1
•	React Router v6
•	Material UI v5
•	Axios for HTTP requests
•	Vitest & React Testing Library for tests
•	Vite as build tool

Prerequisites
•	Node.js ≥ 16
•	npm ≥ 8 (or Yarn)


Installation & Setup
1.	Clone the repo:
git clone https://github.com/Dumidu1212/Countries-Explorer.git
2.	Install dependencies:
npm install
3.	Run in development mode:
npm run start


Available Scripts
npm start
Runs the app in development mode with hot reload.
npm run build
Bundles the app for production into the dist/ folder.
npm run test
Runs unit and integration tests via Vitest.


API Usage
This app uses the REST Countries v3.1 API:
•	Fetch all: GET https://restcountries.com/v3.1/all
•	Search by name: GET https://restcountries.com/v3.1/name/{name}
•	Filter by region: GET https://restcountries.com/v3.1/region/{region}
•	Filter by language: GET https://restcountries.com/v3.1/lang/{lang}
•	Get by code: GET https://restcountries.com/v3.1/alpha/{code}
The front end modules in src/api/countriesApi.js wrap these endpoints using Axios.
Application Structure
client/
├─ public/
├─ src/
│  ├─ api/                # Axios wrappers for REST Countries
│  ├─ components/         # Reusable UI components
│  │  ├─ CountryCard/
│  │  └─ SearchBar/
│  ├─ contexts/           # React Contexts (Auth, Favorites, ColorMode)
│  ├─ hooks/              # Custom hooks (e.g., useDebounce.js)
│  ├─ pages/              # Route components (Home, CountryDetails)
│  ├─ assets/             # Static assets (logo, icons)
│  ├─ App.jsx
│  ├─ main.jsx
│  └─ ...
└─ ..
Environment Variables
No private keys are required. If you need to override the API base URL:
1.	Create a .env file in client/.
2.	Add:
VITE_API_BASE_URL=https://restcountries.com/v3.1
Testing Documentation & Reporting
•	Unit Tests: located in src/_tests_ using Vitest & RTL.
•	Coverage: run npm run test -- --coverage to generate coverage reports.
•	Reporting: integration with CI can publish coverage badges.
License
MIT © Dumidu Rajapaksha

