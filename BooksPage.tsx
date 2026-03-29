import { useState } from 'react';
import type { Book, PortfolioData } from '@/admin/types';
import { Plus, Edit2, Trash2, GripVertical, Eye, EyeOff, Check, X } from 'lucide-react';

interface BooksPageProps {
  data: PortfolioData;
  updateData: (updates: Partial<PortfolioData>) => void;
  addActivity: (action: string) => void;
}

const emptyBook: Omit<Book, 'id' | 'order'> = {
  title: { en: '', ar: '' },
  category: { en: '', ar: '' },
  year: new Date().getFullYear(),
  coverImage: '',
  description: { en: '', ar: '' },
  purchaseLink: '',
  visible: true,
};

export default function BooksPage({ data, updateData, addActivity }: BooksPageProps) {
  const [books, setBooks] = useState(data.books);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const openModal = (book?: Book) => {
    if (book) {
      setEditingBook(book);
    } else {
      setEditingBook({
        ...emptyBook,
        id: Date.now().toString(),
        order: books.length,
      } as Book);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingBook(null);
    setIsModalOpen(false);
  };

  const saveBook = () => {
    if (!editingBook) return;
    const existingIndex = books.findIndex(b => b.id === editingBook.id);
    let newBooks;
    if (existingIndex >= 0) {
      newBooks = books.map(b => b.id === editingBook.id ? editingBook : b);
    } else {
      newBooks = [...books, editingBook];
    }
    setBooks(newBooks);
    updateData({ books: newBooks });
    addActivity(existingIndex >= 0 ? `Updated book "${editingBook.title.en}"` : `Added book "${editingBook.title.en}"`);
    closeModal();
  };

  const deleteBook = (id: string) => {
    const book = books.find(b => b.id === id);
    const newBooks = books.filter(b => b.id !== id);
    setBooks(newBooks);
    updateData({ books: newBooks });
    if (book) {
      addActivity(`Deleted book "${book.title.en}"`);
    }
    setDeleteConfirm(null);
  };

  const toggleVisibility = (id: string) => {
    const newBooks = books.map(b => 
      b.id === id ? { ...b, visible: !b.visible } : b
    );
    setBooks(newBooks);
    updateData({ books: newBooks });
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    const newBooks = [...books];
    const draggedBook = newBooks[draggedIndex];
    newBooks.splice(draggedIndex, 1);
    newBooks.splice(index, 0, draggedBook);
    setDraggedIndex(index);
    setBooks(newBooks);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    updateData({ books });
    addActivity('Reordered books');
  };

  return (
    <div className="slide-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="section-title">Books</h1>
          <p className="section-subtitle">Manage your published books</p>
        </div>
        <button onClick={() => openModal()} className="luxury-btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add New Book
        </button>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book, index) => (
          <div
            key={book.id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
            className={`luxury-card overflow-hidden ${
              draggedIndex === index ? 'border-[#c9a84c] opacity-50' : ''
            }`}
          >
            <div className="relative">
              <img
                src={book.coverImage || 'https://via.placeholder.com/300x450'}
                alt={book.title.en}
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-2 right-2 flex gap-1">
                <button
                  onClick={() => toggleVisibility(book.id)}
                  className={`p-2 rounded-lg backdrop-blur-sm transition-all ${
                    book.visible ? 'bg-[#2ecc71]/80 text-white' : 'bg-[#e74c3c]/80 text-white'
                  }`}
                >
                  {book.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>
              <div className="drag-handle absolute top-2 left-2 p-2 rounded-lg backdrop-blur-sm bg-black/50">
                <GripVertical className="w-4 h-4" />
              </div>
            </div>
            <div className="p-4">
              <span className="text-xs font-ui text-[#c9a84c] uppercase tracking-wider">{book.category.en}</span>
              <h3 className="font-display font-semibold text-[#f5f0e8] mt-1">{book.title.en}</h3>
              <p className="text-sm text-[#6b6560] mt-1">{book.year}</p>
              <p className="text-sm text-[#6b6560] mt-2 line-clamp-2">{book.description.en}</p>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => openModal(book)}
                  className="flex-1 luxury-btn-secondary text-xs py-2 flex items-center justify-center gap-1"
                >
                  <Edit2 className="w-3 h-3" /> Edit
                </button>
                <button
                  onClick={() => setDeleteConfirm(book.id)}
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
      {isModalOpen && editingBook && (
        <div className="modal-overlay" onClick={closeModal}>
          <div 
            className="luxury-card w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-[#111111] p-6 border-b border-[#1e1e1e] flex items-center justify-between">
              <h2 className="text-2xl font-display font-semibold">
                {books.find(b => b.id === editingBook.id) ? 'Edit Book' : 'New Book'}
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
                    value={editingBook.title.en}
                    onChange={(e) => setEditingBook({ ...editingBook, title: { ...editingBook.title, en: e.target.value } })}
                    className="luxury-input w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">(AR) العنوان</label>
                  <input
                    type="text"
                    value={editingBook.title.ar}
                    onChange={(e) => setEditingBook({ ...editingBook, title: { ...editingBook.title, ar: e.target.value } })}
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
                    value={editingBook.category.en}
                    onChange={(e) => setEditingBook({ ...editingBook, category: { ...editingBook.category, en: e.target.value } })}
                    className="luxury-input w-full"
                    placeholder="UX / Life & Thinking"
                  />
                </div>
                <div>
                  <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">(AR) الفئة</label>
                  <input
                    type="text"
                    value={editingBook.category.ar}
                    onChange={(e) => setEditingBook({ ...editingBook, category: { ...editingBook.category, ar: e.target.value } })}
                    className="luxury-input w-full font-arabic text-right"
                    dir="rtl"
                  />
                </div>
              </div>

              {/* Year */}
              <div>
                <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">Published Year</label>
                <input
                  type="number"
                  value={editingBook.year}
                  onChange={(e) => setEditingBook({ ...editingBook, year: parseInt(e.target.value) })}
                  className="luxury-input w-full"
                />
              </div>

              {/* Cover Image */}
              <div>
                <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">Cover Image URL</label>
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={editingBook.coverImage}
                    onChange={(e) => setEditingBook({ ...editingBook, coverImage: e.target.value })}
                    className="luxury-input flex-1"
                  />
                  {editingBook.coverImage && (
                    <img
                      src={editingBook.coverImage}
                      alt="Preview"
                      className="w-16 h-24 object-cover rounded-lg"
                    />
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">Description (EN)</label>
                  <textarea
                    value={editingBook.description.en}
                    onChange={(e) => setEditingBook({ ...editingBook, description: { ...editingBook.description, en: e.target.value } })}
                    className="luxury-input w-full min-h-[100px]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">(AR) الوصف</label>
                  <textarea
                    value={editingBook.description.ar}
                    onChange={(e) => setEditingBook({ ...editingBook, description: { ...editingBook.description, ar: e.target.value } })}
                    className="luxury-input w-full min-h-[100px] font-arabic text-right"
                    dir="rtl"
                  />
                </div>
              </div>

              {/* Purchase Link */}
              <div>
                <label className="block text-sm font-ui text-[#6b6560] uppercase tracking-wider mb-2">Purchase/Read Link</label>
                <input
                  type="text"
                  value={editingBook.purchaseLink}
                  onChange={(e) => setEditingBook({ ...editingBook, purchaseLink: e.target.value })}
                  className="luxury-input w-full"
                  placeholder="https://..."
                />
              </div>

              {/* Visibility Toggle */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setEditingBook({ ...editingBook, visible: !editingBook.visible })}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    editingBook.visible ? 'bg-[#2ecc71]/20 text-[#2ecc71]' : 'bg-[#e74c3c]/20 text-[#e74c3c]'
                  }`}
                >
                  {editingBook.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  {editingBook.visible ? 'Visible' : 'Hidden'}
                </button>
              </div>
            </div>

            <div className="sticky bottom-0 bg-[#111111] p-6 border-t border-[#1e1e1e] flex justify-end gap-3">
              <button onClick={closeModal} className="luxury-btn-secondary">Cancel</button>
              <button onClick={saveBook} className="luxury-btn-primary flex items-center gap-2">
                <Check className="w-4 h-4" /> Save Book
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
              <h3 className="text-xl font-display font-semibold">Delete Book?</h3>
            </div>
            <p className="text-[#6b6560] mb-6">This action cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteConfirm(null)} className="luxury-btn-secondary">Cancel</button>
              <button onClick={() => deleteBook(deleteConfirm)} className="luxury-btn-danger">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
