// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        "home": "Home",
        "more_info": "More Info",
        "nutrition_map": "Nutrition Map",
        "language": "Language"
      }
    },
    ar: {
      translation: {
        "home": "الرئيسية",
        "more_info": "مزيد من المعلومات",
        "nutrition_map": "خريطة التغذية",
        "language": "اللغة"
      }
    },
    es: {
      translation: {
        "home": "Inicio",
        "more_info": "Más información",
        "nutrition_map": "Mapa de nutrición",
        "language": "Idioma"
      }
    },
    zh: {
      translation: {
        "home": "主页",
        "more_info": "更多信息",
        "nutrition_map": "营养地图",
        "language": "语言"
      }
    },
    ja: {
      translation: {
        "home": "ホーム",
        "more_info": "詳細情報",
        "nutrition_map": "栄養マップ",
        "language": "言語"
      }
    },
    ko: {
      translation: {
        "home": "홈",
        "more_info": "추가 정보",
        "nutrition_map": "영양 지도",
        "language": "언어"
      }
    },
    ru: {
      translation: {
        "home": "Главная",
        "more_info": "Подробнее",
        "nutrition_map": "Карта питания",
        "language": "Язык"
      }
    },
    fr: {
      translation: {
        "home": "Accueil",
        "more_info": "Plus d'infos",
        "nutrition_map": "Carte de nutrition",
        "language": "Langue"
      }
    }
  },
  lng: 'en', // default language
  fallbackLng: 'en', // fallback language if translation is not available
  interpolation: {
    escapeValue: false // react already safeguards against XSS
  }
});

export default i18n;
