
import React, { createContext, useContext, useState } from 'react';

type Language = 'th' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  th: {
    "home": "หน้าหลัก",
    "settings": "ตั้งค่า",
    "menu": "เมนู",
    "general_settings": "การตั้งค่าทั่วไป",
    "general_settings_desc": "ตั้งค่าการใช้งานทั่วไปของแอพพลิเคชั่น",
    "language": "ภาษา",
    "choose_language": "เลือกภาษา",
    "market_overview": "ภาพรวมตลาด",
    "top_performers": "หุ้นที่มีประสิทธิภาพสูงสุด",
    "market_activity": "กิจกรรมตลาด",
    "last_updated": "อัพเดทล่าสุด",
    "search_stock": "ค้นหาหุ้น..."
  },
  en: {
    "home": "Home",
    "settings": "Settings",
    "menu": "Menu",
    "general_settings": "General Settings",
    "general_settings_desc": "Configure general application settings",
    "language": "Language",
    "choose_language": "Choose Language",
    "market_overview": "Market Overview",
    "top_performers": "Top Performers",
    "market_activity": "Market Activity",
    "last_updated": "Last updated",
    "search_stock": "Search for a stock..."
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('th');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
