import { useState } from 'react';
import type { PortfolioData } from '@/admin/types';
import { Save, Eye, EyeOff } from 'lucide-react';

interface HeroAboutPageProps {
  data: PortfolioData;
  updateData: (updates: Partial<PortfolioData>) => void;
  addActivity: (action: string) => void;
}

export default function HeroAboutPage({ data, updateData, addActivity }: HeroAboutPageProps) {
  const [activeTab, setActiveTab] = useState<'hero' | 'about'>('hero');
  const [hero, setHero] = useState(data.hero);
  const [about, setAbout] = useState(data.about);
  const [hasChanges, setHasChanges] = useState(false);

  const handleSave = () => {
    updateData({ hero, about });
    addActivity(activeTab === 'hero' ? 'Updated Hero section' : 'Updated About section');
    setHasChanges(false);
  };

  const updateHero = (updates: Partial<typeof hero>) => {
    setHero(prev => ({ ...prev, ...updates }));
    setHasChanges(true);
  };

  const updateAbout = (updates: Partial<typeof about>) => {
    setAbout(prev => ({ ...prev, ...updates }));
    setHasChanges(true);
  };

  const updateStat = (index: number, field: 'value' | 'label', value: string, lang?: 'en' | 'ar') => {
    const newStats = [...about.stats];
    if (field === 'label' && lang) {
      newStats[index] = { ...newStats[index], label: { ...newStats[index].label, [lang]: value } };
    } else {
      newStats[index] = { ...newStats[index], [field]: value };
    }
    updateAbout({ stats: newStats });
  };

  return (
    <div className="slide-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="section-title">Hero & About</h1>
          <p className="section-subtitle">Manage your profile and introduction</p>
        </div>
        <button onClick={handleSave} className="luxury-btn-primary flex items-center gap-2" disabled={!hasChanges}>
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-8 border-b border-[#1e1e1e]">
        {(['hero', 'about'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-ui text-sm uppercase tracking-wider relative transition-all ${
              activeTab === tab ? 'text-[#c9a84c]' : 'text-[#6b6560] hover:text-[#f5f0e8]'
            }`}
          >
            {tab}
            {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c9a84c]" />}
          </button>
        ))}
      </div>

      {activeTab === 'hero' ? (
        <div className="space-y-6">
          {/* Full Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">Full Name (EN)</label>
              <input
                type="text"
                value={hero.fullName.en}
                onChange={(e) => updateHero({ fullName: { ...hero.fullName, en: e.target.value } })}
                className="luxury-input w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">(AR) الاسم الكامل</label>
              <input
                type="text"
                value={hero.fullName.ar}
                onChange={(e) => updateHero({ fullName: { ...hero.fullName, ar: e.target.value } })}
                className="luxury-input w-full font-arabic text-right"
                dir="rtl"
              />
            </div>
          </div>

          {/* Tagline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">Tagline (EN)</label>
              <input
                type="text"
                value={hero.tagline.en}
                onChange={(e) => updateHero({ tagline: { ...hero.tagline, en: e.target.value } })}
                className="luxury-input w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">(AR) العنوان</label>
              <input
                type="text"
                value={hero.tagline.ar}
                onChange={(e) => updateHero({ tagline: { ...hero.tagline, ar: e.target.value } })}
                className="luxury-input w-full font-arabic text-right"
                dir="rtl"
              />
            </div>
          </div>

          {/* Subline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">Subline / Descriptor (EN)</label>
              <textarea
                value={hero.subline.en}
                onChange={(e) => updateHero({ subline: { ...hero.subline, en: e.target.value } })}
                className="luxury-input w-full min-h-[100px]"
              />
            </div>
            <div>
              <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">(AR) الوصف</label>
              <textarea
                value={hero.subline.ar}
                onChange={(e) => updateHero({ subline: { ...hero.subline, ar: e.target.value } })}
                className="luxury-input w-full min-h-[100px] font-arabic text-right"
                dir="rtl"
              />
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="luxury-card p-6">
            <h3 className="text-lg font-display font-semibold mb-4">CTA Buttons</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">Button 1 (EN)</label>
                <input
                  type="text"
                  value={hero.cta1.en}
                  onChange={(e) => updateHero({ cta1: { ...hero.cta1, en: e.target.value } })}
                  className="luxury-input w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">(AR) الزر 1</label>
                <input
                  type="text"
                  value={hero.cta1.ar}
                  onChange={(e) => updateHero({ cta1: { ...hero.cta1, ar: e.target.value } })}
                  className="luxury-input w-full font-arabic text-right"
                  dir="rtl"
                />
              </div>
              <div>
                <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">Button 2 (EN)</label>
                <input
                  type="text"
                  value={hero.cta2.en}
                  onChange={(e) => updateHero({ cta2: { ...hero.cta2, en: e.target.value } })}
                  className="luxury-input w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">(AR) الزر 2</label>
                <input
                  type="text"
                  value={hero.cta2.ar}
                  onChange={(e) => updateHero({ cta2: { ...hero.cta2, ar: e.target.value } })}
                  className="luxury-input w-full font-arabic text-right"
                  dir="rtl"
                />
              </div>
            </div>
          </div>

          {/* Floating Tags */}
          <div className="luxury-card p-6">
            <h3 className="text-lg font-display font-semibold mb-4">Floating Tags</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">Tags (EN, comma-separated)</label>
                <input
                  type="text"
                  value={hero.floatingTags.en.join(', ')}
                  onChange={(e) => updateHero({ floatingTags: { ...hero.floatingTags, en: e.target.value.split(',').map(t => t.trim()).filter(Boolean) } })}
                  className="luxury-input w-full"
                  placeholder="UX Design, Fintech, Design Systems"
                />
              </div>
              <div>
                <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">(AR) الوسوم</label>
                <input
                  type="text"
                  value={hero.floatingTags.ar.join(', ')}
                  onChange={(e) => updateHero({ floatingTags: { ...hero.floatingTags, ar: e.target.value.split(',').map(t => t.trim()).filter(Boolean) } })}
                  className="luxury-input w-full font-arabic text-right"
                  dir="rtl"
                />
              </div>
            </div>
          </div>

          {/* Visibility Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => updateHero({ visible: !hero.visible })}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                hero.visible ? 'bg-[#2ecc71]/20 text-[#2ecc71]' : 'bg-[#e74c3c]/20 text-[#e74c3c]'
              }`}
            >
              {hero.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              <span className="font-ui text-sm">{hero.visible ? 'Visible' : 'Hidden'}</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Headline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">Headline (EN)</label>
              <input
                type="text"
                value={about.headline.en}
                onChange={(e) => updateAbout({ headline: { ...about.headline, en: e.target.value } })}
                className="luxury-input w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">(AR) العنوان</label>
              <input
                type="text"
                value={about.headline.ar}
                onChange={(e) => updateAbout({ headline: { ...about.headline, ar: e.target.value } })}
                className="luxury-input w-full font-arabic text-right"
                dir="rtl"
              />
            </div>
          </div>

          {/* Body */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">Body (EN)</label>
              <textarea
                value={about.body.en}
                onChange={(e) => updateAbout({ body: { ...about.body, en: e.target.value } })}
                className="luxury-input w-full min-h-[150px]"
              />
            </div>
            <div>
              <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">(AR) المحتوى</label>
              <textarea
                value={about.body.ar}
                onChange={(e) => updateAbout({ body: { ...about.body, ar: e.target.value } })}
                className="luxury-input w-full min-h-[150px] font-arabic text-right"
                dir="rtl"
              />
            </div>
          </div>

          {/* Photo */}
          <div className="luxury-card p-6">
            <h3 className="text-lg font-display font-semibold mb-4">Profile Photo</h3>
            <div className="flex items-center gap-4">
              <img
                src={about.photoUrl}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border-2 border-[#1e1e1e]"
              />
              <div className="flex-1">
                <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">Photo URL</label>
                <input
                  type="text"
                  value={about.photoUrl}
                  onChange={(e) => updateAbout({ photoUrl: e.target.value })}
                  className="luxury-input w-full"
                />
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="luxury-card p-6">
            <h3 className="text-lg font-display font-semibold mb-4">Stats</h3>
            <div className="space-y-4">
              {about.stats.map((stat, index) => (
                <div key={index} className="grid grid-cols-3 gap-4 items-center">
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) => updateStat(index, 'value', e.target.value)}
                    className="luxury-input"
                    placeholder="Value (e.g. 8+)"
                  />
                  <input
                    type="text"
                    value={stat.label.en}
                    onChange={(e) => updateStat(index, 'label', e.target.value, 'en')}
                    className="luxury-input"
                    placeholder="Label EN"
                  />
                  <input
                    type="text"
                    value={stat.label.ar}
                    onChange={(e) => updateStat(index, 'label', e.target.value, 'ar')}
                    className="luxury-input font-arabic text-right"
                    dir="rtl"
                    placeholder="التسمية AR"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Visibility Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => updateAbout({ visible: !about.visible })}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                about.visible ? 'bg-[#2ecc71]/20 text-[#2ecc71]' : 'bg-[#e74c3c]/20 text-[#e74c3c]'
              }`}
            >
              {about.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              <span className="font-ui text-sm">{about.visible ? 'Visible' : 'Hidden'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
