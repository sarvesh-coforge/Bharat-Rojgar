'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Briefcase,
  Search,
  Plus,
  Trash2,
  Edit,
  Eye,
  CheckCircle,
  XCircle,
  ToggleLeft,
  ToggleRight,
  Filter,
  Loader2,
} from 'lucide-react';

export default function AdminNotificationsListPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (selectedCategory) params.set('category', selectedCategory);
      if (selectedStatus) params.set('status', selectedStatus);

      const res = await fetch(`/api/admin/notifications?${params.toString()}`);
      if (res.ok) {
        const json = await res.json();
        setItems(json.items || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, [selectedCategory, selectedStatus]);

  const handleTogglePublish = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/notifications/${id}/publish`, {
        method: 'POST',
      });
      if (res.ok) {
        const json = await res.json();
        setItems(
          items.map((it) =>
            it.id === id ? { ...it, publicationStatus: json.notification.publicationStatus } : it
          )
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to permanently delete: "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/notifications/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setItems(items.filter((it) => it.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight uppercase">
            Notification Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Create, edit, toggle publication status and organize government recruitment notices.
          </p>
        </div>

        <Link
          href="/admin/notifications/new"
          className="flex items-center gap-1.5 px-3.5 py-2 rounded bg-red-700 hover:bg-red-800 text-xs font-bold text-white shadow-xs transition-colors self-start sm:self-center"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create New Notification</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-2.5 py-1.5 rounded bg-slate-800 border border-slate-700 text-slate-200 focus:outline-none"
          >
            <option value="">All Categories</option>
            <option value="latest-jobs">Latest Jobs</option>
            <option value="results">Results</option>
            <option value="admit-cards">Admit Cards</option>
            <option value="answer-keys">Answer Keys</option>
            <option value="admissions">Admissions</option>
            <option value="scholarships">Scholarships</option>
            <option value="syllabus">Syllabus</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-2.5 py-1.5 rounded bg-slate-800 border border-slate-700 text-slate-200 focus:outline-none"
          >
            <option value="">All Statuses</option>
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Draft</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            loadNotifications();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, post..."
            className="px-3 py-1.5 rounded bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none w-56"
          />
          <button
            type="submit"
            className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-white font-semibold"
          >
            Search
          </button>
        </form>
      </div>

      {/* Notifications Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400">Loading notifications...</div>
        ) : items.length === 0 ? (
          <div className="p-12 text-center text-slate-500">No notifications found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs divide-y divide-slate-800">
              <thead className="bg-slate-950 text-slate-400 uppercase font-bold text-[10px] tracking-wider">
                <tr>
                  <th className="p-3.5">Title</th>
                  <th className="p-3.5">Organization</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5 text-center">Status</th>
                  <th className="p-3.5 text-center">Verification</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/40">
                    <td className="p-3.5 font-bold text-white max-w-sm">
                      <div className="line-clamp-2">{item.title}</div>
                      <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                        /{item.slug}
                      </div>
                    </td>
                    <td className="p-3.5 text-amber-400 font-bold whitespace-nowrap">
                      {item.organization.shortName}
                    </td>
                    <td className="p-3.5 text-slate-300 whitespace-nowrap">
                      {item.category.name}
                    </td>
                    <td className="p-3.5 text-center whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => handleTogglePublish(item.id)}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-extrabold cursor-pointer ${
                          item.publicationStatus === 'PUBLISHED'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/60'
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}
                      >
                        {item.publicationStatus === 'PUBLISHED' ? (
                          <ToggleRight className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <ToggleLeft className="w-3.5 h-3.5 text-slate-500" />
                        )}
                        <span>{item.publicationStatus}</span>
                      </button>
                    </td>
                    <td className="p-3.5 text-center whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          item.verificationStatus === 'VERIFIED'
                            ? 'bg-emerald-950 text-emerald-400'
                            : item.verificationStatus === 'PENDING'
                            ? 'bg-amber-950 text-amber-400'
                            : 'bg-red-950 text-red-400'
                        }`}
                      >
                        {item.verificationStatus}
                      </span>
                    </td>
                    <td className="p-3.5 text-right whitespace-nowrap space-x-2">
                      <Link
                        href={`/notification/${item.slug}`}
                        target="_blank"
                        className="text-slate-400 hover:text-white p-1"
                        title="View Public Page"
                      >
                        <Eye className="w-3.5 h-3.5 inline" />
                      </Link>
                      <Link
                        href={`/admin/notifications/edit/${item.id}`}
                        className="text-amber-400 hover:text-amber-300 p-1"
                        title="Edit Notification"
                      >
                        <Edit className="w-3.5 h-3.5 inline" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id, item.title)}
                        className="text-red-400 hover:text-red-300 p-1"
                        title="Delete Notification"
                      >
                        <Trash2 className="w-3.5 h-3.5 inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
