import { useState } from 'react';
import type { AITool, PortfolioData } from '@/admin/types';
import { Plus, Edit2, Trash2, GripVertical, Eye, EyeOff, Check, X } from 'lucide-react';

interface AIToolsPageProps {
  data: PortfolioData;
  updateData: (updates: Partial<PortfolioData>) => void;
  addActivity: (action: string) => void;
}

const emptyTool: Omit<AITool, 'id' | 'order'> = {
  name: '',
  useCase: { en: '', ar: '' },
  icon: '',
  visible: true,
};

export default function AIToolsPage({ data, updateData, addActivity }: AIToolsPageProps) {
  const [tools, setTools] = useState(data.aiTools);
  const [editingTool, setEditingTool] = useState<AITool | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const openModal = (tool?: AITool) => {
    if (tool) {
      setEditingTool(tool);
    } else {
      setEditingTool({
        ...emptyTool,
        id: Date.now().toString(),
        order: tools.length,
      } as AITool);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingTool(null);
    setIsModalOpen(false);
  };

  const saveTool = () => {
    if (!editingTool) return;
    const existingIndex = tools.findIndex(t => t.id === editingTool.id);
    let newTools;
    if (existingIndex >= 0) {
      newTools = tools.map(t => t.id === editingTool.id ? editingTool : t);
    } else {
      newTools = [...tools, editingTool];
    }
    setTools(newTools);
    updateData({ aiTools: newTools });
    addActivity(existingIndex >= 0 ? `Updated AI tool "${editingTool.name}"` : `Added AI tool "${editingTool.name}"`);
    closeModal();
  };

  const deleteTool = (id: string) => {
    const tool = tools.find(t => t.id === id);
    const newTools = tools.filter(t => t.id !== id);
    setTools(newTools);
    updateData({ aiTools: newTools });
    if (tool) {
      addActivity(`Deleted AI tool "${tool.name}"`);
    }
    setDeleteConfirm(null);
  };

  const toggleVisibility = (id: string) => {
    const newTools = tools.map(t => 
      t.id === id ? { ...t, visible: !t.visible } : t
    );
    setTools(newTools);
    updateData({ aiTools: newTools });
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    const newTools = [...tools];
    const draggedTool = newTools[draggedIndex];
    newTools.splice(draggedIndex, 1);
    newTools.splice(index, 0, draggedTool);
    setDraggedIndex(index);
    setTools(newTools);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    updateData({ aiTools: tools });
    addActivity('Reordered AI tools');
  };

  return (
    <div className="slide-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="section-title">AI Tools</h1>
          <p className="section-subtitle">Manage your AI tools stack</p>
        </div>
        <button onClick={() => openModal()} className="luxury-btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add New Tool
        </button>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool, index) => (
          <div
            key={tool.id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
            className={`luxury-card p-4 ${
              draggedIndex === index ? 'border-[#c9a84c] opacity-50' : ''
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="drag-handle mt-1">
                <GripVertical className="w-5 h-5" />
              </div>
              <div className="w-12 h-12 rounded-xl bg-[#c9a84c]/10 flex items-center justify-center text-2xl flex-shrink-0">
                {tool.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-semibold text-[#f5f0e8]">{tool.name}</h3>
                <p className="text-sm text-[#6b6560] mt-1">{tool.useCase.en}</p>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => toggleVisibility(tool.id)}
                  className={`p-2 rounded-lg transition-all ${
                    tool.visible ? 'text-[#2ecc71]' : 'text-[#e74c3c]'
                  }`}
                >
                  {tool.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => openModal(tool)}
                  className="p-2 rounded-lg text-[#6b6560] hover:text-[#c9a84c] hover:bg-[rgba(201,168,76,0.1)] transition-all"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeleteConfirm(tool.id)}
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
      {isModalOpen && editingTool && (
        <div className="modal-overlay" onClick={closeModal}>
          <div 
            className="luxury-card w-full max-w-lg max-h-[90vh] overflow-y-auto mx-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-[#111111] p-6 border-b border-[#1e1e1e] flex items-center justify-between">
              <h2 className="text-2xl font-display font-semibold">
                {tools.find(t => t.id === editingTool.id) ? 'Edit Tool' : 'New Tool'}
              </h2>
              <button onClick={closeModal} className="p-2 hover:bg-[#1e1e1e] rounded-lg transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Icon */}
              <div>
                <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">Icon / Initial</label>
                <input
                  type="text"
                  value={editingTool.icon}
                  onChange={(e) => setEditingTool({ ...editingTool, icon: e.target.value })}
                  className="luxury-input w-full"
                  placeholder="💬 or single character"
                  maxLength={2}
                />
                <p className="text-xs text-[#6b6560] mt-1">Use an emoji or single character</p>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">Tool Name</label>
                <input
                  type="text"
                  value={editingTool.name}
                  onChange={(e) => setEditingTool({ ...editingTool, name: e.target.value })}
                  className="luxury-input w-full"
                  placeholder="ChatGPT, Midjourney, etc."
                />
              </div>

              {/* Use Case */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">Use Case (EN)</label>
                  <input
                    type="text"
                    value={editingTool.useCase.en}
                    onChange={(e) => setEditingTool({ ...editingTool, useCase: { ...editingTool.useCase, en: e.target.value } })}
                    className="luxury-input w-full"
                    placeholder="Brainstorming, design, etc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">(AR) حالة الاستخدام</label>
                  <input
                    type="text"
                    value={editingTool.useCase.ar}
                    onChange={(e) => setEditingTool({ ...editingTool, useCase: { ...editingTool.useCase, ar: e.target.value } })}
                    className="luxury-input w-full font-arabic text-right"
                    dir="rtl"
                  />
                </div>
              </div>

              {/* Visibility Toggle */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setEditingTool({ ...editingTool, visible: !editingTool.visible })}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    editingTool.visible ? 'bg-[#2ecc71]/20 text-[#2ecc71]' : 'bg-[#e74c3c]/20 text-[#e74c3c]'
                  }`}
                >
                  {editingTool.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  {editingTool.visible ? 'Visible' : 'Hidden'}
                </button>
              </div>
            </div>

            <div className="sticky bottom-0 bg-[#111111] p-6 border-t border-[#1e1e1e] flex justify-end gap-3">
              <button onClick={closeModal} className="luxury-btn-secondary">Cancel</button>
              <button onClick={saveTool} className="luxury-btn-primary flex items-center gap-2">
                <Check className="w-4 h-4" /> Save Tool
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
              <h3 className="text-xl font-display font-semibold">Delete Tool?</h3>
            </div>
            <p className="text-[#6b6560] mb-6">This action cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteConfirm(null)} className="luxury-btn-secondary">Cancel</button>
              <button onClick={() => deleteTool(deleteConfirm)} className="luxury-btn-danger">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
