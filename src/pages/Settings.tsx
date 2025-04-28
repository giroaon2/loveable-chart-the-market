
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Settings() {
  const { t, language, setLanguage } = useLanguage();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{t('settings')}</h1>
      <div className="space-y-4">
        <div className="p-4 border rounded-lg">
          <h2 className="text-lg font-semibold mb-2">{t('general_settings')}</h2>
          <p className="text-muted-foreground mb-4">{t('general_settings_desc')}</p>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('language')}</label>
            <Select value={language} onValueChange={(value: 'th' | 'en') => setLanguage(value)}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder={t('choose_language')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="th">ไทย</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
