import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import apiClient from './api/apiClient'; // API client import
import Config from './Config'; // apiUrl 추가
import { getAccessToken } from './utils/token';

const apiUrl = Config.apiUrl;
const token = getAccessToken();

// Simple function to return the API path
const getApiLoadPath = (lng, ns) => `${apiUrl}/console/i18n/${lng}/${ns}.json`;

// Fallback function for local loading
const getLocalLoadPath = (lng, ns) => `/locales/${lng}/${ns}.json`;

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    backend: {
      // Synchronous loadPath, try API and fall back to local if the API fails
      loadPath: (lng, ns) => {
        const apiPath = getApiLoadPath(lng, ns);

        return apiClient
          .get(apiPath, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => apiPath) // API success, return the API path
          .catch(() => getLocalLoadPath(lng, ns)); // API fails, return local path
      },
    },
    lng: 'ko', // 기본 언어 설정
    fallbackLng: 'ko',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;