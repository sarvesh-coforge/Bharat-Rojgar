'use client';

import React, { useEffect, useState } from 'react';
import { Image as ImageIcon, Plus, ExternalLink, ToggleLeft, ToggleRight } from 'lucide-react';

export default function AdminAdvertisementsPage() {
  const [ads, setAds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const [targetUrl, setTargetUrl] = useState('');
  const [placement, setPlacement] = useState('HOMEPAGE_TOP');

  const loadAds = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/advertisements');
      if (res.ok) {
        const json = await res.json();
        setAds(json.ads || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAds();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/advertisements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, bannerUrl, targetUrl, placement, isActive: true }),
      });
      if (res.ok) {
        setShowModal(false);
        setTitle('');
        setBannerUrl('');
        setTargetUrl('');
        loadAds();
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
            Advertisement & Banner Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage official educational alert banners, placements, and promotional sponsor slots.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded bg-red-700 hover:bg-red-800 text-xs font-bold text-white shadow-xs transition-colors self-start sm:self-center"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add New Banner</span>
        </button>
      </div>

      {showModal && (
        <div className="p-5 rounded-lg bg-slate-900 border border-slate-700 shadow-xl space-y-4 max-w-xl text-xs">
          <h3 className="font-extrabold text-sm text-white uppercase">Add Promotional Banner</h3>
          <form onSubmit={handleCreate} className="space-y-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Banner Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Free UPSC 2026 Test Series"
                className="w-full px-3 py-1.5 rounded bg-slate-800 border border-slate-700 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Banner Image URL</label>
              <input
                type="url"
                required
                value={bannerUrl}
                onChange={(e) => setBannerUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3 py-1.5 rounded bg-slate-800 border border-slate-700 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Destination Target URL</label>
              <input
                type="url"
                required
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                placeholder="https://upsc.gov.in"
                className="w-full px-3 py-1.5 rounded bg-slate-800 border border-slate-700 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Placement</label>
              <select
                value={placement}
                onChange={(e) => setPlacement(e.target.value)}
                className="w-full px-3 py-1.5 rounded bg-slate-800 border border-slate-700 text-white"
              >
                <option value="HOMEPAGE_TOP">Homepage Top</option>
                <option value="SIDEBAR_RIGHT">Sidebar Right</option>
                <option value="HOMEPAGE_MIDDLE">Homepage Middle</option>
                <option value="FOOTER">Footer</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-3 py-1.5 rounded bg-slate-800 text-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded bg-red-700 hover:bg-red-800 text-white font-bold"
              >
                Save Banner
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ads.map((ad) => (
          <div
            key={ad.id}
            className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-3 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold text-amber-400 uppercase text-[10px] tracking-wider">
                  {ad.placement}
                </span>
                <span className="text-emerald-400 font-mono text-[11px]">
                  {ad.clickCount} Clicks
                </span>
              </div>
              <h4 className="font-extrabold text-sm text-white line-clamp-1">{ad.title}</h4>
              <a
                href={ad.targetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-400 hover:underline flex items-center gap-1 mt-1 truncate"
              >
                <span>{ad.targetUrl}</span>
                <ExternalLink className="w-3 h-3 shrink-0" />
              </a>
            </div>

            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-500">
              Created on: {new Date(ad.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
