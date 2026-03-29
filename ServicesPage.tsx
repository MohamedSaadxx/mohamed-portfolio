import { useState } from 'react';
import type { Service, PortfolioData } from '@/admin/types';
import { Plus, Edit2, Trash2, GripVertical, Eye, EyeOff, Check, X } from 'lucide-react';

interface ServicesPageProps {
  data: PortfolioData;
  updateData: (updates: Partial<PortfolioData>) => void;
  addActivity: (action: string) => void;
}

const emptyService: Omit<Service, 'id' | 'order'> = {
  icon: '',
  title: { en: '', ar: '' },
  description: { en: '', ar: '' },
  visible: true,
};

export default function ServicesPage({ data, updateData, addActivity }: ServicesPageProps) {
  const [services, setServices] = useState(data.services);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const openModal = (service?: Service) => {
    if (service) {
      setEditingService(service);
    } else {
      setEditingService({
        ...emptyService,
        id: Date.now().toString(),
        order: services.length,
      } as Service);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingService(null);
    setIsModalOpen(false);
  };

  const saveService = () => {
    if (!editingService) return;
    const existingIndex = services.findIndex(s => s.id === editingService.id);
    let newServices;
    if (existingIndex >= 0) {
      newServices = services.map(s => s.id === editingService.id ? editingService : s);
    } else {
      newServices = [...services, editingService];
    }
    setServices(newServices);
    updateData({ services: newServices });
    addActivity(existingIndex >= 0 ? `Updated service "${editingService.title.en}"` : `Added service "${editingService.title.en}"`);
    closeModal();
  };

  const deleteService = (id: string) => {
    const service = services.find(s => s.id === id);
    const newServices = services.filter(s => s.id !== id);
    setServices(newServices);
    updateData({ services: newServices });
    if (service) {
      addActivity(`Deleted service "${service.title.en}"`);
    }
    setDeleteConfirm(null);
  };

  const toggleVisibility = (id: string) => {
    const newServices = services.map(s => 
      s.id === id ? { ...s, visible: !s.visible } : s
    );
    setServices(newServices);
    updateData({ services: newServices });
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    const newServices = [...services];
    const draggedService = newServices[draggedIndex];
    newServices.splice(draggedIndex, 1);
    newServices.splice(index, 0, draggedService);
    setDraggedIndex(index);
    setServices(newServices);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    updateData({ services });
    addActivity('Reordered services');
  };

  return (
    <div className="slide-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="section-title">Services</h1>
          <p className="section-subtitle">Manage your offered services</p>
        </div>
        <button onClick={() => openModal()} className="luxury-btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add New Service
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service, index) => (
          <div
            key={service.id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
            className={`luxury-card p-6 ${
              draggedIndex === index ? 'border-[#c9a84c] opacity-50' : ''
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="drag-handle mt-1">
                <GripVertical className="w-5 h-5" />
              </div>
              <div className="w-14 h-14 rounded-xl bg-[#c9a84c]/10 flex items-center justify-center text-2xl flex-shrink-0">
                {service.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-semibold text-[#f5f0e8] text-lg">{service.title.en}</h3>
                <p className="text-sm text-[#6b6560] mt-2 line-clamp-2">{service.description.en}</p>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => toggleVisibility(service.id)}
                  className={`p-2 rounded-lg transition-all ${
                    service.visible ? 'text-[#2ecc71]' : 'text-[#e74c3c]'
                  }`}
                >
                  {service.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => openModal(service)}
                  className="p-2 rounded-lg text-[#6b6560] hover:text-[#c9a84c] hover:bg-[rgba(201,168,76,0.1)] transition-all"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeleteConfirm(service.id)}
                  className="p-2 rounded-lg text-[#6b6560] hover:text-[#e74c3c] hover:bg-[rgba(231,76,60,0.1)] transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {isModalOpen && editingService && (
        <div className="modal-overlay" onClick={closeModal}>
          <div 
            className="luxury-card w-full max-w-lg max-h-[90vh] overflow-y-auto mx-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-[#111111] p-6 border-b border-[#1e1e1e] flex items-center justify-between">
              <h2 className="text-2xl font-display font-semibold">
                {services.find(s => s.id === editingService.id) ? 'Edit Service' : 'New Service'}
              </h2>
              <button onClick={closeModal} className="p-2 hover:bg-[#1e1e1e] rounded-lg transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Icon */}
              <div>
                <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">Icon / Symbol</label>
                <input
                  type="text"
                  value={editingService.icon}
                  onChange={(e) => setEditingService({ ...editingService, icon: e.target.value })}
                  className="luxury-input w-full"
                  placeholder="🎨 or single character"
                  maxLength={2}
                />
                <p className="text-xs text-[#6b6560] mt-1">Use an emoji or single character</p>
              </div>

              {/* Title */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">Title (EN)</label>
                  <input
                    type="text"
                    value={editingService.title.en}
                    onChange={(e) => setEditingService({ ...editingService, title: { ...editingService.title, en: e.target.value } })}
                    className="luxury-input w-full"
                    placeholder="UX Design, etc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">(AR) العنوان</label>
                  <input
                    type="text"
                    value={editingService.title.ar}
                    onChange={(e) => setEditingService({ ...editingService, title: { ...editingService.title, ar: e.target.value } })}
                    className="luxury-input w-full font-arabic text-right"
                    dir="rtl"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">Description (EN)</label>
                  <textarea
                    value={editingService.description.en}
                    onChange={(e) => setEditingService({ ...editingService, description: { ...editingService.description, en: e.target.value } })}
                    className="luxury-input w-full min-h-[100px]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">(AR) الوصف</label>
                  <textarea
                    value={editingService.description.ar}
                    onChange={(e) => setEditingService({ ...editingService, description: { ...editingService.description, ar: e.target.value } })}
                    className="luxury-input w-full min-h-[100px] font-arabic text-right"
                    dir="rtl"
                  />
                </div>
              </div>

              {/* Visibility Toggle */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setEditingService({ ...editingService, visible: !editingService.visible })}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    editingService.visible ? 'bg-[#2ecc71]/20 text-[#2ecc71]' : 'bg-[#e74c3c]/20 text-[#e74c3c]'
                  }`}
                >
                  {editingService.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  {editingService.visible ? 'Visible' : 'Hidden'}
                </button>
              </div>
            </div>

            <div className="sticky bottom-0 bg-[#111111] p-6 border-t border-[#1e1e1e] flex justify-end gap-3">
              <button onClick={closeModal} className="luxury-btn-secondary">Cancel</button>
              <button onClick={saveService} className="luxury-btn-primary flex items-center gap-2">
                <Check className="w-4 h-4" /> Save Service
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="luxury-card p-8 max-w-md w-full mx-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <Trash2 className="w-6 h-6 text-[#e74c3c]" />
              <h3 className="text-xl font-display font-semibold">Delete Service?</h3>
            </div>
            <p className="text-[#6b6560] mb-6">This action cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteConfirm(null)} className="luxury-btn-secondary">Cancel</button>
              <button onClick={() => deleteService(deleteConfirm)} className="luxury-btn-danger">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
