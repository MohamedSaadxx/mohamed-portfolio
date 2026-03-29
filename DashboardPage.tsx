import type { PortfolioData, PageType } from '@/admin/types';
import { Eye, Download, Plus } from 'lucide-react';

interface DashboardPageProps {
  data: PortfolioData;
  onPageChange: (page: PageType) => void;
  onExport: () => void;
  updateData: (updates: Partial<PortfolioData>) => void;
  addActivity: (action: string) => void;
}

export default function DashboardPage({ data, onPageChange, onExport }: DashboardPageProps) {
  const formatTimeAgo = (timestamp: string) => {
    const diff = Date.now() - new Date(timestamp).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  const stats = [
    { label: 'Total Projects', value: data.projects.length, change: '+2' },
    { label: 'Total Articles', value: data.articles.length, change: '+1' },
    { label: 'Total Books', value: data.books.length, change: '-' },
    { label: 'Last Updated', value: formatTimeAgo(data.lastUpdated), change: '' },
  ];

  return (
    <div className="slide-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="section-title">Welcome back, Mohamed.</h1>
          <p className="section-subtitle">Here's your portfolio at a glance.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => window.open('/', '_blank')} className="luxury-btn-secondary flex items-center gap-2">
            <Eye className="w-4 h-4" /> Preview Site
          </button>
          <button onClick={onExport} className="luxury-btn-primary flex items-center gap-2">
            <Download className="w-4 h-4" /> Export Data
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="luxury-card p-6" style={{ animationDelay: `${i * 0.1}s` }}>
            <p className="text-[#6b6560] font-ui text-sm uppercase tracking-wider mb-2">{stat.label}</p>
            <div className="flex items-end gap-2">
              <span className="stat-value">{stat.value}</span>
              {stat.change && stat.change !== '-' && (
                <span className="text-[#2ecc71] text-sm font-ui mb-1">{stat.change}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="luxury-card p-6 mb-8">
        <h3 className="text-lg font-display font-semibold mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => onPageChange('projects')} className="luxury-btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Project
          </button>
          <button onClick={() => onPageChange('articles')} className="luxury-btn-secondary flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Article
          </button>
          <button onClick={() => onPageChange('books')} className="luxury-btn-secondary flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Book
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="luxury-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-display font-semibold">Recent Activity</h3>
          <span className="text-[#c9a84c] text-sm font-ui cursor-pointer hover:underline">View All →</span>
        </div>
        <div className="space-y-2">
          {data.activityLog.slice(0, 5).map((activity, i) => (
            <div key={activity.id} className="activity-item" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="w-2 h-2 rounded-full bg-[#c9a84c]" />
              <span className="flex-1 text-[#f5f0e8]">{activity.action}</span>
              <span className="text-[#6b6560] text-sm font-ui">{formatTimeAgo(activity.timestamp)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
