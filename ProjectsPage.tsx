import { useState } from 'react';
import type { Project, PortfolioData } from '@/admin/types';
import { Plus, Edit2, Trash2, GripVertical, Eye, EyeOff, Star, X, Check } from 'lucide-react';

interface ProjectsPageProps {
  data: PortfolioData;
  updateData: (updates: Partial<PortfolioData>) => void;
  addActivity: (action: string) => void;
}

const emptyProject: Omit<Project, 'id' | 'order'> = {
  title: { en: '', ar: '' },
  category: { en: '', ar: '' },
  summary: { en: '', ar: '' },
  problem: { en: '', ar: '' },
  process: { en: '', ar: '' },
  solution: { en: '', ar: '' },
  outcome: { en: '', ar: '' },
  coverImage: '',
  tags: [],
  caseStudyLink: '',
  featured: false,
  hidden: false,
};

export default function ProjectsPage({ data, updateData, addActivity }: ProjectsPageProps) {
  const [projects, setProjects] = useState(data.projects);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const openModal = (project?: Project) => {
    if (project) {
      setEditingProject(project);
    } else {
      setEditingProject({
        ...emptyProject,
        id: Date.now().toString(),
        order: projects.length,
      } as Project);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingProject(null);
    setIsModalOpen(false);
  };

  const saveProject = () => {
    if (!editingProject) return;
    const existingIndex = projects.findIndex(p => p.id === editingProject.id);
    let newProjects;
    if (existingIndex >= 0) {
      newProjects = projects.map(p => p.id === editingProject.id ? editingProject : p);
    } else {
      newProjects = [...projects, editingProject];
    }
    setProjects(newProjects);
    updateData({ projects: newProjects });
    addActivity(existingIndex >= 0 ? `Updated project "${editingProject.title.en}"` : `Added project "${editingProject.title.en}"`);
    closeModal();
  };

  const deleteProject = (id: string) => {
    const project = projects.find(p => p.id === id);
    const newProjects = projects.filter(p => p.id !== id);
    setProjects(newProjects);
    updateData({ projects: newProjects });
    if (project) {
      addActivity(`Deleted project "${project.title.en}"`);
    }
    setDeleteConfirm(null);
  };

  const toggleVisibility = (id: string) => {
    const newProjects = projects.map(p => 
      p.id === id ? { ...p, hidden: !p.hidden } : p
    );
    setProjects(newProjects);
    updateData({ projects: newProjects });
  };

  const toggleFeatured = (id: string) => {
    const newProjects = projects.map(p => 
      p.id === id ? { ...p, featured: !p.featured } : p
    );
    setProjects(newProjects);
    updateData({ projects: newProjects });
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    const newProjects = [...projects];
    const draggedProject = newProjects[draggedIndex];
    newProjects.splice(draggedIndex, 1);
    newProjects.splice(index, 0, draggedProject);
    setDraggedIndex(index);
    setProjects(newProjects);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    updateData({ projects });
    addActivity('Reordered projects');
  };

  return (
    <div className="slide-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="section-title">Projects</h1>
          <p className="section-subtitle">Manage your portfolio projects</p>
        </div>
        <button onClick={() => openModal()} className="luxury-btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add New Project
        </button>
      </div>

      {/* Projects List */}
      <div className="space-y-3">
        {projects.map((project, index) => (
          <div
            key={project.id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
            className={`luxury-card p-4 flex items-center gap-4 ${
              draggedIndex === index ? 'border-[#c9a84c] opacity-50' : ''
            }`}
          >
            <div className="drag-handle">
              <GripVertical className="w-5 h-5" />
            </div>
            <img
              src={project.coverImage || 'https://via.placeholder.com/80x60'}
              alt={project.title.en}
              className="w-20 h-14 object-cover rounded-lg"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-display font-semibold text-[#f5f0e8] truncate">{project.title.en}</h3>
              <p className="text-sm text-[#6b6560] truncate">{project.summary.en}</p>
            </div>
            <span className="px-3 py-1 bg-[#0d0d0d] rounded-full text-xs font-ui text-[#6b6560]">
              {project.category.en}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleFeatured(project.id)}
                className={`p-2 rounded-lg transition-all ${
                  project.featured ? 'text-[#c9a84c] bg-[rgba(201,168,76,0.1)]' : 'text-[#6b6560] hover:text-[#f5f0e8]'
                }`}
                title="Featured"
              >
                <Star className="w-4 h-4" />
              </button>
              <button
                onClick={() => toggleVisibility(project.id)}
                className={`p-2 rounded-lg transition-all ${
                  project.hidden ? 'text-[#e74c3c]' : 'text-[#2ecc71]'
                }`}
                title={project.hidden ? 'Hidden' : 'Visible'}
              >
                {project.hidden ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              <button
                onClick={() => openModal(project)}
                className="p-2 rounded-lg text-[#6b6560] hover:text-[#c9a84c] hover:bg-[rgba(201,168,76,0.1)] transition-all"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDeleteConfirm(project.id)}
                className="p-2 rounded-lg text-[#6b6560] hover:text-[#e74c3c] hover:bg-[rgba(231,76,60,0.1)] transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {isModalOpen && editingProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <div 
            className="luxury-card w-full max-w-4xl max-h-[90vh] overflow-y-auto mx-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-[#111111] p-6 border-b border-[#1e1e1e] flex items-center justify-between">
              <h2 className="text-2xl font-display font-semibold">
                {projects.find(p => p.id === editingProject.id) ? 'Edit Project' : 'New Project'}
              </h2>
              <button onClick={closeModal} className="p-2 hover:bg-[#1e1e1e] rounded-lg transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Title */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">Title (EN)</label>
                  <input
                    type="text"
                    value={editingProject.title.en}
                    onChange={(e) => setEditingProject({ ...editingProject, title: { ...editingProject.title, en: e.target.value } })}
                    className="luxury-input w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">(AR) العنوان</label>
                  <input
                    type="text"
                    value={editingProject.title.ar}
                    onChange={(e) => setEditingProject({ ...editingProject, title: { ...editingProject.title, ar: e.target.value } })}
                    className="luxury-input w-full font-arabic text-right"
                    dir="rtl"
                  />
                </div>
              </div>

              {/* Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">Category (EN)</label>
                  <input
                    type="text"
                    value={editingProject.category.en}
                    onChange={(e) => setEditingProject({ ...editingProject, category: { ...editingProject.category, en: e.target.value } })}
                    className="luxury-input w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">(AR) الفئة</label>
                  <input
                    type="text"
                    value={editingProject.category.ar}
                    onChange={(e) => setEditingProject({ ...editingProject, category: { ...editingProject.category, ar: e.target.value } })}
                    className="luxury-input w-full font-arabic text-right"
                    dir="rtl"
                  />
                </div>
              </div>

              {/* Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">Summary (EN)</label>
                  <textarea
                    value={editingProject.summary.en}
                    onChange={(e) => setEditingProject({ ...editingProject, summary: { ...editingProject.summary, en: e.target.value } })}
                    className="luxury-input w-full min-h-[80px]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">(AR) الملخص</label>
                  <textarea
                    value={editingProject.summary.ar}
                    onChange={(e) => setEditingProject({ ...editingProject, summary: { ...editingProject.summary, ar: e.target.value } })}
                    className="luxury-input w-full min-h-[80px] font-arabic text-right"
                    dir="rtl"
                  />
                </div>
              </div>

              {/* Problem */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">Problem (EN)</label>
                  <textarea
                    value={editingProject.problem.en}
                    onChange={(e) => setEditingProject({ ...editingProject, problem: { ...editingProject.problem, en: e.target.value } })}
                    className="luxury-input w-full min-h-[80px]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">(AR) المشكلة</label>
                  <textarea
                    value={editingProject.problem.ar}
                    onChange={(e) => setEditingProject({ ...editingProject, problem: { ...editingProject.problem, ar: e.target.value } })}
                    className="luxury-input w-full min-h-[80px] font-arabic text-right"
                    dir="rtl"
                  />
                </div>
              </div>

              {/* Process */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">Process (EN)</label>
                  <textarea
                    value={editingProject.process.en}
                    onChange={(e) => setEditingProject({ ...editingProject, process: { ...editingProject.process, en: e.target.value } })}
                    className="luxury-input w-full min-h-[80px]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">(AR) العملية</label>
                  <textarea
                    value={editingProject.process.ar}
                    onChange={(e) => setEditingProject({ ...editingProject, process: { ...editingProject.process, ar: e.target.value } })}
                    className="luxury-input w-full min-h-[80px] font-arabic text-right"
                    dir="rtl"
                  />
                </div>
              </div>

              {/* Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">Solution (EN)</label>
                  <textarea
                    value={editingProject.solution.en}
                    onChange={(e) => setEditingProject({ ...editingProject, solution: { ...editingProject.solution, en: e.target.value } })}
                    className="luxury-input w-full min-h-[80px]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">(AR) الحل</label>
                  <textarea
                    value={editingProject.solution.ar}
                    onChange={(e) => setEditingProject({ ...editingProject, solution: { ...editingProject.solution, ar: e.target.value } })}
                    className="luxury-input w-full min-h-[80px] font-arabic text-right"
                    dir="rtl"
                  />
                </div>
              </div>

              {/* Outcome */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">Outcome (EN)</label>
                  <textarea
                    value={editingProject.outcome.en}
                    onChange={(e) => setEditingProject({ ...editingProject, outcome: { ...editingProject.outcome, en: e.target.value } })}
                    className="luxury-input w-full min-h-[80px]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">(AR) النتيجة</label>
                  <textarea
                    value={editingProject.outcome.ar}
                    onChange={(e) => setEditingProject({ ...editingProject, outcome: { ...editingProject.outcome, ar: e.target.value } })}
                    className="luxury-input w-full min-h-[80px] font-arabic text-right"
                    dir="rtl"
                  />
                </div>
              </div>

              {/* Cover Image */}
              <div>
                <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">Cover Image URL</label>
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={editingProject.coverImage}
                    onChange={(e) => setEditingProject({ ...editingProject, coverImage: e.target.value })}
                    className="luxury-input flex-1"
                  />
                  {editingProject.coverImage && (
                    <img
                      src={editingProject.coverImage}
                      alt="Preview"
                      className="w-20 h-14 object-cover rounded-lg"
                    />
                  )}
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={editingProject.tags.join(', ')}
                  onChange={(e) => setEditingProject({ ...editingProject, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })}
                  className="luxury-input w-full"
                  placeholder="UX Design, Fintech, Mobile App"
                />
              </div>

              {/* Case Study Link */}
              <div>
                <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">Case Study Link</label>
                <input
                  type="text"
                  value={editingProject.caseStudyLink}
                  onChange={(e) => setEditingProject({ ...editingProject, caseStudyLink: e.target.value })}
                  className="luxury-input w-full"
                  placeholder="https://..."
                />
              </div>

              {/* Toggles */}
              <div className="flex gap-4">
                <button
                  onClick={() => setEditingProject({ ...editingProject, featured: !editingProject.featured })}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    editingProject.featured ? 'bg-[#c9a84c]/20 text-[#c9a84c]' : 'bg-[#1e1e1e] text-[#6b6560]'
                  }`}
                >
                  <Star className="w-4 h-4" /> Featured
                </button>
                <button
                  onClick={() => setEditingProject({ ...editingProject, hidden: !editingProject.hidden })}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    editingProject.hidden ? 'bg-[#e74c3c]/20 text-[#e74c3c]' : 'bg-[#2ecc71]/20 text-[#2ecc71]'
                  }`}
                >
                  {editingProject.hidden ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {editingProject.hidden ? 'Hidden' : 'Visible'}
                </button>
              </div>
            </div>

            <div className="sticky bottom-0 bg-[#111111] p-6 border-t border-[#1e1e1e] flex justify-end gap-3">
              <button onClick={closeModal} className="luxury-btn-secondary">Cancel</button>
              <button onClick={saveProject} className="luxury-btn-primary flex items-center gap-2">
                <Check className="w-4 h-4" /> Save Project
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
              <h3 className="text-xl font-display font-semibold">Delete Project?</h3>
            </div>
            <p className="text-[#6b6560] mb-6">This action cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteConfirm(null)} className="luxury-btn-secondary">Cancel</button>
              <button onClick={() => deleteProject(deleteConfirm)} className="luxury-btn-danger">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
