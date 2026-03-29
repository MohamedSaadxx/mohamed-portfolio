import { useState, useRef } from 'react';
import type { PortfolioData } from '@/admin/types';
import { Download, Upload, AlertTriangle, RefreshCw, Check, Lock, Globe, Moon, LogOut } from 'lucide-react';

interface SettingsPageProps {
  data: PortfolioData;
  updateData: (updates: Partial<PortfolioData>) => void;
  addActivity: (action: string) => void;
  onLogout: () => void;
  exportData: () => void;
  importData: (json: string) => boolean;
  resetToDefaults: () => void;
}

export default function SettingsPage({ 
  data, 
  updateData, 
  addActivity, 
  onLogout, 
  exportData, 
  importData, 
  resetToDefaults 
}: SettingsPageProps) {
  const [currentPIN, setCurrentPIN] = useState('');
  const [newPIN, setNewPIN] = useState('');
  [newPIN];
  const [confirmPIN, setConfirmPIN] = useState('');
  const [pinError, setPinError] = useState('');
  const [pinSuccess, setPinSuccess] = useState(false);
  const [resetConfirmText, setResetConfirmText] = useState('');
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpdatePIN = () => {
    setPinError('');
    setPinSuccess(false);

    if (currentPIN !== data.settings.pin) {
      setPinError('Current PIN is incorrect');
      return;
    }

    if (newPIN.length !== 4 || !/^\d{4}$/.test(newPIN)) {
      setPinError('New PIN must be 4 digits');
      return;
    }

    if (newPIN !== confirmPIN) {
      setPinError('New PINs do not match');
      return;
    }

    updateData({
      settings: { ...data.settings, pin: newPIN }
    });
    addActivity('Updated PIN');
    setPinSuccess(true);
    setCurrentPIN('');
    setNewPIN('');
    setConfirmPIN('');
    setTimeout(() => setPinSuccess(false), 3000);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (importData(content)) {
        addActivity('Imported data from JSON');
        alert('Data imported successfully!');
      } else {
        alert('Failed to import data. Please check the file format.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleReset = () => {
    if (resetConfirmText === 'RESET') {
      resetToDefaults();
      setShowResetConfirm(false);
      setResetConfirmText('');
      alert('All content has been reset to defaults.');
    }
  };

  const sessionStart = new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="slide-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="section-title">Settings</h1>
          <p className="section-subtitle">Manage your admin panel settings</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* PIN Management */}
        <div className="luxury-card p-6">
          <h3 className="text-lg font-display font-semibold mb-6 flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#c9a84c]" /> PIN Management
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">Current PIN</label>
              <input
                type="password"
                value={currentPIN}
                onChange={(e) => setCurrentPIN(e.target.value.replace(/\D/g, '').slice(0, 4))}
                className="luxury-input w-full"
                placeholder="••••"
                maxLength={4}
              />
            </div>

            <div>
              <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">New PIN (4 digits)</label>
              <input
                type="password"
                value={newPIN}
                onChange={(e) => setNewPIN(e.target.value.replace(/\D/g, '').slice(0, 4))}
                className="luxury-input w-full"
                placeholder="••••"
                maxLength={4}
              />
            </div>

            <div>
              <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">Confirm New PIN</label>
              <input
                type="password"
                value={confirmPIN}
                onChange={(e) => setConfirmPIN(e.target.value.replace(/\D/g, '').slice(0, 4))}
                className="luxury-input w-full"
                placeholder="••••"
                maxLength={4}
              />
            </div>

            {pinError && (
              <p className="text-[#e74c3c] text-sm font-ui">{pinError}</p>
            )}

            {pinSuccess && (
              <p className="text-[#2ecc71] text-sm font-ui flex items-center gap-1">
                <Check className="w-4 h-4" /> PIN updated successfully
              </p>
            )}

            <button onClick={handleUpdatePIN} className="luxury-btn-primary w-full">
              Update PIN
            </button>
          </div>
        </div>

        {/* Language & Site Settings */}
        <div className="luxury-card p-6">
          <h3 className="text-lg font-display font-semibold mb-6 flex items-center gap-2">
            <Globe className="w-5 h-5 text-[#c9a84c]" /> Site Settings
          </h3>
          
          <div className="space-y-6">
            {/* Default Language */}
            <div>
              <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-3">
                Default Language
              </label>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    updateData({ settings: { ...data.settings, defaultLanguage: 'en' } });
                    addActivity('Changed default language to English');
                  }}
                  className={`flex-1 px-4 py-3 rounded-lg font-ui text-sm transition-all ${
                    data.settings.defaultLanguage === 'en'
                      ? 'bg-[#c9a84c] text-[#080808]'
                      : 'bg-[#0d0d0d] text-[#6b6560] hover:text-[#f5f0e8]'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => {
                    updateData({ settings: { ...data.settings, defaultLanguage: 'ar' } });
                    addActivity('Changed default language to Arabic');
                  }}
                  className={`flex-1 px-4 py-3 rounded-lg font-ui text-sm transition-all ${
                    data.settings.defaultLanguage === 'ar'
                      ? 'bg-[#c9a84c] text-[#080808]'
                      : 'bg-[#0d0d0d] text-[#6b6560] hover:text-[#f5f0e8]'
                  }`}
                >
                  العربية
                </button>
              </div>
            </div>

            {/* Maintenance Mode */}
            <div>
              <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-3">
                Site Visibility
              </label>
              <button
                onClick={() => {
                  updateData({ settings: { ...data.settings, maintenanceMode: !data.settings.maintenanceMode } });
                  addActivity(data.settings.maintenanceMode ? 'Disabled maintenance mode' : 'Enabled maintenance mode');
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  data.settings.maintenanceMode
                    ? 'bg-[#e74c3c]/20 text-[#e74c3c]'
                    : 'bg-[#2ecc71]/20 text-[#2ecc71]'
                }`}
              >
                <Moon className="w-5 h-5" />
                <span className="font-ui text-sm">
                  {data.settings.maintenanceMode ? 'Maintenance Mode ON' : 'Site is Live'}
                </span>
              </button>
              <p className="text-xs text-[#6b6560] mt-2">
                {data.settings.maintenanceMode 
                  ? 'Visitors will see a "Coming Soon" page' 
                  : 'Your portfolio is visible to the public'}
              </p>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="luxury-card p-6">
          <h3 className="text-lg font-display font-semibold mb-6 flex items-center gap-2">
            <Download className="w-5 h-5 text-[#c9a84c]" /> Data Management
          </h3>
          
          <div className="space-y-4">
            <button onClick={exportData} className="luxury-btn-secondary w-full flex items-center justify-center gap-2">
              <Download className="w-4 h-4" /> Export All Data as JSON
            </button>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImport}
              accept=".json"
              className="hidden"
            />
            <button 
              onClick={() => fileInputRef.current?.click()} 
              className="luxury-btn-secondary w-full flex items-center justify-center gap-2"
            >
              <Upload className="w-4 h-4" /> Import Data from JSON
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="luxury-card p-6 border-[#e74c3c]/30">
          <h3 className="text-lg font-display font-semibold mb-6 flex items-center gap-2 text-[#e74c3c]">
            <AlertTriangle className="w-5 h-5" /> Danger Zone
          </h3>
          
          <div className="space-y-4">
            <button 
              onClick={() => setShowResetConfirm(true)} 
              className="luxury-btn-danger w-full flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" /> Reset All Content to Defaults
            </button>
            <p className="text-xs text-[#6b6560]">
              This will erase all your custom content and restore the default data.
            </p>
          </div>
        </div>

        {/* Session */}
        <div className="luxury-card p-6">
          <h3 className="text-lg font-display font-semibold mb-6 flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#c9a84c]" /> Session
          </h3>
          
          <div className="space-y-4">
            <p className="text-sm text-[#6b6560]">
              Logged in since: <span className="text-[#f5f0e8]">{sessionStart}</span>
            </p>
            <button onClick={onLogout} className="luxury-btn-danger w-full flex items-center justify-center gap-2">
              <LogOut className="w-4 h-4" /> Log Out
            </button>
          </div>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="modal-overlay" onClick={() => setShowResetConfirm(false)}>
          <div className="luxury-card p-8 max-w-md w-full mx-4 border-[#e74c3c]/30" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-[#e74c3c]" />
              <h3 className="text-xl font-display font-semibold text-[#e74c3c]">Reset Everything?</h3>
            </div>
            <p className="text-[#6b6560] mb-4">
              This will delete all your custom content and restore default data. This action cannot be undone.
            </p>
            <div className="mb-4">
              <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">
                Type "RESET" to confirm
              </label>
              <input
                type="text"
                value={resetConfirmText}
                onChange={(e) => setResetConfirmText(e.target.value)}
                className="luxury-input w-full"
                placeholder="RESET"
              />
            </div>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setShowResetConfirm(false)} className="luxury-btn-secondary">Cancel</button>
              <button 
                onClick={handleReset} 
                className="luxury-btn-danger"
                disabled={resetConfirmText !== 'RESET'}
              >
                Yes, Reset Everything
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
