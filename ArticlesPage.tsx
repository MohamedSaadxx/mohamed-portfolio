import { useState } from 'react';
import type { Article, PortfolioData } from '@/admin/types';
import { Plus, Edit2, Trash2, GripVertical, Eye, EyeOff, Check, X, ExternalLink } from 'lucide-react';

interface ArticlesPageProps {
  data: PortfolioData;
  updateData: (updates: Partial<PortfolioData>) => void;
  addActivity: (action: string) => void;
}

const emptyArticle: Omit<Article, 'id' | 'order'> = {
  title: { en: '', ar: '' },
  category: { en: '', ar: '' },
  date: new Date().toISOString().split('T')[0],
  excerpt: { en: '', ar: '' },
  content: { en: '', ar: '' },
  externalUrl: '',
  isExternal: false,
  published: true,
};

export default function ArticlesPage({ data, updateData, addActivity }: ArticlesPageProps) {
  const [articles, setArticles] = useState(data.articles);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const openModal = (article?: Article) => {
    if (article) {
      setEditingArticle(article);
    } else {
      setEditingArticle({
        ...emptyArticle,
        id: Date.now().toString(),
        order: articles.length,
      } as Article);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingArticle(null);
    setIsModalOpen(false);
  };

  const saveArticle = () => {
    if (!editingArticle) return;
    const existingIndex = articles.findIndex(a => a.id === editingArticle.id);
    let newArticles;
    if (existingIndex >= 0) {
      newArticles = articles.map(a => a.id === editingArticle.id ? editingArticle : a);
    } else {
      newArticles = [...articles, editingArticle];
    }
    setArticles(newArticles);
    updateData({ articles: newArticles });
    addActivity(existingIndex >= 0 ? `Updated article "${editingArticle.title.en}"` : `Added article "${editingArticle.title.en}"`);
    closeModal();
  };

  const deleteArticle = (id: string) => {
    const article = articles.find(a => a.id === id);
    const newArticles = articles.filter(a => a.id !== id);
    setArticles(newArticles);
    updateData({ articles: newArticles });
    if (article) {
      addActivity(`Deleted article "${article.title.en}"`);
    }
    setDeleteConfirm(null);
  };

  const togglePublished = (id: string) => {
    const newArticles = articles.map(a => 
      a.id === id ? { ...a, published: !a.published } : a
    );
    setArticles(newArticles);
    updateData({ articles: newArticles });
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    const newArticles = [...articles];
    const draggedArticle = newArticles[draggedIndex];
    newArticles.splice(draggedIndex, 1);
    newArticles.splice(index, 0, draggedArticle);
    setDraggedIndex(index);
    setArticles(newArticles);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    updateData({ articles });
    addActivity('Reordered articles');
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="slide-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="section-title">Articles</h1>
          <p className="section-subtitle">Manage your blog posts and articles</p>
        </div>
        <button onClick={() => openModal()} className="luxury-btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add New Article
        </button>
      </div>

      <div className="space-y-3">
        {articles.map((article, index) => (
          <div
            key={article.id}
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
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-display font-semibold text-[#f5f0e8] truncate">{article.title.en}</h3>
                {article.isExternal && <ExternalLink className="w-4 h-4 text-[#6b6560]" />}
              </div>
              <p className="text-sm text-[#6b6560] truncate">{article.excerpt.en}</p>
            </div>
            <span className="px-3 py-1 bg-[#0d0d0d] rounded-full text-xs font-ui text-[#6b6560]">
              {article.category.en}
            </span>
            <span className="text-sm text-[#6b6560]">{formatDate(article.date)}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => togglePublished(article.id)}
                className={`p-2 rounded-lg transition-all ${
                  article.published ? 'text-[#2ecc71]' : 'text-[#e74c3c]'
                }`}
              >
                {article.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
              <button
                onClick={() => openModal(article)}
                className="p-2 rounded-lg text-[#6b6560] hover:text-[#c9a84c] hover:bg-[rgba(201,168,76,0.1)] transition-all"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDeleteConfirm(article.id)}
                className="p-2 rounded-lg text-[#6b6560] hover:text-[#e74c3c] hover:bg-[rgba(231,76,60,0.1)] transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {isModalOpen && editingArticle && (
        <div className="modal-overlay" onClick={closeModal}>
          <div 
            className="luxury-card w-full max-w-4xl max-h-[90vh] overflow-y-auto mx-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-[#111111] p-6 border-b border-[#1e1e1e] flex items-center justify-between">
              <h2 className="text-2xl font-display font-semibold">
                {articles.find(a => a.id === editingArticle.id) ? 'Edit Article' : 'New Article'}
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
                    value={editingArticle.title.en}
                    onChange={(e) => setEditingArticle({ ...editingArticle, title: { ...editingArticle.title, en: e.target.value } })}
                    className="luxury-input w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">(AR) العنوان</label>
                  <input
                    type="text"
                    value={editingArticle.title.ar}
                    onChange={(e) => setEditingArticle({ ...editingArticle, title: { ...editingArticle.title, ar: e.target.value } })}
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
                    value={editingArticle.category.en}
                    onChange={(e) => setEditingArticle({ ...editingArticle, category: { ...editingArticle.category, en: e.target.value } })}
                    className="luxury-input w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">(AR) الفئة</label>
                  <input
                    type="text"
                    value={editingArticle.category.ar}
                    onChange={(e) => setEditingArticle({ ...editingArticle, category: { ...editingArticle.category, ar: e.target.value } })}
                    className="luxury-input w-full font-arabic text-right"
                    dir="rtl"
                  />
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">Date</label>
                <input
                  type="date"
                  value={editingArticle.date}
                  onChange={(e) => setEditingArticle({ ...editingArticle, date: e.target.value })}
                  className="luxury-input w-full"
                />
              </div>

              {/* Excerpt */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">Excerpt (EN)</label>
                  <textarea
                    value={editingArticle.excerpt.en}
                    onChange={(e) => setEditingArticle({ ...editingArticle, excerpt: { ...editingArticle.excerpt, en: e.target.value } })}
                    className="luxury-input w-full min-h-[80px]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">(AR) المقتطف</label>
                  <textarea
                    value={editingArticle.excerpt.ar}
                    onChange={(e) => setEditingArticle({ ...editingArticle, excerpt: { ...editingArticle.excerpt, ar: e.target.value } })}
                    className="luxury-input w-full min-h-[80px] font-arabic text-right"
                    dir="rtl"
                  />
                </div>
              </div>

              {/* External URL Toggle */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setEditingArticle({ ...editingArticle, isExternal: !editingArticle.isExternal })}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    editingArticle.isExternal ? 'bg-[#c9a84c]/20 text-[#c9a84c]' : 'bg-[#1e1e1e] text-[#6b6560]'
                  }`}
                >
                  <ExternalLink className="w-4 h-4" /> External Link
                </button>
              </div>

              {/* External URL */}
              {editingArticle.isExternal && (
                <div>
                  <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">Article URL</label>
                  <input
                    type="text"
                    value={editingArticle.externalUrl}
                    onChange={(e) => setEditingArticle({ ...editingArticle, externalUrl: e.target.value })}
                    className="luxury-input w-full"
                    placeholder="https://..."
                  />
                </div>
              )}

              {/* Content */}
              {!editingArticle.isExternal && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">Content (EN)</label>
                    <textarea
                      value={editingArticle.content.en}
                      onChange={(e) => setEditingArticle({ ...editingArticle, content: { ...editingArticle.content, en: e.target.value } })}
                      className="luxury-input w-full min-h-[200px]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">(AR) المحتوى</label>
                    <textarea
                      value={editingArticle.content.ar}
                      onChange={(e) => setEditingArticle({ ...editingArticle, content: { ...editingArticle.content, ar: e.target.value } })}
                      className="luxury-input w-full min-h-[200px] font-arabic text-right"
                      dir="rtl"
                    />
                  </div>
                </div>
              )}

              {/* Published Toggle */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setEditingArticle({ ...editingArticle, published: !editingArticle.published })}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    editingArticle.published ? 'bg-[#2ecc71]/20 text-[#2ecc71]' : 'bg-[#e74c3c]/20 text-[#e74c3c]'
                  }`}
                >
                  {editingArticle.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  {editingArticle.published ? 'Published' : 'Draft'}
                </button>
              </div>
            </div>

            <div className="sticky bottom-0 bg-[#111111] p-6 border-t border-[#1e1e1e] flex justify-end gap-3">
              <button onClick={closeModal} className="luxury-btn-secondary">Cancel</button>
              <button onClick={saveArticle} className="luxury-btn-primary flex items-center gap-2">
                <Check className="w-4 h-4" /> Save Article
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
              <h3 className="text-xl font-display font-semibold">Delete Article?</h3>
            </div>
            <p className="text-[#6b6560] mb-6">This action cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteConfirm(null)} className="luxury-btn-secondary">Cancel</button>
              <button onClick={() => deleteArticle(deleteConfirm)} className="luxury-btn-danger">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
