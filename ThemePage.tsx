import { useState } from 'react';
import type { PortfolioData } from '@/admin/types';
import { Save, RefreshCw } from 'lucide-react';
import { defaultPortfolioData } from '@/admin/data/defaultData';

interface ThemePageProps {
  data: PortfolioData;
  updateData: (updates: Partial<PortfolioData>) => void;
  addActivity: (action: string) => void;
}

export default function ThemePage({ data, updateData, addActivity }: ThemePageProps) {
  const [theme, setTheme] = useState(data.theme);
  const [hasChanges, setHasChanges] = useState(false);

  const handleSave = () => {
    updateData({ theme });
    addActivity('Updated theme settings');
    setHasChanges(false);
  };

  const resetToDefaults = () => {
    setTheme(defaultPortfolioData.theme);
    setHasChanges(true);
  };

  const updateColor = (key: keyof typeof theme.colors, value: string) => {
    setTheme(prev => ({ ...prev, colors: { ...prev.colors, [key]: value } }));
    setHasChanges(true);
  };

  const colorFields = [
    { key: 'background', label: 'Background' },
    { key: 'surface', label: 'Surface' },
    { key: 'card', label: 'Card' },
    { key: 'border', label: 'Border' },
    { key: 'primary', label: 'Primary Accent' },
    { key: 'primaryHover', label: 'Accent Hover' },
    { key: 'textPrimary', label: 'Text Primary' },
    { key: 'textSecondary', label: 'Text Secondary' },
    { key: 'success', label: 'Success' },
    { key: 'danger', label: 'Danger' },
  ] as const;

  const fontOptions = {
    display: ['Cormorant Garamond', 'Playfair Display', 'Libre Baskerville', 'Bodoni Moda'],
    body: ['DM Sans', 'Inter', 'Lato', 'Nunito'],
    arabic: ['Tajawal', 'Cairo', 'Almarai', 'IBM Plex Arabic'],
  };

  return (
    <div className="slide-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="section-title">Theme & Colors</h1>
          <p className="section-subtitle">Customize your portfolio's visual identity</p>
        </div>
        <div className="flex gap-3">
          <button onClick={resetToDefaults} className="luxury-btn-secondary flex items-center gap-2">
            <RefreshCw className="w-4 h-4" /> Reset
          </button>
          <button onClick={handleSave} className="luxury-btn-primary flex items-center gap-2" disabled={!hasChanges}>
            <Save className="w-4 h-4" /> Save Theme
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          {/* Colors */}
          <div className="luxury-card p-6">
            <h3 className="text-lg font-display font-semibold mb-4">Color Palette</h3>
            <div className="grid grid-cols-2 gap-4">
              {colorFields.map(({ key, label }) => (
                <div key={key} className="flex items-center gap-3">
                  <div className="color-picker-card" style={{ backgroundColor: theme.colors[key] }}>
                    <input
                      type="color"
                      value={theme.colors[key]}
                      onChange={(e) => updateColor(key, e.target.value)}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-ui text-[#6b6560]">{label}</p>
                    <p className="text-xs font-mono text-[#f5f0e8]">{theme.colors[key]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Typography */}
          <div className="luxury-card p-6">
            <h3 className="text-lg font-display font-semibold mb-4">Typography</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">Display Font</label>
                <select
                  value={theme.typography.displayFont}
                  onChange={(e) => {
                    setTheme(prev => ({ ...prev, typography: { ...prev.typography, displayFont: e.target.value } }));
                    setHasChanges(true);
                  }}
                  className="luxury-input w-full"
                >
                  {fontOptions.display.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">Body Font</label>
                <select
                  value={theme.typography.bodyFont}
                  onChange={(e) => {
                    setTheme(prev => ({ ...prev, typography: { ...prev.typography, bodyFont: e.target.value } }));
                    setHasChanges(true);
                  }}
                  className="luxury-input w-full"
                >
                  {fontOptions.body.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">Arabic Font</label>
                <select
                  value={theme.typography.arabicFont}
                  onChange={(e) => {
                    setTheme(prev => ({ ...prev, typography: { ...prev.typography, arabicFont: e.target.value } }));
                    setHasChanges(true);
                  }}
                  className="luxury-input w-full"
                >
                  {fontOptions.arabic.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">Base Size: {theme.typography.baseSize}px</label>
                <input
                  type="range"
                  min={14}
                  max={18}
                  value={theme.typography.baseSize}
                  onChange={(e) => {
                    setTheme(prev => ({ ...prev, typography: { ...prev.typography, baseSize: parseInt(e.target.value) } }));
                    setHasChanges(true);
                  }}
                  className="w-full accent-[#c9a84c]"
                />
              </div>
            </div>
          </div>

          {/* Button Style */}
          <div className="luxury-card p-6">
            <h3 className="text-lg font-display font-semibold mb-4">Button Style</h3>
            <div className="flex gap-3 mb-4">
              {(['sharp', 'rounded', 'pill'] as const).map((style) => (
                <button
                  key={style}
                  onClick={() => {
                    setTheme(prev => ({ ...prev, buttonStyle: { style } }));
                    setHasChanges(true);
                  }}
                  className={`px-4 py-2 rounded-lg font-ui text-sm capitalize transition-all ${
                    theme.buttonStyle.style === style
                      ? 'bg-[#c9a84c] text-[#080808]'
                      : 'bg-[#0d0d0d] text-[#6b6560] hover:text-[#f5f0e8]'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
            <button
              className={`luxury-btn-primary ${
                theme.buttonStyle.style === 'sharp' ? 'rounded-none' :
                theme.buttonStyle.style === 'pill' ? 'rounded-full' : 'rounded-lg'
              }`}
            >
              Sample Button
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="luxury-card p-6 h-fit sticky top-8">
          <h3 className="text-lg font-display font-semibold mb-4">Live Preview</h3>
          <div 
            className="rounded-xl p-8 text-center transition-all duration-300"
            style={{ 
              backgroundColor: theme.colors.background,
              fontFamily: theme.typography.bodyFont,
              fontSize: `${theme.typography.baseSize}px`
            }}
          >
            <h1 
              className="text-4xl mb-4"
              style={{ 
                fontFamily: theme.typography.displayFont,
                color: theme.colors.primary 
              }}
            >
              Mohamed Saad
            </h1>
            <p style={{ color: theme.colors.textPrimary }}>Senior UX Designer</p>
            <p className="mt-2" style={{ color: theme.colors.textSecondary }}>
              Crafting digital experiences
            </p>
            <button
              className={`mt-6 px-6 py-3 font-ui text-sm uppercase tracking-wider transition-all ${
                theme.buttonStyle.style === 'sharp' ? 'rounded-none' :
                theme.buttonStyle.style === 'pill' ? 'rounded-full' : 'rounded-lg'
              }`}
              style={{ 
                backgroundColor: theme.colors.primary,
                color: theme.colors.background 
              }}
            >
              View My Work
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
