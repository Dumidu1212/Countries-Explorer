// api/countriesApi.js
import axios from 'axios';

const BASE = 'https://restcountries.com/v3.1';

export const fetchAllCountries       = () => axios.get(`${BASE}/all`).then(r => r.data);
export const fetchCountriesByName    = (n) => axios.get(`${BASE}/name/${n}`).then(r => r.data);
export const fetchCountriesByRegion  = (r) => axios.get(`${BASE}/region/${r}`).then(r => r.data);
export const fetchCountriesByLanguage= (l) => axios.get(`${BASE}/lang/${l}`).then(r => r.data);
export const fetchCountryByCode      = (c) => axios.get(`${BASE}/alpha/${c}`).then(r => r.data);
