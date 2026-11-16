'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  FileCheck,
  Briefcase,
  Award,
  CreditCard,
  Key,
  Globe,
  AlertTriangle,
  Clock,
  ArrowRight,
  Plus,
  RefreshCw,
  CheckCircle,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState('');

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/dashboard');
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const handleSyncAll = async () => {
    setIsSyncing(true);
    setSyncMessage('');
    try {
      const res = await fetch('/api/admin/sources/UPSC/sync', { method: 'POST' });
      const json = await res.json();
      setSyncMessage('Official source check completed. Refreshed pending list.');
      loadDashboard();
    } catch (err) {
      setSyncMessage('Sync finished.');
    } finally {
      setIsSyncing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-slate-400">
        Loading dashboard statistics...
      </div>
    );
  }

  const stats = data?.stats || {};
  const recent = data?.recentNotifications || [];
  const logs = data?.recentLogs || [];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight uppercase">
            Operations & Control Dashboard
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time government job listings, scraper sync logs, and pending verification queues.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSyncAll}
            disabled={isSyncing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Syncing Sources...' : 'Check Official Sources'}</span>
          </button>

          <Link
            href="/admin/notifications/new"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-red-700 hover:bg-red-800 text-xs font-bold text-white shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Notification</span>
          </Link>
        </div>
      </div>

      {syncMessage && (
        <div className="p-3 bg-emerald-950/80 border border-emerald-700 text-emerald-200 rounded text-xs flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{syncMessage}</span>
        </div>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {/* Pending Approvals */}
        <Link
          href="/admin/approvals"
          className="p-4 rounded-lg bg-amber-950/40 border border-amber-600/50 hover:border-amber-400 transition-all group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400">
              Pending Approvals
            </span>
            <FileCheck className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl font-black text-amber-300 mt-2">
            {stats.pendingApprovals ?? 0}
          </div>
          <div className="text-[11px] text-amber-200/80 mt-1 flex items-center gap-1">
            <span>Requires review</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Published Jobs */}
        <Link
          href="/admin/notifications?category=latest-jobs"
          className="p-4 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              Published Jobs
            </span>
            <Briefcase className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-white mt-2">
            {stats.publishedJobs ?? 0}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Live vacancies</div>
        </Link>

        {/* Published Results */}
        <Link
          href="/admin/notifications?category=results"
          className="p-4 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              Exam Results
            </span>
            <Award className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-white mt-2">
            {stats.publishedResults ?? 0}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Score cards & cutoffs</div>
        </Link>

        {/* Admit Cards */}
        <Link
          href="/admin/notifications?category=admit-cards"
          className="p-4 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              Admit Cards
            </span>
            <CreditCard className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-3xl font-black text-white mt-2">
            {stats.publishedAdmitCards ?? 0}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Hall tickets active</div>
        </Link>
      </div>

      {/* Two Column Section: Recent Notifications & Security Audit */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Col 1-2: Recent Notifications Table */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-white uppercase tracking-wider">
              Recently Updated Notifications
            </h3>
            <Link
              href="/admin/notifications"
              className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs divide-y divide-slate-800">
              <thead className="bg-slate-950 text-slate-400 uppercase font-bold text-[10px] tracking-wider">
                <tr>
                  <th className="p-3">Title / Board</th>
                  <th className="p-3">Category</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {recent.map((item: any) => (
                  <tr key={item.id} className="hover:bg-slate-800/40">
                    <td className="p-3 font-semibold text-slate-100 max-w-xs">
                      <div className="text-[11px] text-amber-400 font-bold uppercase mb-0.5">
                        {item.organization.shortName}
                      </div>
                      <div className="truncate">{item.title}</div>
                    </td>
                    <td className="p-3 text-slate-400 whitespace-nowrap">
                      {item.category.name}
                    </td>
                    <td className="p-3 text-center whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                          item.publicationStatus === 'PUBLISHED'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/60'
                            : 'bg-amber-950 text-amber-300 border border-amber-700/60'
                        }`}
                      >
                        {item.publicationStatus}
                      </span>
                    </td>
                    <td className="p-3 text-right whitespace-nowrap">
                      <Link
                        href={`/admin/notifications/edit/${item.id}`}
                        className="text-red-400 hover:text-red-300 font-bold"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Col 3: Audit Activity Log */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-white uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Audit Trail</span>
              </h3>
              <Link
                href="/admin/logs"
                className="text-xs text-amber-400 hover:underline font-semibold"
              >
                All Logs
              </Link>
            </div>

            <ul className="divide-y divide-slate-800/80 p-2 text-xs">
              {logs.map((log: any) => (
                <li key={log.id} className="p-2 hover:bg-slate-800/40 rounded">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-bold text-amber-400">{log.action}</span>
                    <span>
                      {new Date(log.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <p className="text-slate-300 mt-0.5 line-clamp-1">{log.details}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
