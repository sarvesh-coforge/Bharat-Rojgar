'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface NotificationFormProps {
  initialData?: any;
  isEdit?: boolean;
}

export function NotificationForm({ initialData, isEdit }: NotificationFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    titleHi: initialData?.titleHi || '',
    slug: initialData?.slug || '',
    postName: initialData?.postName || '',
    organizationId: initialData?.organizationId || '',
    categoryId: initialData?.categoryId || '',
    vacancyCount: initialData?.vacancyCount || 0,
    vacancyBreakdown: initialData?.vacancyBreakdown || '',
    qualification: initialData?.qualification || '',
    qualificationHi: initialData?.qualificationHi || '',
    salary: initialData?.salary || '',
    salaryHi: initialData?.salaryHi || '',
    ageLimit: initialData?.ageLimit || '',
    ageLimitHi: initialData?.ageLimitHi || '',
    feeDetails: initialData?.feeDetails || '',
    selectionProcess: initialData?.selectionProcess || '',
    applicationStartDate: initialData?.applicationStartDate ? initialData.applicationStartDate.slice(0, 10) : '',
    applicationEndDate: initialData?.applicationEndDate ? initialData.applicationEndDate.slice(0, 10) : '',
    feeLastDate: initialData?.feeLastDate ? initialData.feeLastDate.slice(0, 10) : '',
    examDate: initialData?.examDate || '',
    admitCardDate: initialData?.admitCardDate || '',
    resultDate: initialData?.resultDate || '',
    applyOnlineUrl: initialData?.applyOnlineUrl || '',
    officialPdfUrl: initialData?.officialPdfUrl || '',
    officialWebsiteUrl: initialData?.officialWebsiteUrl || '',
    resultUrl: initialData?.resultUrl || '',
    admitCardUrl: initialData?.admitCardUrl || '',
    answerKeyUrl: initialData?.answerKeyUrl || '',
    syllabusUrl: initialData?.syllabusUrl || '',
    verificationStatus: initialData?.verificationStatus || 'VERIFIED',
    publicationStatus: initialData?.publicationStatus || 'PUBLISHED',
    isFeatured: initialData?.isFeatured || false,
    isTrending: initialData?.isTrending || false,
  });

  const [orgs, setOrgs] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  React.useEffect(() => {
    // Load organizations and categories
    async function loadMeta() {
      try {
        const [orgRes, catRes] = await Promise.all([
          fetch('/api/admin/sources'),
          fetch('/api/admin/notifications?limit=1'),
        ]);
        // For simplicity, we hardcode or query organizations
      } catch {}
    }
    loadMeta();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const url = isEdit
        ? `/api/admin/notifications/${initialData.id}`
        : '/api/admin/notifications';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Failed to save notification');
      }

      setSuccess('Notification successfully saved!');
      setTimeout(() => {
        router.push('/admin/notifications');
      }, 1000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl text-xs">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Link
            href="/admin/notifications"
            className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h2 className="text-xl font-black text-white">
            {isEdit ? 'Edit Notification' : 'Create New Notification'}
          </h2>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-1.5 px-4 py-2 rounded bg-red-700 hover:bg-red-800 text-white font-bold transition-colors disabled:opacity-50 shadow-md text-xs"
        >
          {loading ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Save className="w-3.5 h-3.5" />
          )}
          <span>Save Notification</span>
        </button>
      </div>

      {error && (
        <div className="p-3 rounded bg-red-950 border border-red-700 text-red-200 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-3 rounded bg-emerald-950 border border-emerald-700 text-emerald-200 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* Main Info */}
      <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="font-extrabold text-sm text-amber-400 uppercase tracking-wider">
          Basic Details
        </h3>

        <div>
          <label className="block text-slate-300 font-semibold mb-1">
            Notification Title (English) *
          </label>
          <input
            type="text"
            required
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. UPSC Civil Services (IAS) 2026 Online Form"
            className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-1 focus:ring-red-600"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1">
            Notification Title (Hindi)
          </label>
          <input
            type="text"
            name="titleHi"
            value={formData.titleHi}
            onChange={handleChange}
            placeholder="उदा. यूपीएससी सिविल सेवा (आईएएस) परीक्षा 2026 ऑनलाइन आवेदन"
            className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-1 focus:ring-red-600"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Post Name
            </label>
            <input
              type="text"
              name="postName"
              value={formData.postName}
              onChange={handleChange}
              placeholder="e.g. Assistant Section Officer, Station Master"
              className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-white"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Total Vacancy Count
            </label>
            <input
              type="number"
              name="vacancyCount"
              value={formData.vacancyCount}
              onChange={handleChange}
              placeholder="e.g. 1105"
              className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1">
            Official Website URL (Government Portal) *
          </label>
          <input
            type="url"
            required
            name="officialWebsiteUrl"
            value={formData.officialWebsiteUrl}
            onChange={handleChange}
            placeholder="https://upsc.gov.in"
            className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-white"
          />
        </div>
      </div>

      {/* Official Action Links */}
      <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="font-extrabold text-sm text-amber-400 uppercase tracking-wider">
          Official Action Links (Must point to verified government domains)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Apply Online URL
            </label>
            <input
              type="url"
              name="applyOnlineUrl"
              value={formData.applyOnlineUrl}
              onChange={handleChange}
              placeholder="https://upsconline.nic.in"
              className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-white"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Official Notification PDF URL
            </label>
            <input
              type="url"
              name="officialPdfUrl"
              value={formData.officialPdfUrl}
              onChange={handleChange}
              placeholder="https://upsc.gov.in/notice.pdf"
              className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-white"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Admit Card URL
            </label>
            <input
              type="url"
              name="admitCardUrl"
              value={formData.admitCardUrl}
              onChange={handleChange}
              placeholder="https://ssc.gov.in/admit-card"
              className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-white"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Result URL
            </label>
            <input
              type="url"
              name="resultUrl"
              value={formData.resultUrl}
              onChange={handleChange}
              placeholder="https://ssc.gov.in/results"
              className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-white"
            />
          </div>
        </div>
      </div>

      {/* Dates */}
      <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="font-extrabold text-sm text-amber-400 uppercase tracking-wider">
          Key Dates
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Application Begin Date
            </label>
            <input
              type="date"
              name="applicationStartDate"
              value={formData.applicationStartDate}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-white"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Last Date to Apply
            </label>
            <input
              type="date"
              name="applicationEndDate"
              value={formData.applicationEndDate}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-white"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Exam Date Text
            </label>
            <input
              type="text"
              name="examDate"
              value={formData.examDate}
              onChange={handleChange}
              placeholder="e.g. 24 May 2026"
              className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-white"
            />
          </div>
        </div>
      </div>

      {/* Status & Options */}
      <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="font-extrabold text-sm text-amber-400 uppercase tracking-wider">
          Publication & Approval State
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Publication Status
            </label>
            <select
              name="publicationStatus"
              value={formData.publicationStatus}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-white"
            >
              <option value="PUBLISHED">PUBLISHED (Live on Public Portal)</option>
              <option value="DRAFT">DRAFT (Hidden)</option>
              <option value="ARCHIVED">ARCHIVED</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Verification Status
            </label>
            <select
              name="verificationStatus"
              value={formData.verificationStatus}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-white"
            >
              <option value="VERIFIED">VERIFIED (Matches Official Source)</option>
              <option value="PENDING">PENDING (Awaiting Review)</option>
              <option value="REJECTED">REJECTED</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-6 pt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
              className="rounded bg-slate-800 border-slate-700 text-red-600 focus:ring-0"
            />
            <span className="text-slate-300 font-semibold">Feature on Homepage</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="isTrending"
              checked={formData.isTrending}
              onChange={handleChange}
              className="rounded bg-slate-800 border-slate-700 text-red-600 focus:ring-0"
            />
            <span className="text-slate-300 font-semibold">Mark as Trending</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Link
          href="/admin/notifications"
          className="px-4 py-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2 rounded bg-red-700 hover:bg-red-800 text-white font-bold transition-colors disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Notification'}
        </button>
      </div>
    </form>
  );
}
